import { contract } from "@/shared/contract";
import { tsr } from "@ts-rest/serverless/next";
import OpenAI from "openai";
import { Translator } from "./translator";
import { Foursquare } from "./foursquare";
import { ApiError } from "./error/api-error";
import { StatusCodes } from "http-status-codes";

/**
 * Global Route Handler for the Application API
 */
export const router = tsr.router(contract, {
  /**
   * Search Foursquare Places using natural-language search input
   */
  async search({ query: params }) {
    // authenticate by requiring `code=pioneerdevai`
    const { code, message } = params;
    if (code !== "pioneerdevai") throw new ApiError(StatusCodes.UNAUTHORIZED);

    // translate natural-lang message to structured query
    const openai = new OpenAI();
    const translator = new Translator({ openai });
    const query = await translator.toQuery(message ?? "");

    // use query in Foursquare API
    const foursquare = new Foursquare();
    const response = await foursquare.findPlaces(query);

    return {
      status: 200,
      body: {
        data: response,
      },
    };
  },
});
