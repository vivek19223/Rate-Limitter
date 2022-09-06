export class ServiceUnavailableError extends Error {
  constructor (message) {
    super (message);
    this.statusCode = 500;
    this.status = 'Service Unavaialable';
    this.description = 'Sorry! Please try after sometimes.';
  }
}

export class ThrottleError extends Error {
  constructor (message) {
    super (message);
    this.statusCode = 429;
    this.status = 'Request Blocked';
    this.description = 'Too many request made!';
  }
}
