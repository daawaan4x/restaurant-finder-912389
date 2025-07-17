import OpenAI from "openai";
import translatorOutputJsonSchema from "./translator-schema.json";
import { TranslatorOutputJson } from "./translator-schema";
import { stripEmptyFields } from "../../utils/strip-empty-fields";
import { ApiError } from "../error/api-error";

/**
 * Translator for natural-language search to structured query
 */
export class Translator {
  constructor(private opts: { openai: OpenAI }) {}

  /**
   * Translates natural-language search input to a structured query following {@link translatorOutputJsonSchema}
   *
   * @param search natural-language search text
   */
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

    if (response.status != "completed")
      throw new ApiError(500, "Failed to translate search input.", {
        cause: response,
      });

    const output = response.output[0];
    if (output.type != "message")
      throw new ApiError(500, "Unexpected translation ocurred.", {
        cause: response,
      });

    const content = output.content[0];
    if (content.type == "refusal")
      throw new ApiError(400, "Refused to translate search input.", {
        cause: response,
      });

    if (!content.parsed)
      throw new ApiError(500, "Failed to parse translation.", {
        cause: response,
      });

    return stripEmptyFields(content.parsed);
  }
}
