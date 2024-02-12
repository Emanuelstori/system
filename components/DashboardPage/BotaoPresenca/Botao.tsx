"use client";

import { Button } from "@nextui-org/react";
import { IoGift } from "react-icons/io5";

export default function Botao({ disabled }: { disabled: boolean }) {
    return (
        <Button disabled={disabled} className="w-96 text-white" type="submit" color={!disabled ? "success" : "danger"}>
            <IoGift size={24} />
            {!disabled ? "Resgatar Presença!" : "Presença já resgatada!"}
        </Button>
    )
}