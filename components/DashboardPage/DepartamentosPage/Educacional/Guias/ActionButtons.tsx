"use client";

import { Button } from "@nextui-org/react";
import ModalScripts from "./modals/ModalScripts";
import ModalAulas from "./modals/ModalAulas";
import axios from "axios";
export default function ActionButtons() {
  const handleClick = async () => {
    const data = await axios.post("/api/company/member/addmember", {
      name: "DpE",
      usernick: "DEPOSIT0",
      role: "Guia",
    });
    console.log(data);
  };
  return (
    <>
      <div className="flex flex-col w-full gap-2 bg-cyan-500 bg-opacity-50 h-28 rounded p-2 justify-between">
        <ModalScripts />
        <ModalAulas />
        <button onClick={handleClick}>Teste</button>
      </div>
    </>
  );
}
