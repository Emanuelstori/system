"use client";

import { Button } from "@nextui-org/react";
import { FaPencilAlt } from "react-icons/fa";
import PlaySound from "@/components/PlaySound";

export default function ButtonEditProfile() {
  return (
    <Button
      onMouseEnter={PlaySound}
      className="bg-blue-500 flex flex-wrap items-center gap-1 rounded px-2 py-2 w-32"
    >
      <FaPencilAlt />
      Editar Perfil
    </Button>
  );
}
