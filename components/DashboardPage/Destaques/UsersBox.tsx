"use client";

import React from "react";
import { Select, SelectItem, Selection } from "@nextui-org/react";

type User = {
  nick: string;
  Profile: {
    points: number;
  } | null;
};

export default function UsersBox({
  userList,
  values,
  setValues,
}: {
  userList: User[];
  values: Selection;
  setValues: React.Dispatch<React.SetStateAction<Selection>>;
}) {
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (Array.from(e.target.value.split(",")).length <= 3) {
      setValues(new Set(e.target.value.split(",")));
    }
  };

  if (userList) {
    return (
      <div className="w-96">
        <Select
          label="Selecionar usuários"
          placeholder="Selecione os usuários.."
          selectionMode="multiple"
          selectedKeys={values}
          onChange={handleSelectionChange}
        >
          {userList.map((userList, index) => (
            <SelectItem id="users" key={userList.nick} value={userList.nick}>
              {userList.nick}
            </SelectItem>
          ))}
        </Select>
      </div>
    );
  } else {
    return <></>;
  }
}
