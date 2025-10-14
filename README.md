## The Void Return Type

By default, node-postgres will transform the return value of a function that 
returns void into an empty string. Therefore, by default, the generated 
TypeScript return type of PostgreSQL functions that return void will be `string`.

If desired, this can be overridden using the `types` configuration option.

## Directives

IntrospeQL supports the inclusion of several directives which, when included in 
a PostgreSQL comment, can modify how IntrospeQL interacts with the entity to 
which that comment is applied.

Below, please find a table of all valid directives:

| Directive | Effect |
|--|--|
| @introspeql-exclude | Excludes a table or function when mode is `'inclusive'` |
| @introspeql-include | Includes a table or function when mode is `'exclusive'` |
| @introspeql-enable-nullable-args | Makes each parameter of the function to which it is applied nullable when `nullableArgs` is `false` in `config.functions` |
| @introspeql-disable-nullable-args  | Makes each parameter of the function to which it is applied non-nullable when `nullableArgs` is `true` in `config.functions`  |
| @introspeql-enable-nullable-return-types  | Makes the return type of the function to which it is applied nullable when `nullableReturnTypes` is `false` in `config.functions`|
| @introspeql-disable-nullable-return-types | Makes the return type of the function to which it is applied non-nullable when `nullableReturnTypes` is `true` in `config.functions`  |
| @introspeql-enable-tsdoc-comments | Copies the comments of the table, column, function or enum to which it is applied even when `config.copyComments` is false or is an array that does not include the given entity type. |
| @introspeql-disable-tsdoc-comments | Ignores the comments of the table, column, function or enum to which it is applied even when `config.copyComments` is true or is an array that includes the given entity type. |
| @introspeql-begin-tsdoc-comment | Copies a portion of a PostgreSQL comment into the generated type definition file beginning after this directive and ending at the next `@introspeql-end-tsdoc-comment` directive or at the end of the comment. |
| @introspeql-end-tsdoc-comment | Omits a portion of a PostgreSQL comment from the generated type definition file beginning after this directive and ending at the next `@introspeql-begin-tsdoc-comment` directive or at the end of the comment. |