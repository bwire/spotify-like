interface AuthGeneralResult {
  accessToken: string;
}

interface Auth2FAResult {
  validate2FA: string;
  message: string;
}

export type AuthResult = AuthGeneralResult | Auth2FAResult;

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

export type ValidateTokenDto = {
  token: string;
};

export type VerifyResult = {
  verified: boolean;
};
