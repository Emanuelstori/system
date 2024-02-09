"use client";
import { Tabs, Tab } from "@nextui-org/react";
import { format } from "date-fns";
const { ptBR } = require("date-fns/locale");

export default function UserInfo({
  userData,
  online,
}: {
  userData: any;
  online: boolean;
}) {
  return (
    <div className="flex w-full flex-col items-center border-b-1 border-black px-4">
      <Tabs aria-label="Options" variant="light">
        <Tab key="info" title="Informações" className="w-full">
          <div className="font-normal flex flex-col gap-y-2 w-full pl-4 ">
            <p>
              <strong>Nick:</strong> {userData.nick}
            </p>
            <p>
              <strong>Patente/Cargo:</strong> {userData.Profile.role.role}
            </p>
            <p>
              <strong>Dias no posto:</strong> Não{" "}
            </p>
            <p>
              <strong>Estado:</strong>{" "}
              <span
                className={`${
                  userData.active ? "bg-green-600" : "bg-red-500"
                } rounded-sm px-1 text-white`}
              >
                {userData.active ? "Ativo" : "Inativo"}
              </span>
            </p>
            <p>
              <strong>No Habbo:</strong>{" "}
              <span
                className={`${
                  online ? "bg-green-600" : "bg-red-500"
                } rounded-sm px-1 text-white`}
              >
                {online ? "Online" : "Offline"}
              </span>
            </p>
            <p>
              <strong>TAG:</strong> {userData.Profile.tag}
            </p>
          </div>
        </Tab>
        <Tab key="stats" title="Estatísticas" className="w-full">
          <div className="font-normal flex flex-col gap-y-2 w-full pl-4">
            <p>
              <strong>Data de inscrição:</strong>{" "}
              {format(userData.createdAt, "dd MMM yyyy", { locale: ptBR })}{" "}
            </p>
            <p>
              <strong>Salário:</strong> {userData.Profile.salary}c{" "}
            </p>
            <p>
              <strong>Licença:</strong> Não{" "}
            </p>
            <p>
              <strong>Advertência(s):</strong> 0
            </p>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
