"use server";
import UserList from "@/components/UserList";
import React from "react";

export default async function ListagemPage({
  searchParams,
}: {
  searchParams?: { page: string | undefined; open: string | undefined };
}) {
  var pageNumber: number = 1;
  var showModal: boolean = false;
  if (searchParams?.page) {
    pageNumber = parseInt(searchParams.page);
  }
  if (searchParams?.open) {
    if (searchParams?.open == "true") {
      showModal = true;
    }
  }
  return (
    <div className="flex flex-wrap w-full items-center max-w-screen justify-center">
      <UserList page={pageNumber} showModal={showModal} />
    </div>
  );
}
