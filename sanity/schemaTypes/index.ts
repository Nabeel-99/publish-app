import { type SchemaTypeDefinition } from "sanity";
import { author } from "./author";
import { startups } from "./startup";
import { playlist } from "./playlist";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startups, playlist],
};
