"use client";

import React from "react";
import { Select, SelectItem, Selection } from "@nextui-org/react";

type User = {
  nick: string;
};

export default function UsersBox({
  userList,
  values,
  setValues,
}: {
  userList: User[] | null;
  values: Selection;
  setValues: React.Dispatch<React.SetStateAction<Selection>>;
}) {
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValues(new Set(e.target.value.split(",")));
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
