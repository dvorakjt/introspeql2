import { z } from "zod";

export const enumOptions = z.object({
  /**
   * Determines whether to convert PostgreSQL enums to TypeScript enums or to
   * unions of string literals.
   */
  enumStyle: z.enum(["enum", "type"]).optional().default("enum"),
});
