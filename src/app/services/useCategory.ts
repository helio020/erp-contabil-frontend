import api from "./api";

const useCategory = () => {
  const listAllCategories = async () => {
    const response = await api.get("/category/list-all-categories");
    const data = response.data;
    return data;
  };

  return {
    listAllCategories,
  };
};

export default useCategory;
