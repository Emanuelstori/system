"use client";
import { Button } from "@nextui-org/react";
import { BsEyeFill } from "react-icons/bs";
import PlaySound from "@/components/PlaySound";
import { useRouter } from "next/navigation";

export default function ButtonSeeProfile({ nickname }: { nickname: string }) {
  const router = useRouter();
  return (
    <Button
      onMouseEnter={PlaySound}
      className="bg-green-500 flex flex-wrap items-center gap-1 rounded px-2 py-2 w-32"
      onPress={() => router.push(`/dashboard/profile/${nickname}`)}
    >
      {" "}
      <BsEyeFill /> Ver Perfil
    </Button>
  );
}
