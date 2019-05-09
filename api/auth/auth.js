import axios from "axios";

export const checkAuth = async (sessionToken: string) => {
  const authResponse = await axios.get(API_URL + `/v1/session/${sessionToken}`);
  return !!authResponse.data.token;
};
