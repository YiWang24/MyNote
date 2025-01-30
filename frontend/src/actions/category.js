import { categoryApi } from "@/api/category";

export async function fetchCategories() {
  try {
    const response = await categoryApi.getCategories();
    console.log(response)
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createCategory(category) {
  try {
    const response = await categoryApi.createCategory(category);
    if (response.status === 201) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateCategory(categoryId, category) {
  try {
    const response = await categoryApi.updateCategory(categoryId, category);
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteCategories(categoryIds) {
  try {
    const response = await categoryApi.deleteCategories({ categoryIds });
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
