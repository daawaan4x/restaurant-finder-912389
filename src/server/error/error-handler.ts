import { TsRestRequest, TsRestResponse } from "@ts-rest/serverless";
import { ApiError } from "./api-error";

/**
 * Global Error Handler for the API
 */
export function errorHandler(error: unknown, request: TsRestRequest) {
  console.error(error, request);

  if (error instanceof Error) {
    const status = error instanceof ApiError ? error.status : 500;
    const body = error.message ? { message: error.message } : null;
    return TsRestResponse.fromJson(body, { status });
  }

  return TsRestResponse.fromJson(
    { message: "An unexpected error ocurred." },
    { status: 500 }
  );
}
