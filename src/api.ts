import { AccessTokenResponseT } from "./types/auth";
import { ListFolderResponseT } from "./types/file";
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

export const listFolders = (): Promise<ListFolderResponseT> =>
  axios
    .post(
      "https://api.dropboxapi.com/2/files/list_folder",
      { path: "", recursive: false },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      }
    )
    .then((res) => res.data);

export const downloadFile = (fileId: string): Promise<Blob> =>
  axios
    .post("https://content.dropboxapi.com/2/files/download", undefined, {
      responseType: "blob",
      headers: {
        "Dropbox-API-Arg": JSON.stringify({ path: fileId }),
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => res.data);
