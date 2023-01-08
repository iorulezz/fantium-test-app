export async function getConnectedAccount() {
  const accounts = await window.ethereum.request<string[]>({
    method: "eth_accounts",
  });
  if (accounts) {
    const account = accounts[0];
    if (account) return account;
  }
  return "";
}

export function isMetaMaskInstalled() {
  return Boolean(
    typeof window !== "undefined" &&
      window.ethereum &&
      window.ethereum.isMetaMask
  );
}

export const sliceAddress = (address: string) =>
  `${address.slice(0, 4)}...${address.slice(-4)}`;
