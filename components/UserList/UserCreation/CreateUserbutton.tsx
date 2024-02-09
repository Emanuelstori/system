"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FaUserPlus } from "react-icons/fa6";

export default function CreateUserbutton() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  return (
    <Link
      className="flex flex-col w-fit items-center p-2"
      href={pathname + '?' + createQueryString('open', 'true')}
    >
      <FaUserPlus size={35} />
      <p className="text-center text-xs w-full">
        Adicionar <br />
        Usuário
      </p>
    </Link>
  );
}
