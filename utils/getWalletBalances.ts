import { ITokenCoingecko, ITokenResponse } from "../types";
import web3 from "../web3";
import getTokenBalance from "./getTokenBalance";
import { PromisePool } from "@supercharge/promise-pool";

async function getBalancesOfWallet(
  walletAddress: string,
  coingeckoCoins: ITokenCoingecko[]
) {
  const ethereumBalance = await web3.eth.getBalance(walletAddress);

  const ethereum: ITokenResponse = {
    id: "ethereum",
    balance: web3.utils.fromWei(ethereumBalance, "ether"),
    symbol: "eth",
    name: "ethereum",
  };

  const { results } = await PromisePool.withConcurrency(500)
    .for(coingeckoCoins)
    .process(async (token) => {
      const data = await getTokenBalance(walletAddress, token);
      return data;
    });

  const tokenBalances: ITokenResponse[] = [];
  tokenBalances.push(...results.filter((data) => data.balance !== "0"));

  return {
    ethereum,
    tokenBalances
  };
}

export default getBalancesOfWallet;
