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
      return { data: [], meta: {} };
    }
  } catch (error) {
    return { data: [], meta: {} };
  }
}

export async function fetchUpdateNote(id, note) {
  try {
    console.log(id, note);
    await noteApi.update(id, note);
  } catch (error) {
    throw new Error(error);
  }
}
export async function fetchDeleteNotes(id) {
  try {
    await noteApi.delete(id);
  } catch (error) {
    throw new Error(error);
  }
}
