const getFullImgUrl = (baseUrl, fileName, fileFormat = "png") => {
  return `${baseUrl}${fileName}.${fileFormat}`;
};

export { getFullImgUrl };
