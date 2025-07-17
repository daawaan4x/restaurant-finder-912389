import { initContract } from "@ts-rest/core";
import z from "zod";

const c = initContract();

export const contract = c.router({
  search: {
    method: "GET",
    path: "/api/execute",
    query: z.object({
      message: z.string().optional(),
      code: z.string().optional(),
    }),
    responses: {
      200: z.object({ data: z.unknown() }),
    },
  },
});
