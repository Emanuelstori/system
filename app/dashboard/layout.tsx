"use client";

import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import { UserDataFiltred, UserResponse } from "@/Types/UserType";
import NavBar from "@/components/DashboardPage/NavBar";
import UserProvider from "@/providers/UserProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { push } = useRouter();
  const [userInfo, setUserInfo] = useState<UserDataFiltred | undefined>();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { user, error } = await getUserData();

      if (error) {
        push("/");
        return;
      }
      if (user) {
        setUserInfo(user.payload.data);
      }
      // if the error did not happen, if everything is alright
      setIsSuccess(true);
    })();
  }, [push]);

  if (!isSuccess) {
    return (
      <main className="w-screen h-screen flex items-center justify-center">
        <Spinner color="secondary" />
      </main>
    );
  }
  //onContextMenu={(e) => e.preventDefault()}
  return (
    <main className="max-w-screen">
      <UserProvider userInfo={userInfo}>
        <NavBar
          userInfo={userInfo}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <div className="flex w-full max-w-screen overflow-hidden">
          {children}
        </div>
      </UserProvider>
    </main>
  );
}

async function getUserData(): Promise<UserResponse> {
  try {
    const { data } = await axios.get("/api/auth/me");
    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      user: null,
      error,
    };
  }
}
