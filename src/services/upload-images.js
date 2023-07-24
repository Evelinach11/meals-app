import axios from "axios";
export const uploadImages = (data) => {
  axios.post(`http://localhost:3001/user/upload`).then(() => {
    console.log("upload file " + data);
  });
};
