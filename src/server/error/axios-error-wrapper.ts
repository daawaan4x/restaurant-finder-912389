import { AxiosError } from "axios";

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
