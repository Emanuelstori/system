"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import UsersBox from "./UsersBox";
import { useState } from "react";
import { Selection } from "@nextui-org/react";
import { FaPencil } from "react-icons/fa6";
import axios from "axios";
import { useRouter } from "next/navigation";

type User = {
  nick: string;
  Profile: {
    points: number;
  } | null;
};

export default function ModalAddDestaques({ userList }: { userList: User[] }) {
  if (!userList) return;
  const { onClose, isOpen, onOpen, onOpenChange } = useDisclosure();
  const [values, setValues] = useState<Selection>(new Set([]));

  const router = useRouter();
  const onSubmit = async (formData: FormData) => {
    const nonEmptyValues = Array.from(values).filter((value) => value !== "");
    if (
      !nonEmptyValues ||
      nonEmptyValues.length === 0 ||
      nonEmptyValues.length > 2
    ) {
      return;
    }
    if (nonEmptyValues.length === 2) {
      const data1 = await axios.post("/api/globalData/addawarded", {
        nickname: nonEmptyValues[0],
      });
      const data2 = await axios.post("/api/globalData/addawarded", {
        nickname: nonEmptyValues[1],
      });
      router.refresh();
    }
    if (nonEmptyValues.length === 1) {
      const data = await axios.post("/api/globalData/addawarded", {
        nickname: nonEmptyValues[0],
      });
      router.refresh();
    }
    return;
  };
  return (
    <>
      <Button onPress={onOpen} isIconOnly color="primary">
        <FaPencil />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <form action={onSubmit}>
                <ModalHeader className="flex flex-col gap-1">
                  Adicionar Membro:
                </ModalHeader>
                <ModalBody>
                  <UsersBox
                    values={values}
                    setValues={setValues}
                    userList={userList}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    className="text-white"
                    color="success"
                    type="submit"
                    onPress={onClose}
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
