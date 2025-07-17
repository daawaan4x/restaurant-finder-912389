"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="flex flex-col items-center font-sans">
      <div className="flex flex-col mt-44 mb-12 items-center">
        <h1 className="text-4xl font-bold">🍽️ Restaurant Finder</h1>
        <p className="flex flex-row space-x-2 mt-4 opacity-60 text-sm items-center">
          <span>by Theone Genesis Eclarin</span>
          <a href="https://github.com/daawaan4x">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="rounded border"
              src="https://img.shields.io/badge/@daawaan4x-white?logo=github&logoColor=121013"
              alt="Github"
            />
          </a>
        </p>
      </div>

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
            <Button>Search</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
