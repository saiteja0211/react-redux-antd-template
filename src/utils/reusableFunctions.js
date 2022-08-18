export const filterList = (list, lookupName, value) => {
  let filteredList = list.filter(
    (each) => each[lookupName].toLowerCase().indexOf(value.toLowerCase()) > -1
  );
  console.log("filteredList", filteredList);

  return filteredList;
};

export const getCategoryImage = (imgName) => {
  let image;
  try {
    image = require(`../assets/categories-images/${imgName}`).default;
    // do stuff
  } catch (ex) {
    image = "error";
  } finally {
    return image;
  }
};

export const replaceSpaces = (name) => {
  // return name
  //   ?.replace(/[\d`~!@#$%^&*()_|+\-=?;:'",.<>{}[\s]+/g, "-")
  //   .toLowerCase();
  return name.split(" ").join("-").toLowerCase();
};

export const undoReplaceSpaces = (name) => {
  return name.split("-").join(" ");
};

export const getUniqueArrayElements = (array) => {
  if (!array || !Array.isArray(array) || array.length === 0) {
    return [];
  }

  return [...new Set(array)];
};
