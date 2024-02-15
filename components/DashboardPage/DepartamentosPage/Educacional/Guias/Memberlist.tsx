"use client";

import { User } from "@prisma/client";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import ModalAddMember from "./modals/ModalAddMember";

export default function Memberlist({
  userList,
  roles,
}: {
  userList: { nick: string }[];
  roles: {
    id: number;
    role: string;
    companyId: number;
    createdAt: Date;
  }[];
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { push } = useRouter();
  //useEffect(() => {
  //  (async () => {
  //    const { user, error } = await getMemberList();
  //
  //    if (error) {
  //      push("/");
  //      return;
  //    }
  //    if (user) {
  //      setUserInfo(user.payload.data);
  //    }
  //    // if the error did not happen, if everything is alright
  //    setIsSuccess(true);
  //  })();
  //}, [push]);
  return (
    <div className="flex flex-col w-full bg-blue-500 h-48 p-2 rounded bg-opacity-50">
      <div className="flex w-full justify-between">
        <p>Membros:</p>
        <ModalAddMember roles={roles} userList={userList} />
      </div>
    </div>
  );
}

//async function getMemberList(): Promise<User | null> {
//    try {
//      const { data } = await axios.get("/api/auth/me");
//      return {
//        user: data,
//        error: null,
//      };
//    } catch (e) {
//      const error = e as AxiosError;
//
//      return {
//        user: null,
//        error,
//      };
//    }
//  }
