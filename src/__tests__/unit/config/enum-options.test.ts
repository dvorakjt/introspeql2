import { describe, test, expect } from "vitest";
import { enumOptions } from "../../../config/enum-options";
import { ZodError } from "zod";

describe("enumOptions", () => {
  test('enumStyle defaults to "enum."', () => {
    expect(enumOptions.parse({}).enumStyle).toBe("enum");
  });

  test('enumStyle can also be set to "type."', () => {
    expect(() => enumOptions.parse({ enumStyle: "type" })).not.toThrow(
      ZodError
    );
  });
});
