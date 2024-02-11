"use client";
import { Dispatch, SetStateAction, useState } from "react";
import ReactQuill from "react-quill";
import "./quill.buble.css";

export default function TextEditor({
  value,
  setValue,
}: {
  value: string | undefined;
  setValue: Dispatch<SetStateAction<string | undefined>>;
}) {
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["link", "image"],

    [{ list: "ordered" }, { list: "bullet" }],

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];
  const modulos = {
    toolbar: toolbarOptions,
  };
  return (
    <div className="overflow-y-auto max-h-[50rem]">
      <ReactQuill
        className="bg-zinc-950 h-96 z-0 rounded"
        modules={modulos}
        theme="bubble"
        value={value}
        onChange={setValue}
      />
    </div>
  );
}
