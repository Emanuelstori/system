"use client";

import "./quill.core.css";

import parse from "html-react-parser";

export default function Post({
  post,
}: {
  post: {
    id: number;
    image: string;
    title: string;
    description: string;
    content: string;
    likes: number;
    dislikes: number;
    authorId: string;
    createdAt: Date;
  } | null;
}) {
  return (
    <>
      {/* INICIO ESTATUTO */}
      <div className="w-full bg-zinc-900 overflow-y-auto h-[var(--navbar-height)] max-h-[var(--navbar-height)] p-5 container-estatuto">
        {post && parse(post.content)}
      </div>
      {/* FIM ESTATUTO */}
    </>
  );
}
