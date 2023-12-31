"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/post/addPost", { title }),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        console.log(data);
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
      <div className=" flex flex-col my-4">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          value={title}
          placeholder="What's in your mind"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
        ></textarea>
      </div>
      <div className=" flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-600" : "text-gray-800"
          }`}
        >{`${title.length}/300`}</p>
        <button
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
          disabled={isDisabled}
        >
          create post
        </button>
      </div>
    </form>
  );
}
