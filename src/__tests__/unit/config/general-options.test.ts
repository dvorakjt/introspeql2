import { describe, test, expect } from "vitest";
import { generalOptions } from "../../../config/general-options";
import { DEFAULT_TYPE_MAPPINGS } from "../../../config/default-type-mappings";
import { ZodError } from "zod";

describe("generalOptions", () => {
  test('schemas defaults to an array containing "public."', () => {
    const parsedOptions = generalOptions.parse({});
    expect(parsedOptions.schemas).toStrictEqual(["public"]);
  });

  test("schemas cannot be an empty array.", () => {
    const validOptions = {
      schemas: ["public"],
    };

    const invalidOptions = {
      schemas: [],
    };

    expect(() => generalOptions.parse(validOptions)).not.toThrow(ZodError);
    expect(() => generalOptions.parse(invalidOptions)).toThrow(ZodError);
  });

  test("If types are omitted, default type mappings are used.", () => {
    const parsedOptions = generalOptions.parse({});
    expect(parsedOptions.types).toStrictEqual(DEFAULT_TYPE_MAPPINGS);
  });

  test("Custom types are merged with default type mappings.", () => {
    const customTypeMappings = {
      // These types will overwrite default type mappings
      "pg_catalog.date": "Temporal.Instant",
      "pg_catalog.timestamp": "Temporal.Instant",
      "pg_catalog.timestamptz": "Temporal.Instant",
      // This type will be added to default type mappings
      "pg_catalog.interval": "Temporal.Duration",
    };

    const mergedTypeMappings = {
      ...DEFAULT_TYPE_MAPPINGS,
      ...customTypeMappings,
    };

    const parsedOptions = generalOptions.parse({
      types: customTypeMappings,
    });

    expect(parsedOptions.types).toStrictEqual(mergedTypeMappings);
  });

  test("copyComments is true by default.", () => {
    const parsedOptions = generalOptions.parse({});
    expect(parsedOptions.copyComments).toBe(true);
  });

  test("copyComments can also be an array containing entity types.", () => {
    const entities = ["tables", "columns", "enums", "functions"];
    const entityArrays: string[][] = [];

    populateEntityArrays([], 0);

    function populateEntityArrays(thisCombination: string[], start: number) {
      for (let i = start; i < entities.length; i++) {
        const newCombination = [...thisCombination, entities[i]];

        entityArrays.push(newCombination);
        populateEntityArrays(newCombination, i + 1);
      }
    }

    for (const entityArray of entityArrays) {
      const rawOptions = {
        copyComments: entityArray,
      };
      expect(() => generalOptions.parse(rawOptions)).not.toThrow(ZodError);
    }

    const invalidOptions = {
      copyComments: ["not a valid entity name"],
    };

    expect(() => generalOptions.parse(invalidOptions)).toThrow(ZodError);
  });

  test("copyComments is converted to a Set if an array was supplied.", () => {
    const parsedOptions = generalOptions.parse({
      copyComments: ["tables"],
    });

    expect(parsedOptions.copyComments).toBeInstanceOf(Set);
  });
});
