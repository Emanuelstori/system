"use client";

import React, { Dispatch, ReactNode, SetStateAction } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Selection,
  Select,
  SelectItem,
  Checkbox,
  Textarea,
} from "@nextui-org/react";
import { Role } from "@prisma/client";
import axios from "axios";
import { useUserContext } from "@/providers/UserProvider";
export default function ModalAulas({
  classes,
  setContent,
  makeOpenClass,
  patentes,
  allUsers,
}: {
  allUsers: {
    id: string;
    nick: string;
  }[];
  classes: {
    id: number;
    title: string;
    description: string;
    content: string;
    aplicatorRoleId: number;
    createdAt: Date;
    authorId: string;
  }[];
  setContent: Dispatch<SetStateAction<string | undefined | ReactNode>>;
  makeOpenClass: () => void;
  patentes: Role[];
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [valueRole, setValueRole] = React.useState<Selection>(new Set([]));
  return (
    <>
      <Button onClick={onOpen} className="text-white" color="success">
        Aplicar aula
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Aplicar aula:
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full justify-around">
                  {classes.map((value, index) => (
                    <button
                      onClick={(e) => {
                        setContent(
                          AulaMount({
                            content: value,
                            patentes: patentes,
                            allUsers: allUsers,
                          })
                        );
                        makeOpenClass();
                      }}
                      key={index}
                    >
                      {value.title}
                    </button>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function AulaMount({
  content,
  patentes,
  allUsers,
}: {
  allUsers: {
    id: string;
    nick: string;
  }[];
  content: {
    id: number;
    title: string;
    description: string;
    content: string;
    aplicatorRoleId: number;
    createdAt: Date;
    authorId: string;
  };
  patentes: Role[];
}): ReactNode {
  const handleSubmit = async (formData: FormData) => {
    var aprovado: boolean = false;
    if (formData.get("approved") != null) {
      aprovado = true;
    }
    var rawFormData = {
      USERID: formData.get("user"),
      TAG: formData.get("tag"),
      approved: aprovado,
      description: formData.get("description"),
    };
    if (!rawFormData) {
      return;
    }
    try {
      //content.title
      if (aprovado) {
        const relatoryFormData = {
          title: `Aprovado ${content.title}: ${content.description}`,
          relatoryType: "CLASS_APPLICATION",
          targetProfileIds: [rawFormData.USERID],
          description: formData.get("description"),
        };
        const relatory = await axios.post(
          `/api/relatories/activerelatory`,
          relatoryFormData
        );
        const relatoryClassFormData = {
          title: `Aprovado ${content.title}: ${content.description}`,
          targetProfileIds: [rawFormData.USERID],
          description: formData.get("description"),
          deptRole: "Treinador",
          accepted: true,
        };
        const relatoryClass = await axios.post(
          `/api/relatories/classrelatory`,
          relatoryClassFormData
        );
      } else {
        const relatoryFormData = {
          title: `Reprovado ${content.title}: ${content.description}`,
          relatoryType: "CLASS_APPLICATION",
          targetProfileIds: [rawFormData.USERID],
          description: formData.get("description"),
        };
        const relatory = await axios.post(`/api/relatories`, relatoryFormData);
        const relatoryClassFormData = {
          title: `Aprovado ${content.title}: ${content.description}`,
          targetProfileIds: [rawFormData.USERID],
          description: formData.get("description"),
          deptRole: "Treinador",
        };
        const relatoryClass = await axios.post(
          `/api/relatories/classrelatory`,
          relatoryClassFormData
        );
      }
    } catch (err) {
      console.log(err);
      console.log("Erro");
    }
  };
  return (
    <>
      <form
        action={handleSubmit}
        className="flex flex-col gap-4 w-full h-full items-center justify-center"
      >
        <Select
          id="user"
          name="user"
          label="Selecione o usuário..."
          isRequired
          className="max-w-xs"
        >
          {allUsers.map((user, index) => (
            <SelectItem key={user.id} value={user.id}>
              {user.nick}
            </SelectItem>
          ))}
        </Select>
        <Input
          isRequired
          type="text"
          label="Tag"
          name="tag"
          id="tag"
          placeholder="Insira sua TAG."
          className="max-w-xs"
        />
        <Textarea
          isRequired
          label="Observações"
          placeholder="Observações.."
          name="description"
          id="description"
          className="max-w-xs"
        />
        <Checkbox
          defaultSelected
          className="max-w-xs text-white"
          name="approved"
          color="success"
          id="approved"
        >
          Aprovado
        </Checkbox>
        <Button type="submit" className="text-white" color="success">
          Aplicar {content.title}
        </Button>
      </form>
    </>
  );
}
