export class ApiError extends Error {
  constructor(status: number);
  constructor(status: number, message?: string);
  constructor(status: number, message?: string, options?: ErrorOptions);
  constructor(
    public status: number,
    message?: string,
    options?: ErrorOptions
  ) {
    super(message, options);
  }
}
