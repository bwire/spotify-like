export interface AuthResult {
  accessToken: string;
}

export interface JwtPayload {
  email: string;
  sub: number;
}

export interface RequestUserData {
  userId: number;
  email: string;
}
