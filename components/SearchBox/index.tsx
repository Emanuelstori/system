"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Key, useState } from "react";

type User = {
  nick: string;
};

export default function SearchBox({ users }: { users: User[] | null }) {
  const [value, setValue] = useState<Key>("");
  const { push } = useRouter();
  function handleChange() {
    if (value) {
      push("/dashboard/profile/" + value.toString());
    }
  }
  if (users) {
    return (
      <div className="w-96">
        <Autocomplete
          label="Usuários"
          placeholder="Busque um usuário.."
          className="max-w-lg"
          onSelectionChange={setValue}
          onInputChange={handleChange}
        >
          {users?.map((item, index) => (
            <AutocompleteItem key={item.nick}>{item.nick}</AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
    );
  } else {
    return <></>;
  }
}
