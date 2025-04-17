import { type SchemaTypeDefinition } from "sanity";
import { author } from "./author";
import { startups } from "./startup";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startups],
};
