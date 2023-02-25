import { AccessTokenResponseT } from "./types/auth";
import axios from "axios";

export const fetchAuthToken = (
  code: string,
  codeVerifier: string
): Promise<AccessTokenResponseT> => {
  const body = axios.toFormData({
    code,
    code_verifier: codeVerifier,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:5173", // TODO: Get from env.
    client_id: "coftmspn0n9j9to", // TODO: Get from env.
  });

  return axios
    .post("https://api.dropboxapi.com/oauth2/token", body, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    .then((res) => res.data);
};
