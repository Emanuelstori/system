"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Key, useState } from "react";

type User = {
  nick: string;
};

export default function UsersBox({ users }: { users: User[] | null }) {
  const [value, setValue] = useState<Key>("");

  if (users) {
    return (
      <div className="w-96">
        <Select
          label="Selecionar usuários"
          placeholder="Selecione os usuários.."
          selectionMode="multiple"
        >
          {users.map((user, index) => (
            <SelectItem key={user.nick} value={user.nick}>
              {user.nick}
            </SelectItem>
          ))}
        </Select>
      </div>
    );
  } else {
    return <></>;
  }
}
