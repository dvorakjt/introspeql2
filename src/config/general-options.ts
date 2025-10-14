import { z } from "zod";
import { DEFAULT_TYPE_MAPPINGS } from "./default-type-mappings";

export const generalOptions = z.object({
  /**
   * The database schemas from which types should be generated. At least one
   * schema must be specified. The default value is `['public']`.
   */
  schemas: z
    .string()
    .array()
    .nonempty({
      message: "Please provide at least one schema.",
    })
    .optional()
    .default(() => ["public"]),
  /**
   * An optional header that will be written to the generated type definition
   * file before the types. Useful when you want to define or import types
   * directly in the generated file.
   */
  header: z.string().optional(),
  /**
   * Custom type mappings. Default settings align with transformations applied
   * by node-postgres. To override these settings for a type, provide the
   * name of the schema in which the type is defined and the name of the type
   * (separated by a dot) as the key, and a string representation of the
   * desired type as the value.
   *
   * @example
   * ```
   * {
   *   types: {
   *     "pg_catalog.int8" : "bigint"
   *   }
   * }
   * ```
   */
  types: z
    .record(z.string(), z.string())
    .optional()
    .transform((t) => ({
      ...DEFAULT_TYPE_MAPPINGS,
      ...t,
    })),
  /**
   * If `true` (the default), comments attached to tables, columns, and
   * functions will be included as TS Doc-style comments in the output
   * (`"@introspeQL-"` annotations within those comments will be removed).
   *
   * Alternatively, an array can be provided for the entity types for which you
   * wish to include TS Doc comments.
   *
   * To opt out of this behavior when it is enabled, a table, function, or column
   * can include `"@introspeql-disable-tsdoc-comments"` in its comment.
   *
   * To opt into this behavior when it is disabled, a table, function, or column
   * can include `"@introspeql-enable-tsdoc-comments"` in its comment.
   *
   * To include only certain sections of the comment, enclose them with
   * `"@introspeql-begin-tsdoc-comment"` and `"@introspeql-end-tsdoc-comment"`.
   */
  copyComments: z
    .boolean()
    .or(
      z
        .enum(["tables", "columns", "enums", "functions"])
        .array()
        .transform((v) => new Set(v))
    )
    .optional()
    .default(true),
});
