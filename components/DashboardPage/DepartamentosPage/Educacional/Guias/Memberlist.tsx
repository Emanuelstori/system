"use client";

import { User } from "@prisma/client";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLeftLong, FaPlus, FaRightLong } from "react-icons/fa6";
import ModalAddMember from "./modals/ModalAddMember";
import { Button } from "@nextui-org/react";
import PlaySound from "@/components/PlaySound";

export default function Memberlist({
  userList,
  roles,
  members,
}: {
  userList: { nick: string }[];
  roles: {
    id: number;
    role: string;
    companyId: number;
    createdAt: Date;
  }[];
  members: { profiles: Profile[] }[];
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { push } = useRouter();
  const itemsPerPage = 6;
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  const visibleNicks = members
    .flatMap((member) => member.profiles.map((profile) => profile.user.nick))
    .slice(startIndex, endIndex);

  const totalPages = Math.ceil(
    members.flatMap((member) =>
      member.profiles.map((profile) => profile.user.nick)
    ).length / itemsPerPage
  );

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

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
    <div className="flex flex-col w-full bg-blue-500 h-56 p-2 rounded bg-opacity-50">
      <div className="flex w-full justify-between">
        <p>Membros:</p>
        <ModalAddMember roles={roles} userList={userList} />
      </div>
      <ul>
        {visibleNicks.map((nick) => (
          <li key={nick}>{nick}</li>
        ))}
      </ul>
      <div className="flex h-full justify-center items-end">
        <Button
          onMouseEnter={PlaySound}
          radius="none"
          variant="ghost"
          className="flex !border-none hover:!bg-transparent gap-1 items-center transition-all duration-250"
          onClick={handlePreviousPage}
        >
          <FaLeftLong className="group-hover:fill-violet-400 transition-all duration-250" />
        </Button>
        <Button
          onMouseEnter={PlaySound}
          radius="none"
          variant="ghost"
          className="flex !border-none hover:!bg-transparent gap-1 items-center transition-all duration-250"
          onClick={handleNextPage}
        >
          <FaRightLong className="group-hover:fill-violet-400 transition-all duration-250" />
        </Button>
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

interface Profile {
  user: { nick: string };
  role: { role: string; roleLevel: number };
}
