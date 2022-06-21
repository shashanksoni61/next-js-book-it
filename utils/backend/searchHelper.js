export const searchHelper = function (searchFiled, fields) {
  let searchArr = [];
  fields.forEach((element) => {
    searchArr.push({
      [element]: { $regex: new RegExp(searchFiled), $options: "i" },
    });
  });
  return { $match: { $or: searchArr } };
};
