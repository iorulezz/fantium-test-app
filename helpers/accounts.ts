export async function getConnectedAccount(): Promise<string> {
  const accounts = await window.ethereum.request<string[]>({
    method: "eth_accounts",
  });
  if (accounts) {
    const account = accounts[0];
    if (account) return account;
  }
  return "";
}
