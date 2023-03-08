import cron from "node-cron";
import fsp from "node:fs/promises";

import { ITokenCoingecko } from "../types";
import web3 from "../web3";
import getBalancesOfWallet from "./getWalletBalances";

function setupJob(coins: ITokenCoingecko[]) {
  let isRunning = false;

  cron.schedule("* * * * *", async () => {
    try {
      if (isRunning) {
        return;
      }

      isRunning = true;

      const wallet = process.env.WALLET_ADDRESS

			if (!wallet || !web3.utils.isAddress(wallet)) {
				console.log("[CRON] No valid wallet address found");
				return;
			}

      const { ethereum } = await getBalancesOfWallet(wallet, coins);
      await fsp.writeFile(
        "latestbalance.json",
        JSON.stringify({ ethereum, timestamp: new Date() }, null, 2),
        "utf-8"
      );

      isRunning = false;
    } catch (error) {
      console.error(error);
    } finally {
      isRunning = false;
    }
  });
}

export default setupJob;
