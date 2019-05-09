import axios from "axios";

export default function uploadFile(file: Blob) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => {
      axios
        .post(API_URL + `/v1/upload-file`, { file: reader.result })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    }; // CHANGE to whatever function you want which would eventually call resolve
    reader.onerror = () => {
      reject("There are some problems");
    };
    reader.readAsDataURL(file);
  });
}
