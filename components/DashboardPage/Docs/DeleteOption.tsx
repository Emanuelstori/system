"use client";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { FaX } from "react-icons/fa6";

export default function DeleteOption() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      placement="bottom"
      showArrow
      backdrop="blur"
    >
      <PopoverTrigger>
        <Button isIconOnly color="danger" aria-label="Delete">
          <FaX />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 flex flex-col gap-2">
          <div className="text-small font-bold">Tem certeza?</div>
          <div className="flex w-full gap-2 items-center">
            <Button className="text-white font-semibold" color="success">
              Sim
            </Button>
            <Button
              onPress={() => setIsOpen(false)}
              className="text-white font-semibold"
              color="danger"
            >
              Não
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
