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
    // console.error(error);
    return null;
  }
}

export async function fetchCreateCategory(category) {
  try {
    await categoryApi.createCategory(category);
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
    const response = await categoryApi.deleteCategories(categoryIds);
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
