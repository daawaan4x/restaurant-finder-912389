import OpenAI from "openai";
import translatorOutputJsonSchema from "./translator-schema.json";
import { TranslatorOutputJson } from "./translator-schema";
import { stripEmptyFields } from "../../utils/strip-empty-fields";

export class Translator {
  constructor(private opts: { openai: OpenAI }) {}

  async toQuery(search: string) {
    const { openai } = this.opts;

    const system = `
# Role & Task

You are a structured query translator for natural-language searching for Foursquare Places API. Your task is to convert a natural-language search input from the user and convert it into a structured query JSON using the provided JSON schema that the Foursquare Places API accepts. If the provided search input is not related or relevant to the task, return an empty set of parameters.
    
# Foursquare Places API Description
    
Search for places in the FSQ Places database using a location and querying by name, category name, telephone number, taste label, or chain name. For example, search for "coffee" to get back a list of recommended coffee shops.

You may pass a location with your request by using one of the following options. If none of the following options are passed, Place Search defaults to geolocation using ip biasing with the optional radius parameter.

ll & radius (circular boundary)
near (geocodable locality)`;

    const response = await openai.responses.parse({
      model: "gpt-4.1",
      input: [
        { role: "system", content: system },
        { role: "user", content: search },
      ],
      text: {
        format: translatorOutputJsonSchema as unknown as TranslatorOutputJson,
      },
    });

    return stripEmptyFields(response.output_parsed!);
  }
}
