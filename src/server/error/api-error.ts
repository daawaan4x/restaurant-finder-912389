/**
 * General-purpose error class for throwing errors with an HTTP status code
 */
export class ApiError extends Error {
  /**
   * @param status - HTTP status code to return
   */
  constructor(status: number);

  /**
   * @param message - A safe message to show to the user. AVOID including sensitive information.
   */
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
