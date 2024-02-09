"use client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { IoLogIn } from "react-icons/io5";
import { MDBBtn } from "mdb-react-ui-kit";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Input } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Snippet,
} from "@nextui-org/react";

export default function Home() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [valueNick, setValueNick] = useState("");
  const [valuePass, setValuePass] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { push } = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = toast.loading("Autenticando...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
    });

    const payload = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    };
    try {
      await axios.post("/api/auth/login", payload);
      // redirect the user to /dashboard
      toast.update(id, {
        render: "Autenticado com sucesso!",
        type: "success",
        isLoading: false,
        theme: "dark",
        autoClose: 5000,
        closeButton: true,
      });
      setTimeout(() => {
        push("/dashboard");
      }, 500);
    } catch (e) {
      const error = e as AxiosError;
      toast.update(id, {
        render: "Algo deu errado!",
        type: "error",
        isLoading: false,
        theme: "dark",
        autoClose: 5000,
        closeButton: true,
      });
    }
  };

  const handleRegister = async () => {
    const id = toast.loading("Registrando...", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "dark",
    });
    if (!valueNick || !valuePass) return;
    const payload = {
      username: valueNick,
      password: valuePass,
    };
    try {
      await axios.post("/api/auth/register", payload);
      toast.update(id, {
        render: "Registrado com sucesso!",
        type: "success",
        isLoading: false,
        theme: "dark",
        autoClose: 5000,
        closeButton: true,
      });
    } catch (e) {
      const error = e as AxiosError;
      toast.update(id, {
        render: "Algo deu errado!",
        type: "error",
        isLoading: false,
        theme: "dark",
        autoClose: 5000,
        closeButton: true,
      });
    }
  };

  const openModal = () => {
    if (!valueNick || !valuePass) {
      toast.error("Preencha os campos antes de continuar.", {
        type: "error",
        isLoading: false,
        theme: "dark",
        autoClose: 5000,
        closeButton: true,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return;
    }
    onOpen();
  };

  return (
    <main className="flex w-screen h-screen items-center justify-center">
      <ToastContainer autoClose={5000} />
      <form
        onSubmit={handleSubmit}
        className="flex gap-4 flex-col w-fit pt-4 pb-8 px-4 items-center justify-center rounded-lg h-fit bg-slate-900 shadow-cyan-500/50 shadow-xl hover:scale-105 transition-all duration-200"
      >
        <IoLogIn size={35} />
        <ul className="flex gap-2 flex-col">
          <li className="flex flex-col gap-1">
            <Input
              isRequired
              type="text"
              id="username"
              name="username"
              required
              variant="bordered"
              placeholder="Digite seu nick"
              label="Nick"
              onChange={(e) => {
                setValueNick(e.currentTarget.value);
              }}
            />
          </li>
          <li className="flex flex-col gap-1">
            <div className="flex flex-col gap-2">
              <Input
                isRequired
                label="Password"
                variant="bordered"
                id="password"
                name="password"
                required
                placeholder="Digite sua senha"
                onChange={(e) => {
                  setValuePass(e.currentTarget.value);
                }}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <BsEyeSlashFill className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                className="w-80"
              />
              <div className="w-full flex items-start justify-end hover:cursor-default">
                <a
                  href=""
                  className="w-fit flex items-start justify-end hover:cursor-default"
                >
                  <MDBBtn
                    className="py-1 hover:cursor-pointer"
                    color="tertiary"
                    type="button"
                  >
                    Redefinir minha senha
                  </MDBBtn>
                </a>
              </div>
            </div>
          </li>
        </ul>
        <div className="flex gap-2 items-center w-full justify-between px-4">
          <MDBBtn
            className="hover:scale-105 transition-all duration-250 bg-blue-500"
            color="primary"
            size="lg"
            type="button"
            onClick={openModal}
          >
            Ativar conta
          </MDBBtn>
          <MDBBtn
            className="hover:scale-105 transition-all duration-250"
            size="lg"
            color="success"
          >
            Logar
          </MDBBtn>
        </div>
      </form>
      <div>
        <Modal isOpen={isOpen} placement={"auto"} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Registro
                </ModalHeader>
                <ModalBody>
                  <p>Altere sua missão para:</p>
                  <Snippet>
                    {`system` + process.env.NEXT_PUBLIC_POLICE_NAME}
                  </Snippet>
                  <p>Após alterar clique em Confirmar.</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" type="button" onPress={onClose}>
                    Fechar
                  </Button>
                  <Button
                    color="primary"
                    onPress={onClose}
                    onClick={handleRegister}
                    type="button"
                  >
                    Confirmar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </main>
  );
}
