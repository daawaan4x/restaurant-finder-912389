import { TsRestRequest, TsRestResponse } from "@ts-rest/serverless";
import { ApiError } from "./api-error";

/**
 * Global Error Handler for the API
 */
export function errorHandler(error: unknown, request: TsRestRequest) {
  console.error(error, request);

  if (error instanceof ApiError) {
    if (!error.message)
      return new TsRestResponse(null, { status: error.status });
    return TsRestResponse.fromJson(
      { message: error.message },
      { status: error.status }
    );
  }

  if (error instanceof Error) {
    if (!error.message) return new TsRestResponse(null, { status: 500 });
    return TsRestResponse.fromJson({ message: error.message }, { status: 500 });
  }

  return TsRestResponse.fromJson(
    { message: "An unexpected error ocurred." },
    { status: 500 }
  );
}
