declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * API Key for OpenAI API
     */
    OPENAI_API_KEY?: string;

    /**
     * API Key for Foursquare API
     */
    FOURSQUARE_API_KEY?: string;
  }
}
