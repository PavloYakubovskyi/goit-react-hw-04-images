import axios from "axios";

// axios.defaults.baseURL = "https://pixabay.com/api";

export const searchImgs = async (value, apiKey, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${value}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`
  );
  //   throw new Error("oops ! some error");

  return data;
};

// export const findPostById = async (postId) => {
//   const { data } = await axios.get(
//     `https://jsonplaceholder.typicode.com/posts/${postId}`
//   );
//   return data;
// };
