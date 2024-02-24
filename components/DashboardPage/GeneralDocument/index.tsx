"use client";

import "./quill.core.css";

import parse from "html-react-parser";

export default function GeneralDocument({
  doc,
}: {
  doc: {
    id: number;
    title: string;
    description: string;
    content: string;
    authorId: string;
    createdAt: Date;
  };
}) {
  return (
    <>
      {/* INICIO ESTATUTO */}
      <div className="w-full bg-zinc-900 overflow-y-auto max-h-[var(--navbar-height)] p-5 container-estatuto">
        {doc && parse(doc.content)}
      </div>
      {/* FIM ESTATUTO */}
    </>
  );
}
