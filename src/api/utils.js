import axios from "axios";

// upload to imgbb
export const imageUpload = async (imageData) => {
  const imageFormData = new FormData();
  imageFormData.append("image", imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    imageFormData
  );
  // image url response from imgbb
  return data?.data?.url;
};

// save or update user in db
export const saveUserInDb = async (user) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/add-user`,
    user
  );

  console.log(data);
};
