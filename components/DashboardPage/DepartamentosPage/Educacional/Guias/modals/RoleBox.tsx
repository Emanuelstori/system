"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { Key, useState } from "react";

export default function RoleBox({
  roles,
}: {
  roles: {
    id: number;
    role: string;
    companyId: number;
    createdAt: Date;
  }[];
}) {
  if (roles) {
    return (
      <div className="w-96">
        <Select
          label="Cargo"
          placeholder="Selecione o cargo.."
          className="max-w-lg"
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
