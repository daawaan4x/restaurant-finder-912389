import { AxiosError } from "axios";

/**
 * A {@link AxiosError} wrapper containing only the key details.
 */
export class AxiosErrorWrapper extends Error {
  config: AxiosError["config"];
  request: AxiosError["request"];
  response: AxiosError["response"];
  status: AxiosError["status"];

  constructor(error: AxiosError) {
    super(error.message);
    this.config = error.config;
    this.request = error.request;
    this.response = error.response;
    this.status = error.status;
  }
}
