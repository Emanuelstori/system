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
}: {
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
}: {
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
    const rawFormData = {
      username: formData.get("username"),
      TAG: formData.get("tag"),
      approved: aprovado,
      description: formData.get("description"),
    };
    if (!rawFormData) {
      return;
    }
    try {
      const createdUser = await axios.post(`/api/auth/newAgente`, rawFormData);
      if (aprovado) {
        const relatoryClassFormData = {
          title: `Aprovado CFA: Curso de Formação de Agentes`,
          targetProfileIds: [createdUser.data.id],
          description: formData.get("description"),
          deptRole: "Guia",
          accepted: true,
        };
        const relatoryClass = await axios.post(
          `/api/relatories/classrelatory`,
          relatoryClassFormData
        );
      } else {
        const relatoryClassFormData = {
          title: `Reprovado CFA: Curso de Formação de Agentes`,
          targetProfileIds: [createdUser.data.id],
          description: formData.get("description"),
          deptRole: "Guia",
          accepted: false,
        };
        const relatoryClass = await axios.post(
          `/api/relatories/classrelatory`,
          relatoryClassFormData
        );
      }

      if (!createdUser) {
        return false;
      }
    } catch (err) {
      console.log(err);
      console.log("Erro");
    }
  };
  const handleSubmitAPC = async (formData: FormData) => {
    var aprovado: boolean = false;
    if (formData.get("approved") != null) {
      aprovado = true;
    }
    const rawFormData = {
      username: formData.get("username"),
      TAG: formData.get("tag"),
      patente: formData.get("patente"),
      description: formData.get("description"),
    };
    try {
      if (!rawFormData) {
        return;
      }
      const createdUser = await axios.post(`/api/auth/newUser`, rawFormData);
      if (!createdUser) {
        return false;
      }
      const relatoryFormData = {
        title: `${createdUser.data.nick} ainda não se cadastrou :(`,
        relatoryType: "USER_ACCESS",
        targetProfileIds: [createdUser.data.id],
        description: "Ainda não se cadastrou em nosso system.",
      };
      const relatory = await axios.post(`/api/relatories`, relatoryFormData);
      if (aprovado) {
        const relatoryFormData = {
          title: `Aprovado APC: Aula Pós Contrato`,
          relatoryType: "CLASS_APPLICATION",
          targetProfileIds: [createdUser.data.id],
          description: formData.get("description"),
        };
        const relatory = await axios.post(
          `/api/relatories/activerelatory`,
          relatoryFormData
        );
        const relatoryClassFormData = {
          title: `Aprovado APC: Aula Pós Contrato`,
          targetProfileIds: [createdUser.data.id],
          description: formData.get("description"),
          deptRole: "Guia",
          accepted: true,
        };
        const relatoryClass = await axios.post(
          `/api/relatories/classrelatory`,
          relatoryClassFormData
        );
      } else {
        const relatoryFormData = {
          title: `Reprovado APC: Aula Pós Contrato`,
          relatoryType: "CLASS_APPLICATION",
          targetProfileIds: [createdUser.data.id],
          description: formData.get("description"),
        };
        const relatory = await axios.post(`/api/relatories`, relatoryFormData);
        const relatoryClassFormData = {
          title: `Aprovado APC: Aula Pós Contrato`,
          targetProfileIds: [createdUser.data.id],
          description: formData.get("description"),
          deptRole: "Guia",
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
      {content.title === "APC" ? (
        <form
          action={handleSubmitAPC}
          className="flex flex-col gap-4 w-full h-full items-center justify-center"
        >
          <Input
            isRequired
            type="text"
            label="Nick"
            name="username"
            id="username"
            placeholder="Insira o nick do usuário."
            className="max-w-xs"
          />
          <Input
            isRequired
            type="text"
            label="Tag"
            name="tag"
            id="tag"
            placeholder="Insira sua TAG."
            className="max-w-xs"
          />
          <Select
            id="patente"
            name="patente"
            label="Selecione a patente..."
            isRequired
            className="max-w-xs"
          >
            {patentes.map((patente) => (
              <SelectItem key={patente.roleLevel} value={patente.role}>
                {patente.role}
              </SelectItem>
            ))}
          </Select>
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
      ) : (
        <form
          action={handleSubmit}
          className="flex flex-col gap-4 w-full h-full items-center justify-center"
        >
          <Input
            isRequired
            type="text"
            label="Username"
            id="username"
            name="username"
            placeholder="Insira o nick do usuário."
            className="max-w-xs"
          />
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
      )}
    </>
  );
}
