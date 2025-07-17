import axios, { AxiosInstance } from "axios";
import z from "zod";

/**
 * Input Validation Schema for {@link Foursquare.findPlaces}
 */
export const findPlacesInputSchema = z
  .object({
    query: z.string(),
    ll: z
      .tuple([z.number().min(-90).max(90), z.number().min(-180).max(180)])
      .transform((arg) => arg.join(",")),
    radius: z.number().min(0).max(10000),
    min_price: z.number().min(1).max(4),
    max_price: z.number().min(1).max(4),
    open_at: z.string(),
    open_now: z.boolean(),
    near: z.string(),
    limit: z.number().min(1).max(50),
  })
  .partial()
  .optional();

/**
 * Typesafe Foursquare API Client
 *
 * @see - https://docs.foursquare.com/
 */
export class Foursquare {
  private api: AxiosInstance;

  constructor(opts: { apiKey: string }) {
    this.api = axios.create({
      baseURL: "https://places-api.foursquare.com/",
      headers: {
        Authorization: `Bearer ${opts.apiKey}`,
      },
    });
  }

  /**
   * TODO: Add Error Handling for 400, 401 responses
   *
   * Find places using https://places-api.foursquare.com/places/search
   * @param input - Query parameters for the endpoint
   *
   * @see https://docs.foursquare.com/fsq-developers-places/reference/place-search
   */
  async findPlaces(input: z.input<typeof findPlacesInputSchema> = {}) {
    const params = findPlacesInputSchema.parse(input);
    const response = await this.api.get("/places/search", {
      headers: { "X-Places-Api-Version": "2025-06-17" },
      params,
    });

    return {
      params,
      ...response.data,
    } as {
      // pass actual params used, useful for debugging
      params: typeof params;

      // type definition of original response from Foursquare API
      results: unknown[];
      context: {
        geo_bounds: {
          circle: {
            center: { latitude: number; longitude: number };
            radius: number;
          };
        };
      };
    };
  }
}
