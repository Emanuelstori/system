"use client";
import { Dispatch, SetStateAction, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor({
  value,
  setValue,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
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
    <div className="overflow-y-auto min-h-60 max-h-60">
      <ReactQuill
        className="h-max bg-zinc-900"
        modules={modulos}
        theme="snow"
        value={value}
        onChange={setValue}
      />
    </div>
  );
}
