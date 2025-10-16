import type { FunctionData } from "./function-data";
import type { ParsedConfig } from "../config";

export function shouldIncludeFunction(fd: FunctionData, config: ParsedConfig) {
  if (!fd.overloads.length) return false;

  if (config.functions.mode === "inclusive") {
    return !config.functions.excludeFunctions.some(({ name, schema }) => {
      return name === fd.name && schema === fd.schema;
    });
  }

  return config.functions.includeFunctions.some(({ name, schema }) => {
    return name === fd.name && schema === fd.schema;
  });
}
