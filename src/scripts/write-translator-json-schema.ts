import { writeFile } from "fs/promises";
import { zodTextFormat } from "openai/helpers/zod";
import { translatorOutputSchema } from "../server/translator/translator-schema";

/**
 * At the time of writing (2025/7/17), {@link zodTextFormat} sets `nullable: true` to some fields instead of using `"anyOf": [{ "type": "null" }, ...]`.
 *
 * OpenAI's Structured Output feature appears to ignore the `"nullable": true` and only considers setting `null` to the fields if it has a union type with `null`.
 *
 * This function writes the generated JSON schema into a seperate JSON file instead, which can be manually modified to make the appropriate changes e.g. creating a union type with `null`.
 */
async function main() {
  const json = zodTextFormat(translatorOutputSchema, "translator_output");
  await writeFile(
    "./src/server/translator/translator-schema.json",
    JSON.stringify(json)
  );
  console.log(`✅ Updated ${new Date()}`);
  process.exit(0);
}

void main();
