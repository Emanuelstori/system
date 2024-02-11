"use server";
import UserList from "@/components/UserList";
import React from "react";

export default async function ListagemPage({
  searchParams,
}: {
  searchParams?: { open: string | undefined };
}) {
  var showModal: boolean = false;
  if (searchParams?.open) {
    if (searchParams?.open == "true") {
      showModal = true;
    }
  }
  return (
    <div className="flex flex-wrap w-full items-center max-w-screen justify-center">
      <UserList showModal={showModal} />
    </div>
  );
}
