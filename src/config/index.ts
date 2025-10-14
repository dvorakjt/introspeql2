import { z } from "zod";
import { connectionOptions } from "./connection-options";
import { functionOptions } from "./function-options";
import { generalOptions } from "./general-options";
import { outputOptions } from "./output-options";
import { tableOptions } from "./table-options";
import { enumOptions } from "./enum-options";

const introspeqlConfigSchema = generalOptions
  .and(connectionOptions)
  .and(outputOptions)
  .and(
    z.object({
      tables: tableOptions.optional().default(() => {
        return {
          mode: "inclusive" as const,
          excludeTables: [],
        };
      }),
      functions: functionOptions.optional().default(() => {
        return {
          mode: "inclusive" as const,
          excludeFunctions: [],
          nullableArgs: false,
          nullableReturnTypes: true,
        };
      }),
      enums: enumOptions.optional().default(() => {
        return {
          enumStyle: "enum" as const,
        };
      }),
    })
  );

type IntrospeQLConfig = z.input<typeof introspeqlConfigSchema>;
type ParsedConfig = z.infer<typeof introspeqlConfigSchema>;

export { introspeqlConfigSchema, type IntrospeQLConfig, type ParsedConfig };
