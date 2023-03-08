import axios from "axios";
import express from "express";
import { ITokenCoingecko } from "./types";
import setupJob from "./utils/cronSetup";
import getBalancesOfWallet from "./utils/getWalletBalances";
import web3 from "./web3";

const app = express();
const coins: ITokenCoingecko[] = [];

app.get("/balances/:address", async (req, res) => {
	try {
		const address: string = req.params.address;

		if (!web3.utils.isAddress(address)) {
			res.status(500).json({
				data: [],
				message: "Invalid wallet address"
			});

			return;
		}

		const getBalances = await getBalancesOfWallet(address, coins);
		res.json({
			data: getBalances
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			data: [],
			message: "Server error"
		})
	}
});

async function start () {
	try {

		const response = await axios.get<ITokenCoingecko[]>(
			"https://api.coingecko.com/api/v3/coins/list?include_platform=true"
		);

		coins.push(...response.data.filter((token) => token.platforms.ethereum));

		setupJob(coins);

		app.listen(3000, () => {
			console.log("Server started on port 3000");
		});
	} catch (error) {
		console.error(error);
	}
}

start();
