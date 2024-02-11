import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
  Button,
} from "@nextui-org/react";

import { IoNotifications } from "react-icons/io5";
import Image from "next/image";
import { FaPencilAlt, FaBug } from "react-icons/fa";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { FaGear } from "react-icons/fa6";
import { UserDataFiltred } from "@/Types/UserType";
import DeleteCookie from "@/utils/DeleteCookie";
import { COOKIE_NAME } from "@/constants";
import { useRouter } from "next/navigation";
import PlaySound from "../../../PlaySound";
import { useEffect, useState } from "react";

export default function UserArea({
  userInfo,
}: {
  userInfo: UserDataFiltred | undefined;
}) {
  const [userFigure, setUserFigure] = useState<string>("");
  console.log(userFigure);
  const { push } = useRouter();
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  function logOut() {
    DeleteCookie(COOKIE_NAME);
    push("/");
  }
  useEffect(() => {
    (async () => {
      const figure = await getFigure({ nick: userInfo!.username });
      setUserFigure(figure);
    })();
  }, [push]);

  return (
    <div className="flex gap-4 items-center">
      <Badge content="99+" shape="circle" color="danger">
        <Button
          onMouseEnter={PlaySound}
          radius="full"
          isIconOnly
          aria-label="more than 99 notifications"
          variant="bordered"
        >
          <IoNotifications size={24} />
        </Button>
      </Badge>
      <Dropdown>
        <DropdownTrigger>
          <div
            onMouseEnter={PlaySound}
            className="rounded-full relative w-12 h-12 border-2 p-1"
          >
            <div className="w-full h-full flex bg-white rounded-full items-center justify-center">
              <Image
                src={userFigure}
                alt="Landscape picture"
                width={50}
                height={50}
              />
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="faded">
          <DropdownItem
            key="profile"
            className="h-14 gap-2 hover:border-none hover:!border-1 hover:!bg-transparent "
          >
            <p className="font-semibold">Logado como</p>
            <p className="font-semibold">{userInfo?.username}</p>
          </DropdownItem>
          <DropdownItem
            key="settings"
            onMouseEnter={PlaySound}
            onClick={() => push(`/dashboard/profile/${userInfo?.username}`)}
            startContent={
              <GiPoliceOfficerHead
                className={`${iconClasses} group-hover:fill-yellow-300 transition-all duration-200`}
              />
            }
          >
            <p className="group-hover:text-yellow-300">Ver Perfil</p>
          </DropdownItem>
          <DropdownItem
            key="team_settings"
            onMouseEnter={PlaySound}
            startContent={
              <FaPencilAlt
                className={`${iconClasses} group-hover:fill-yellow-300 transition-all duration-200`}
              />
            }
          >
            <p className="group-hover:text-yellow-300">Editar Perfil</p>
          </DropdownItem>
          <DropdownItem
            key="configurations"
            onMouseEnter={PlaySound}
            startContent={
              <FaGear
                className={`${iconClasses} group-hover:fill-yellow-300 transition-all duration-200`}
              />
            }
          >
            <p className="group-hover:text-yellow-300">Configurações</p>
          </DropdownItem>
          <DropdownItem
            key="help_and_feedback"
            onMouseEnter={PlaySound}
            startContent={
              <FaBug
                className={`${iconClasses} group-hover:fill-yellow-300 transition-all duration-200`}
              />
            }
          >
            <p className="group-hover:text-yellow-300">Bugs & feedback</p>
          </DropdownItem>
          <DropdownItem
            key="logout"
            onMouseEnter={PlaySound}
            color="danger"
            onClick={logOut}
            startContent={
              <CiLogout
                className={`${iconClasses} group-hover:fill-danger transition-all duration-200`}
              />
            }
          >
            Desconectar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

async function getFigure({ nick }: { nick: string }) {
  const res = await fetch(
    `https://www.habbo.com.br/api/public/users?name=${nick}`
  );
  const { figureString } = await res.json();
  return `https://www.habbo.com/habbo-imaging/avatarimage?size=l&figure=${figureString}&direction=3&head_direction=3&headonly=1`;
}
