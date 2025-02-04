import api from "./api";

const callCategory = () => {
  const listAllCategories = async () => {
    const response = await api.get("/category/list-all-categories");
    const data = response.data;
    return data;
  };

  return {
    listAllCategories,
  };
};

export default callCategory;
