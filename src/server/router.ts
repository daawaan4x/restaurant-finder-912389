import { contract } from "@/shared/contract";
import { tsr } from "@ts-rest/serverless/next";
import OpenAI from "openai";
import { Translator } from "./translator";
import { Foursquare } from "./foursquare";
import { ApiError } from "./error/api-error";

export const router = tsr.router(contract, {
  async search({ query: params }) {
    const { code, message } = params;
    if (code !== "pioneerdevai") throw new ApiError(401);

    const openai = new OpenAI();
    const translator = new Translator({ openai });
    const query = await translator.toQuery(message ?? "");

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
