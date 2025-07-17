"use client";

import { contract } from "@/shared/contract";
import { initTsrReactQuery } from "@ts-rest/react-query/v5";

export const tsr = initTsrReactQuery(contract, {
  baseUrl: process.env.NEXT_PUBLIC_ORIGIN_URL ?? "http://localhost:3000/",
});
