import { noteApi } from "@/api/note";
export async function createNote(note) {
  try {
    const response = await noteApi.create(note);
    if(response.status === 201){
      return response.data;
    }
  } catch (error) {
    throw new Error(error);
  }
}
