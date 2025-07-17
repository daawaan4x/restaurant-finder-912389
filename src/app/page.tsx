"use client";

import { tsr } from "@/client/ts-rest";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactJson = dynamic(() => import("@microlink/react-json-view"), {
  ssr: false,
});

export default function Home() {
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");

  const searchQuery = tsr.search.useQuery({
    queryKey: ["search"],
    queryData: {
      query: { code, message },
    },
    enabled: false,
    retry: false,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => void searchQuery.refetch(), []);

  const json = searchQuery.error ?? searchQuery.data?.body?.data ?? {};

  return (
    <div className="flex flex-col items-center font-sans pt-44 pb-28">
      <header className="flex flex-col mb-12 items-center">
        <h1 className="text-4xl font-bold">🍽️ Restaurant Finder</h1>
        <p className="flex flex-row space-x-2 mt-4 opacity-60 text-sm items-center">
          <span>by Theone Genesis Eclarin</span>

          {/* Github Badge */}
          <a href="https://github.com/daawaan4x">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="rounded border"
              src="https://img.shields.io/badge/@daawaan4x-white?logo=github&logoColor=121013"
              alt="Github"
            />
          </a>
        </p>
      </header>

      <main className="flex flex-col w-[80%] max-w-xl items-center space-y-4">
        <div className="grid w-full gap-2">
          <Textarea
            placeholder="Describe the restaurant you want to visit!"
            value={message}
            onChange={(value) => setMessage(value.target.value)}
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              className="max-w-xs font-mono"
              placeholder="Code"
              value={code}
              onChange={(value) => setCode(value.target.value)}
            />
            <Button onClick={() => searchQuery.refetch()}>Search</Button>
          </div>
        </div>

        {searchQuery.isFetching && (
          <div className="flex flex-col mt-4 space-y-2 items-center">
            <Skeleton className="h-4 w-72" />
            <Skeleton className="h-4 w-60" />
            <Skeleton className="h-4 w-48" />
          </div>
        )}

        {!searchQuery.isFetching && searchQuery.isFetched && (
          <div className="w-full mt-4">
            <ReactJson src={json} collapsed={3} />
          </div>
        )}
      </main>
    </div>
  );
}
