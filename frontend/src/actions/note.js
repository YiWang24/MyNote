"use server";
import { noteApi } from "@/api/note";
export async function fetchCreateNote(note) {
  try {
    await noteApi.create(note);
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchNotes(params) {
  try {
    const response = await noteApi.get(params);
    // console.log(response);
    if (response.status === 200) {
      return {
        data: response.data.data,
        meta: response.data.meta,
      };
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchUpdateNote(id, note) {
  try {
    const response = await noteApi.update(id, note);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error);
  }
}
export async function fetchDeleteNotes(id) {
  try {
    const response = await noteApi.delete(id);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error);
  }
}
