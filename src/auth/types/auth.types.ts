export interface IUseToken {
  sub: string;
  exExpired: boolean;
}

export interface AuthTokenResult {
  role: string;
  id: string;
  iat: number;
  exp: number;
}
