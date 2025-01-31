import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Meteors } from "../ui/meteors";
import { useNoteContext } from "@/lib/noteContext";
import { Button } from "../ui/button";

const NoteCard = ({ note }) => {
  const { getNoteById, deleteNote } = useNoteContext();
  const handleClick = () => {
    getNoteById(note._id);
  };
  const handleDialogClick = (e) => {
    e.stopPropagation(); // Stop event from reaching parent
  };
  return (
    <div
      onClick={handleClick}
      className="relative block cursor-pointer overflow-hidden rounded-lg border bg-pink-100 border-gray-100 p-4 sm:p-6 lg:p-8"
    >
      <Meteors number={30} />
      <span className="absolute  inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
            {note.title}
          </h3>

          <p className="mt-1 text-xs font-medium text-gray-600">
            {note.firstName} {note.lastName}
          </p>
        </div>

        <div
          className="hidden sm:block sm:shrink-0"
          onClick={handleDialogClick}
        >
          <Dialog>
            <DialogTrigger
              className="inline-flex items-center px-4 py-2 rounded-md 
    text-sm font-medium transition-colors
    bg-red-50 text-red-600
    hover:bg-red-100
    dark:bg-red-900/10 dark:text-red-500 dark:hover:bg-red-900/20
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50"
            >
              Delete
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your Note and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => deleteNote(note._id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mt-4 ">
        <p className="text-pretty text-sm text-gray-500">{note.content}</p>
      </div>

      <dl className="mt-6 flex gap-4 sm:gap-6">
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">
            {note.category.type}
          </dt>
          <dd className="text-xs text-gray-500">{note.createdAt}</dd>
        </div>

        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">Reading time</dt>
          <dd className="text-xs text-gray-500">3 minute</dd>
        </div>
      </dl>
    </div>
  );
};

export default NoteCard;
