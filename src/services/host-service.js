const baseUrl = "http://localhost:3001";

export const getBaseImageUrl = () => {
  return baseUrl;
};

export const getFullImageUrl = (imgPath) => {
  return `${baseUrl}${imgPath}`;
};
