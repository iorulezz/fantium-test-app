export const parseError = (errMsg: string) => {
  const errorRegex = /error=(\{.+\})/;
  const errorMatch = errMsg.match(errorRegex);
  if (errorMatch) {
    const errorString = errorMatch[1];
    const error = JSON.parse(errorString);
    
    if (error.data.message) return error.data.message;
  } else if (errMsg.includes("ACTION_REJECTED")) {
    return "User rejected the transaction."
  }
  return "Unknown error";
};

export const throwError = (errMsg: string) => {
  const message = parseError(errMsg);
  throw new Error(message);
};
