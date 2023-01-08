export const parseError = (errMsg: string) => {
  const errorRegex = /reason="([^"]+)/;
  const errorMatch = errMsg.match(errorRegex);
  if (errorMatch) {
    const errorString = errorMatch[1];
    return errorString;
  } else if (errMsg.includes("ACTION_REJECTED")) {
    return "User rejected the transaction."
  }
  return "Unknown error";
};

export const throwError = (errMsg: string) => {
  const message = parseError(errMsg);
  throw new Error(message);
};
