"use server";
import { categoryApi } from "@/api/category";

export async function fetchCategories() {
  try {
    const response = await categoryApi.getCategories();
    // console.log(response)
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

export async function fetchCreateCategory(category) {
  try {
    const response = await categoryApi.createCategory(category);
    console.log(response);
    if (response.status === 201) {
      return response.data;
    } else {
      return null;
    }
  } catch {
    throw new Error("Error creating category");
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

export async function fetchDeleteCategories(categoryIds) {
  try {
    // console.log(categoryIds);
    const response = await categoryApi.deleteCategories(categoryIds);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete categories"
    );
  }
}
