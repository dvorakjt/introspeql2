import { EntityData } from "../config/entity-data";
import { Directives } from "./directives";

interface ShouldIncludeEntityParams {
  name: string;
  schema: string;
  comment: string | null;
  mode: "inclusive" | "exclusive";
  exceptions: EntityData[];
}

export function shouldIncludeEntity({
  name,
  schema,
  comment,
  mode,
  exceptions,
}: ShouldIncludeEntityParams) {
  const tokens = comment ? comment.split(/\s/).map((t) => t.toLowerCase()) : [];

  if (mode === "inclusive") {
    if (exceptions.some((e) => e.schema === schema && e.name === name)) {
      return false;
    }

    if (tokens.some((t) => t === Directives.Exclude)) {
      return false;
    }

    return true;
  }

  if (exceptions.some((e) => e.schema === schema && e.name === name)) {
    return true;
  }

  if (tokens.some((t) => t === Directives.Include)) {
    return true;
  }

  return false;
}
