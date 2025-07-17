import { TsRestRequest, TsRestResponse } from "@ts-rest/serverless";
import { ApiError } from "./api-error";

/**
 * Global Error Handler for the API
 */
export function errorHandler(error: unknown, request: TsRestRequest) {
  console.error(error, request);

  if (error instanceof Error) {
    const status = error instanceof ApiError ? error.status : 500;

    // If error is `ApiError`, we assume the message is safe (not sensitive) to show to the user.
    const body =
      error instanceof ApiError
        ? { message: error.message }
        : { message: "An internal server error ocurred." };

    return TsRestResponse.fromJson(body, { status });
  }

  return TsRestResponse.fromJson(
    { message: "An unexpected error ocurred." },
    { status: 500 }
  );
}
