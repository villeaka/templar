import * as t from "io-ts";

export const AccessTokenResponse = t.type({
  access_token: t.string,
  account_id: t.string,
  expires_in: t.number,
  scope: t.string,
  token_type: t.string,
  uid: t.string,
});

export type AccessTokenResponseT = t.TypeOf<typeof AccessTokenResponse>;
