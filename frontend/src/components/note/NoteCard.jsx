import React from "react";
import { format, formatDistanceToNow } from "date-fns";
import { HyperText } from "@/components/ui/hyper-text";
import { SparklesText } from "@/components/ui/sparkles-text";
import { ShinyButton } from "@/components/ui/shiny-button";
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
  const { user, getNoteById, deleteNote, updateNoteState } = useNoteContext();
  const handleCardClick = () => {
    getNoteById(note._id);
  };
  const handleDialogClick = (e) => {
    e.stopPropagation(); // Stop event from reaching parent
  };

  const handleStateClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateNoteState(note._id);
  };
  const formatDate = (date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };

  const getTimeAgo = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative block cursor-pointer overflow-hidden rounded-lg border bg-pink-100 border-gray-100 p-4 sm:p-6 lg:p-8"
    >
      <Meteors number={30} />
      <span className="absolute  inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <HyperText className="text-xl md:text:2xl xl:text-3xl font-bold text-gray-900 sm:text-xl">
            {note.title}
          </HyperText>

          <p className="mt-1 text-xs font-medium text-gray-600">
            {user.firstName} {user.lastName}
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
        <SparklesText className="text-pretty text-lg" text={note.content} />
      </div>

      <dl className="mt-6 flex justify-between gap-4 sm:gap-6">
        <div className="flex flex-col-reverse">
          <dt className="inline-flex h-6 items-center justify-center rounded-md bg-blue-50 px-3 py-1 text-xs font-medium leading-none text-blue-700 ring-1 ring-inset ring-blue-700/10 hover:bg-blue-100 transition-colors">
            {note.category?.type}
          </dt>
          <dd className="text-xs text-gray-500">
            {formatDate(note.createdAt)}
          </dd>
        </div>

        <div className="flex flex-col-reverse">
          <dt onClick={handleStateClick}>
            {!note.state && (
              <ShinyButton className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-600/20 hover:bg-amber-100 transition-colors">
                To Do
              </ShinyButton>
            )}
            {note.state && (
              <ShinyButton className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-md bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-600/20 hover:bg-emerald-100 transition-colors">
                Done
              </ShinyButton>
            )}
          </dt>
          <dd className="text-xs text-gray-500">
            {getTimeAgo(note.createdAt)}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default NoteCard;
