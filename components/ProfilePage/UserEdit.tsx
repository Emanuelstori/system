"use client";

import { minLevelEditUser } from "@/constants";
import { useUserContext } from "@/providers/UserProvider";
import { FaPencilAlt } from "react-icons/fa";

export default function UserEdit() {
  const currentUser = useUserContext();

  return (
    <div className="h-full flex items-center p-1 hover:cursor-pointer flex-grow">
      {currentUser!.roleLevel >= minLevelEditUser && <FaPencilAlt />}
    </div>
  );
}
