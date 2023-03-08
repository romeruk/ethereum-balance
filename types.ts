export interface ITokenInfo {
  id: string;
  symbol: string;
  name: string;
}

export interface ITokenCoingecko extends ITokenInfo {
  platforms: {
    [key: string]: string;
  };
}

export interface ITokenResponse extends ITokenInfo {
  balance: string;
}