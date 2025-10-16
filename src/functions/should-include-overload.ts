import { Directives } from "../shared";
import type { ParsedConfig } from "../config";

export function shouldIncludeOverload(
  comment: string | null,
  config: ParsedConfig
) {
  if (!comment) return true;

  const tokens = comment.split(/\s/);

  if (config.functions.mode === "inclusive") {
    return !tokens.some((t) => t === Directives.Exclude);
  }

  return tokens.some((t) => t === Directives.Include);
}
