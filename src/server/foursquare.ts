import axios, { AxiosError, AxiosInstance } from "axios";
import z from "zod";
import { ApiError } from "./error/api-error";
import { AxiosErrorWrapper } from "./error/axios-error-wrapper";
import { StatusCodes } from "http-status-codes";

/**
 * Base Schema for query params for {@link Foursquare.findPlaces}
 */
export const findPlacesBaseSchema = z.object({
  query: z.string(),
  ll: z.string(),
  radius: z.number().min(0).max(10000),
  min_price: z.number().min(1).max(4),
  max_price: z.number().min(1).max(4),
  open_at: z.string(),
  open_now: z.boolean(),
  near: z.string(),
  sort: z.enum(["relevance", "rating", "distance", "popularity"]),
  limit: z.number().min(1).max(50),
});

/**
 * Input Validation Schema for {@link Foursquare.findPlaces}
 */
export const findPlacesInputSchema = findPlacesBaseSchema.partial().optional();

type FindPlacesOutput = {
  // pass actual params used, useful for debugging
  params: z.output<typeof findPlacesInputSchema>;

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

/**
 * Typesafe Foursquare API Client
 *
 * @see - https://docs.foursquare.com/
 */
export class Foursquare {
  private api: AxiosInstance;

  constructor(
    opts: {
      /**
       * Defaults to `process.env.FOURSQUARE_API_KEY`
       */
      apiKey?: string;
    } = {},
  ) {
    opts.apiKey ??= process.env.FOURSQUARE_API_KEY;
    if (!opts.apiKey) throw new Error("Foursquare API Key required.");

    this.api = axios.create({
      baseURL: "https://places-api.foursquare.com/",
      headers: {
        Authorization: `Bearer ${opts.apiKey}`,
      },
    });
  }

  /**
   * Find places using https://places-api.foursquare.com/places/search
   * @param input - Query parameters for the endpoint
   *
   * @see https://docs.foursquare.com/fsq-developers-places/reference/place-search
   */
  async findPlaces(input: z.input<typeof findPlacesInputSchema> = {}) {
    const params = findPlacesInputSchema.parse(input);

    return await this.api
      .get("/places/search", {
        headers: { "X-Places-Api-Version": "2025-06-17" },
        params,
      })
      .then((response) => {
        return {
          params,
          ...response.data,
        } as FindPlacesOutput;
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          // if downstream response is BAD_REQUEST, return BAD_REQUEST
          // default to INTERNAL_SERVER_ERROR for any other errors
          const status =
            error.status == StatusCodes.BAD_REQUEST
              ? StatusCodes.BAD_REQUEST
              : StatusCodes.INTERNAL_SERVER_ERROR;
          throw new ApiError(status, error.message, {
            cause: new AxiosErrorWrapper(error),
          });
        }

        throw error;
      });
  }
}
