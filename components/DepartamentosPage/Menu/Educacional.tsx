"use client";

import Grow from "@mui/material/Grow";
import { useState } from "react";

export default function Educacional() {
  const [open, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <div
        className={`${
            open ? "text-gray-300" : "text-white"
          } hover:cursor-pointer select-none py-1`}
          onClick={() => setIsOpen(!open)}
      >
        Departamento Educacional
      </div>
      {open && (
        <Grow in={open}>
          <div className={`select-none transition-all`}>
            <div className="pl-2 hover:cursor-pointer hover:text-gray-300 ease-in-out">Guias</div>
            <div className="pl-2 hover:cursor-pointer hover:text-gray-300 ease-in-out">Instrutores</div>
          </div>
        </Grow>
      )}
    </>
  );
}
