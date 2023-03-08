import { ITokenCoingecko } from "../types";
import web3 from "../web3";

async function getTokenBalance(
  tokenHolder: string,
  token: ITokenCoingecko
) {
  const contract = new web3.eth.Contract(
    [
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            name: "balance",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      }
    ],
    token.platforms.ethereum
  );

  const balance: string = await contract.methods.balanceOf(tokenHolder).call();

  return {
		balance: web3.utils.fromWei(balance, "ether"),
		id: token.id,
    symbol: token.symbol,
  	name: token.name,
	}
}

export default getTokenBalance;
