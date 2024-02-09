"use client";

import { Input, Select, SelectItem } from "@nextui-org/react";
import { Role } from "@prisma/client";
import { MDBBtn } from "mdb-react-ui-kit";

export default function UserCreation({ patentes }: { patentes: Role[] }) {
  return (
    <>
      <Input
        isRequired
        type="text"
        id="username"
        name="username"
        required
        variant="bordered"
        placeholder="Digite o nick do usuário..."
        label="Nick"
      />
      <Input
        isRequired
        type="text"
        id="tag"
        name="tag"
        required
        variant="bordered"
        placeholder="Digite sua tag..."
        label="Tag"
      />
      <Select
        id="patente"
        name="patente"
        label="Selecione a patente..."
        variant="bordered"
        isRequired
      >
        {patentes.map((patente) => (
          <SelectItem key={patente.roleLevel} value={patente.role}>
            {patente.role}
          </SelectItem>
        ))}
      </Select>
      <MDBBtn
        className="hover:scale-105 transition-all duration-250 bg-blue-500"
        color="primary"
        type="submit"
        size="lg"
      >
        Criar
      </MDBBtn>
    </>
  );
}
