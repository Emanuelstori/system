"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { Key, useState } from "react";
import { Selection } from "@nextui-org/react";

export default function RoleBox({
  roles,
  value,
  setValue,
}: {
  roles: {
    id: number;
    role: string;
    companyId: number;
    createdAt: Date;
  }[];
  value: Selection;
  setValue: React.Dispatch<React.SetStateAction<Selection>>;
}) {
  if (roles) {
    return (
      <div>
        <Select
          isRequired
          label="Cargo"
          placeholder="Selecione o cargo.."
          selectedKeys={value}
          onSelectionChange={setValue}
        >
          {roles?.map((item, index) => (
            <SelectItem key={item.role}>{item.role}</SelectItem>
          ))}
        </Select>
      </div>
    );
  } else {
    return <></>;
  }
}
