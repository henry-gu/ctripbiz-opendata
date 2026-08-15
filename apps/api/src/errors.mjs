export class AppError extends Error {
  constructor(code, message, { statusCode = 500, retryable = false, upstreamCode = null, details = null } = {}) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    this.retryable = retryable;
    this.upstreamCode = upstreamCode;
    this.details = details;
  }
}

export function publicError(error, requestId) {
  const known = error instanceof AppError;
  return {
    requestId,
    error: {
      code: known ? error.code : "INTERNAL_ERROR",
      message: known ? error.message : "服务暂时不可用，请稍后重试",
      retryable: known ? error.retryable : false,
      upstreamCode: known ? error.upstreamCode : null,
      details: known ? error.details : null,
    },
  };
}
