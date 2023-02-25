import pkceChallenge from "pkce-challenge";
import { StringParam, useQueryParam } from "use-query-params";
import useSWR from "swr";
import { fetchAuthToken } from "../api";
import { useEffect } from "react";
import { getStoredCodeVerifier, setStoredCodeVerifier } from "../utils/auth";

type Props = {
  onLogin: (accessToken: string) => void;
};

const initiateAuthentication = () => {
  const { code_challenge: codeChallenge, code_verifier: codeVerifier } = pkceChallenge(128);
  const clientId = "coftmspn0n9j9to"; // TODO: Get from env.
  const responseType = "code";
  const redirectUri = "http://localhost:5173"; // TODO: Get from env.
  const codeChallengeMethod = "S256";

  const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${clientId}&response_type=${responseType}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}&redirect_uri=${redirectUri}`;

  setStoredCodeVerifier(codeVerifier);
  window.location.href = authUrl;
};

const getAuthToken = (code: string) => {
  const codeVerifier = getStoredCodeVerifier();

  if (!codeVerifier) {
    throw new Error("Expected to find a stored code verifier");
  }

  return fetchAuthToken(code, codeVerifier);
};

const Authentication = (props: Props) => {
  const [codeQueryParam, setCodeQueryParam] = useQueryParam("code", StringParam);
  const { data: accessTokenResponse } = useSWR(codeQueryParam, getAuthToken);

  useEffect(() => {
    if (!codeQueryParam) {
      initiateAuthentication();
    }
  }, []);

  useEffect(() => {
    if (accessTokenResponse) {
      props.onLogin(accessTokenResponse.access_token);
      setCodeQueryParam(undefined, "replace");
    }
  }, [accessTokenResponse]);

  return <h3>Authenticating...</h3>;
};

export default Authentication;
