"use client";
import { Dispatch, SetStateAction, useState } from "react";
import ReactQuill from "react-quill";
import "./quill.snow.css";

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
    <ReactQuill
      className="text-black z-0 rounded"
      modules={modulos}
      theme="snow"
      value={value}
      onChange={setValue}
    />
  );
}
