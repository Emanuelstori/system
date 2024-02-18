"use client";
import { Tabs, Tab, Button } from "@nextui-org/react";
import { $Enums } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
const { ptBR } = require("date-fns/locale");

export default function UserInfo({
  userData,
  online,
  userCanRegister,
}: {
  userData: any;
  online: boolean;
  userCanRegister: {
    id: number;
    title: string;
    relatoryType: $Enums.RelatoryType;
    accepted: boolean;
    description: string | null;
    createdAt: Date;
    acceptedAt: Date | null;
    profileId: string;
  } | null;
}) {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: {
      nickname: string;
    } = {
      nickname: userData.nick,
    };

    if (!payload.nickname || payload.nickname === "") {
      toast.error("Parâmetros esperados.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
      });
      return;
    }

    const id = toast.loading("Liberando registro de usuário...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
    });

    try {
      await axios.post("/api/relatories/activeuser", payload);
      toast.update(id, {
        render: "Liberado com sucesso!",
        type: "success",
        isLoading: false,
        theme: "dark",
        autoClose: 5000,
        closeButton: true,
      });
      router.refresh();
    } catch (e) {
      toast.update(id, {
        render: "Algo deu errado!",
        type: "error",
        isLoading: false,
        theme: "dark",
        autoClose: 5000,
        closeButton: true,
      });
      console.log(e);
    }
  };

  return (
    <>
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
              <p className="flex gap-2 items-center">
                <strong>Estado:</strong>
                <span
                  className={`${userData.active && "bg-green-600"} ${
                    !userData.active &&
                    userCanRegister &&
                    !userCanRegister.accepted &&
                    "bg-red-500"
                  }
                ${
                  !userData.active &&
                  userCanRegister &&
                  userCanRegister.accepted &&
                  "bg-yellow-500"
                }
                 rounded-sm px-1 text-white`}
                >
                  {!userData.active &&
                    userCanRegister &&
                    !userCanRegister.accepted &&
                    "Inativo"}
                  {userData.active && "Ativo"}
                  {!userData.active &&
                    userCanRegister &&
                    userCanRegister.accepted &&
                    "Aguardando registro..."}
                </span>
                {!userData.active &&
                  userCanRegister &&
                  !userCanRegister.accepted && (
                    <form
                      onSubmit={handleSubmit}
                      className="flex w-full items-center justify-end"
                    >
                      <Button
                        type="submit"
                        size="sm"
                        color="success"
                        className="text-white"
                      >
                        Ativar
                      </Button>
                    </form>
                  )}
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
      <ToastContainer className="absolute" autoClose={5000} />
    </>
  );
}
