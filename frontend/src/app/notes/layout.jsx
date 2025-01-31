import NoteSideBar from "@/components/note/NoteSideBar";
import React from "react";
import { NoteContextProvider } from "@/lib/noteContext";
export const metadata = {
  title: "My note",
  description: "Generated by create next app",
};

export default function layout({ children }) {
  return (
    <NoteContextProvider>
      <div
        className="relative flex flex-col sm:flex-row  h-screen"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="flex-grow h-1/2 sm:flex-grow-0 sm:w-1/6 sm:h-full rounded-lg bg-gray-200   ">
          <NoteSideBar />
        </div>
        <div className="flex-grow  sm:w-5/6 sm:h-full       bg-[url('/noteColor.jpg')] bg-cover bg-center                       ">
          {children}
        </div>
      </div>
    </NoteContextProvider>
  );
}
