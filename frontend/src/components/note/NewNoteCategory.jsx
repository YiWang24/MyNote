"use client";
import React, { useEffect, useState } from "react";
import { useNoteContext } from "@/lib/noteContext";
import { Particles } from "@/components/ui/particles";
import { LineShadowText } from "@/components/ui/line-shadow-text";
import { Button } from "@/components/ui/button";
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
const NewNoteCategory = () => {
  const {
    categories,
    isCategoryModalOpen,
    controlCategoryModal,
    deleteCategories,
    createCategory,
  } = useNoteContext();

  const [newCategory, setNewCategory] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  const handleDelete = async () => {
    await deleteCategories(selectedCategories);
    setSelectedCategories([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newCategory.trim() === "") return;

    createCategory(newCategory);
    setNewCategory("");
  };
  useEffect(() => {
    if (isCategoryModalOpen) {
      setSelectedCategories([]);
    }
  }, [isCategoryModalOpen]);
  return (
    <>
      {isCategoryModalOpen && (
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
                Categories{" "}
                <LineShadowText className="italic" shadowColor="black">
                  Management
                </LineShadowText>
              </CardTitle>
              <CardDescription>Add or Delete your categories</CardDescription>
            </CardHeader>
            <CardContent>
              {/* current categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Current Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories?.map((category) => (
                    <span
                      key={category._id}
                      onClick={() => handleCategoryClick(category._id)}
                      className={`px-3 py-1 rounded-full  cursor-pointer
                      ${
                        selectedCategories.includes(category._id)
                          ? "whitespace-nowrap rounded-full bg-pink-100  text-sm text-pink-500"
                          : "whitespace-nowrap rounded-full border border-purple-500  text-sm text-purple-700"
                      }`}
                    >
                      {category.type}
                    </span>
                  ))}
                </div>
              </div>
              {/* add new category */}
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col  space-y-1.5">
                  <Label htmlFor="name">Category</Label>
                  <div className="flex w-full items-center justify-around  gap-2">
                    <Input
                      id="name"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="New category"
                      className="flex-1"
                    />
                    <Button>+</Button>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={controlCategoryModal}>
                Cancel
              </Button>
              {selectedCategories.length > 0 && (
                <Button variant="destructive" onClick={handleDelete}>
                  Delete Selected
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default NewNoteCategory;
