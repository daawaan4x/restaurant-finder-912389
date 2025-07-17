import { router } from "@/server/router";
import { contract } from "@/shared/contract";
import { createNextHandler } from "@ts-rest/serverless/next";

export const handler = createNextHandler(contract, router, {
  handlerType: "app-router",
  jsonQuery: true,
});

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
  handler as OPTIONS,
};
