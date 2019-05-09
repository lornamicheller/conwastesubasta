import axios from "axios";

export default function saveSingleFile(
  file: Object,
  user_id: number,
  file_type_id: number
) {
  return axios.post(API_URL + `/v1/file`, { file, user_id, file_type_id });
}
