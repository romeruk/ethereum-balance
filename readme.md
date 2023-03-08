# How to start application
create .env, setup following props

```
WALLET_ADDRESS: "0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5" - address of ethereum wallet
WEB3HTTP_PROVIDER: "https://mainnet.infura.io/v3/secret" - web3.js provider url
```

make build of application

```bash
npm run build
```
start application with a following command (make sure you have installed dotenv-cli globally):

```bash
dotenv -e .env npm run start
```

## Get balances of all ERC20 tokens and the balance of Ethereum native tokens for a given address

`GET /balances/:address`