import z from "zod";
import { Translator } from ".";
import { findPlacesBaseSchema as baseSchema } from "../foursquare";
import { zodTextFormat } from "openai/helpers/zod.mjs";

const base = baseSchema.shape;

/**
 * Output Schema for {@link Translator}
 */
export const translatorOutputSchema = z.object({
  query: base.query
    .nullable()
    .describe(
      "A string to be matched against all content for this place, including but not limited to venue name, category, telephone number, taste, and tips."
    ),

  ll: base.ll
    .nullable()
    .describe(
      "The latitude/longitude around which to retrieve place information. This must be specified as ll=lat,lon"
    ),

  radius: base.radius
    .nullable()
    .describe(
      "Sets a radius distance (in meters) used to define an area to bias search results. The maximum allowed radius is 100,000 meters. Radius can be used in combination with ll or ip biased geolocation only. By using radius, global search results will be omitted. If not provided, default radius applied is 22000 meters."
    ),

  min_price: base.min_price
    .nullable()
    .describe(
      "Restricts results to only those places within the specified price range. Valid values range between 1 (most affordable) to 4 (most expensive), inclusive."
    ),

  max_price: base.max_price
    .nullable()
    .describe(
      "Restricts results to only those places within the specified price range. Valid values range between 1 (most affordable) to 4 (most expensive), inclusive."
    ),

  open_at: base.open_at
    .nullable()
    .describe(
      "Support local day and local time requests through this parameter. To be specified as DOWTHHMM (e.g., 1T2130), where DOW is the day number 1-7 (Monday = 1, Sunday = 7) and time is in 24 hour format. Places that do not have opening hours will not be returned if this parameter is specified. Cannot be specified in conjunction with open_now."
    ),

  open_now: base.open_now
    .nullable()
    .describe(
      "Restricts results to only those places that are open now. Places that do not have opening hours will not be returned if this parameter is specified. Cannot be specified in conjunction with open_at."
    ),

  near: base.near
    .nullable()
    .describe(
      "A string naming a locality in the world (e.g., 'Chicago, IL'). If the value is not geocodable, returns an error. Global search results will be omitted."
    ),

  sort: base.sort
    .nullable()
    .describe("Specifies the order in which results are listed."),

  limit: base.limit
    .nullable()
    .describe("The number of results to return, up to 50. Defaults to 10."),
});

const _translatorOutputJsonSchema = zodTextFormat(
  translatorOutputSchema,
  "translator_output"
);

/**
 * Output JSON Schema type helper
 */
export type TranslatorOutputJson = typeof _translatorOutputJsonSchema;
