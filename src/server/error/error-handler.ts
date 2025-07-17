import { TsRestRequest, TsRestResponse } from "@ts-rest/serverless";
import { ApiError } from "./api-error";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

/**
 * Global Error Handler for the API
 */
export function errorHandler(error: unknown, request: TsRestRequest) {
  console.error(error, request);

  if (error instanceof Error) {
    const status =
      error instanceof ApiError
        ? error.status
        : StatusCodes.INTERNAL_SERVER_ERROR;

    // If error is `ApiError`, we assume the message is safe (not sensitive) to show to the user.
    const body =
      error instanceof ApiError
        ? { message: error.message ?? getReasonPhrase(status) }
        : { message: "A server error ocurred." };

    return TsRestResponse.fromJson(body, { status });
  }

  return TsRestResponse.fromJson(
    { message: "An unexpected error ocurred." },
    { status: StatusCodes.INTERNAL_SERVER_ERROR },
  );
}
