import { errorHandler } from "@/server/error/error-handler";
import { router } from "@/server/router";
import { contract } from "@/shared/contract";
import { createNextHandler } from "@ts-rest/serverless/next";

/**
 * Catch-all ts-rest route handler for decoupling API paths from NextJS-specific project structure
 */
export const handler = createNextHandler(contract, router, {
  handlerType: "app-router",
  jsonQuery: true,
  errorHandler,
});

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
  handler as OPTIONS,
};
