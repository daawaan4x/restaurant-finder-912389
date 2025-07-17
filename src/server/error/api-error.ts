export class ApiError extends Error {
  constructor(status: number);
  constructor(status: number, message?: string);
  constructor(
    public status: number,
    message?: string,
    options?: ErrorOptions
  ) {
    super(message, options);
  }
}
