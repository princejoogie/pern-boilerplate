import axios from "axios";

export const getAccessToken = async () => {
  try {
    const { data } = await axios.post(
      "http://localhost:4000/refresh-token",
      null,
      { withCredentials: true }
    );
    return data.accessToken;
  } catch (err) {
    console.log({ ...err });
    return "";
  }
};
