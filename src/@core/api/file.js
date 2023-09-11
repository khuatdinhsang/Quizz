import axios from "axios";
const root = process.env.REACT_APP_ROOT
export const FileUpload = async (file) => {
  let result = null;

  let formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`
  );

  await fetch(`${root}/ext/files/upload`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      result = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return result;
};
export const getFileById = (id) => {
  return axios.get(`${root}/ext/files/getFileById?id=${id}`);
};
