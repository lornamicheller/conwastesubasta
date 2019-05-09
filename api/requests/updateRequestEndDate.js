import axios from "axios";
import cookies from "react-cookie";

export default function updateRequestEndDate(
  requestId: number,
  end_date: Date
) {
  const sessionToken = cookies.load("sessionToken");
  return axios.patch(API_URL + "/v1/request/end_date", {
    requestId,
    end_date,
    sessionToken
  });
}
