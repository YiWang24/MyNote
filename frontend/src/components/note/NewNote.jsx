"use client";
import { useNoteContext } from "@/lib/noteContext";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/particles";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NewNote = () => {
  const {
    newNote,
    setNewNote,
    categories,
    controlNoteModal,
    isNoteModalOpen,
    createNote,
  } = useNoteContext();
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNote(newNote);
    setNewNote({});
    controlNoteModal();
  };

  useEffect(() => {
    if (isNoteModalOpen) {
      // Get current scroll width
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      // Add padding to body to prevent content shift
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "unset";
    };
  }, [isNoteModalOpen]);
  return (
    <>
      <button
        onClick={controlNoteModal}
        className="fixed bottom-6 right-6 rounded-full bg-pink-500 p-4 text-white shadow-lg transition-transform hover:bg-pink-600 hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>

      {isNoteModalOpen && (
        <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <Particles
            className="absolute inset-0 z-0"
            quantity={100}
            ease={80}
            color="#ffffff"
            refresh
          />
          <Card className="w-[350px] sm:w-[450px] md:w-[550px] lg:w-[650px]">
            <CardHeader>
              <CardTitle>
                Create{" "}
                <LineShadowText className="italic" shadowColor="black">
                  Note
                </LineShadowText>
              </CardTitle>
              <CardDescription>Write your note and save it</CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newNote.title}
                      onChange={(e) =>
                        setNewNote({ ...newNote, title: e.target.value })
                      }
                      placeholder="Title of your note"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="category">Type</Label>
                    <Select
                      defaultValue={categories.map(
                        (category) => category._id === newNote.category
                      )}
                      onValueChange={(value) =>
                        setNewNote({ ...newNote, category: value })
                      }
                      value={newNote.category}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {categories?.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={newNote.content}
                      onChange={(e) =>
                        setNewNote({ ...newNote, content: e.target.value })
                      }
                      placeholder="Type your note here."
                      className="h-60"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="destructive" onClick={controlNoteModal}>
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={() => formRef.current?.requestSubmit()}
              >
                Create
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default NewNote;
