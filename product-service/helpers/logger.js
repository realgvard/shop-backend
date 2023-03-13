function logError(error, event) {
  console.log({
    error,
    method: event.requestContext.http.method,
    path: event.requestContext.http.path,
    ip: event.requestContext.http.sourceIp,
    userAgent: event.requestContext.http.userAgent,
  });
}

function logInfo(status, event) {
  console.log({
    status,
    method: event.requestContext.http.method,
    path: event.requestContext.http.path,
    ip: event.requestContext.http.sourceIp,
    userAgent: event.requestContext.http.userAgent,
    requestId: event.requestContext.requestId,
  });
}

module.exports = {
  logError,
  logInfo
}
