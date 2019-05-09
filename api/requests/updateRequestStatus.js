import axios from "axios";

export default function updateRequestStatus(
  requestId: number,
  statusId: number,
  decline_note: string,
  sessionToken: string
) {
  return axios.patch(API_URL + "/v1/request/status", {
    requestId,
    statusId,
    decline_note,
    sessionToken
  });
}
