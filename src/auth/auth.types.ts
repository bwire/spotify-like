export interface AuthResult {
  accessToken: string;
}

export interface JwtPayload {
  email: string;
  userId: number;
  artistId?: number;
}

export interface RequestUserData {
  userId: number;
  email: string;
  artistId: number;
}

export type Enable2FAType = {
  secret: string;
};
