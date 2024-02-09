"use client";

import { UserDataFiltred } from "@/Types/UserType";
import { createContext, useContext } from "react";

const UserContext = createContext<UserDataFiltred | undefined>(undefined);

export function useUserContext() {
  return useContext(UserContext);
}

export default function UserProvider({
  children,
  userInfo,
}: {
  children: React.ReactNode;
  userInfo: UserDataFiltred | undefined;
}) {
  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
}
