import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { ChevronDown } from "./Icons";
import { AcmeLogo } from "./AcmeLogo";
import UserArea from "../UserArea";
import { useRouter } from "next/navigation";
import { UserDataFiltred } from "@/Types/UserType";
import axios, { AxiosError } from "axios";

export default function NavBar({
  isMenuOpen,
  setIsMenuOpen,
  userInfo,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: any;
  userInfo: UserDataFiltred | undefined;
}) {
  const { push } = useRouter();
  const icons = {
    chevron: (
      <ChevronDown
        fill="currentColor"
        size={16}
        height={undefined}
        width={undefined}
      />
    ),
  };

  const menuItems = [
    {
      title: "Início",
      href: "/dashboard/",
    },
    {
      title: "Listagem",
      href: "/dashboard/listagem",
    },
    {
      title: "Departamentos",
      submenu: [
        {
          title: "Lotas",
          href: "/dashboard/departamentos/lotas",
        },
        {
          title: "Educacional",
          href: "/dashboard/departamentos/educacional",
        },
        {
          title: "Recursos Humanos",
          href: "/dashboard/departamentos/rh",
        },
      ],
    },
    {
      title: "Requerimentos",
      submenu: [
        {
          title: "TAGs",
          href: "/dashboard/departamentos/educacional",
        },
        {
          title: "Licença",
          href: "/dashboard/departamentos/lotas",
        },
        {
          title: "Exoneração",
          href: "/dashboard/departamentos/educacional",
        },
        {
          title: "Transferência de conta",
          href: "/dashboard/departamentos/educacional",
        },
      ],
    },
    {
      title: "Documentos",
      submenu: [
        {
          title: "Estatuto",
          href: "/dashboard/departamentos/lotas",
        },
        {
          title: "Código Penal",
          href: "/dashboard/departamentos/educacional",
        },
      ],
    },
  ];

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">
            {process.env.NEXT_PUBLIC_POLICE_NAME}
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">
            {process.env.NEXT_PUBLIC_POLICE_NAME}
          </p>
        </NavbarBrand>
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            {item.submenu !== undefined ? (
              <>
                <Dropdown key={index}>
                  <NavbarItem>
                    <DropdownTrigger>
                      <Button
                        disableRipple
                        size="lg"
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                        endContent={icons.chevron}
                        radius="sm"
                        variant="light"
                      >
                        {item.title}
                      </Button>
                    </DropdownTrigger>
                  </NavbarItem>
                  <DropdownMenu
                    className="w-fit"
                    itemClasses={{
                      base: "gap-4",
                    }}
                  >
                    {item.submenu?.map((itemSubMenu, index) => (
                      <DropdownItem
                        href={itemSubMenu.href}
                        key={index}
                        className="w-52"
                      >
                        {itemSubMenu.title}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </>
            ) : (
              <Button
                size="lg"
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
                onPress={() => push(item.href)}
              >
                {item.title}
              </Button>
            )}
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <UserArea userInfo={userInfo} />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarItem key={`${item}-${index}`}>
            {item.submenu !== undefined ? (
              <>
                <Dropdown key={index}>
                  <NavbarItem>
                    <DropdownTrigger>
                      <Button
                        disableRipple
                        size="lg"
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                        endContent={icons.chevron}
                        radius="sm"
                        variant="light"
                      >
                        {item.title}
                      </Button>
                    </DropdownTrigger>
                  </NavbarItem>
                  <DropdownMenu
                    className="w-fit"
                    itemClasses={{
                      base: "gap-4",
                    }}
                  >
                    {item.submenu?.map((itemSubMenu, index) => (
                      <DropdownItem
                        href={itemSubMenu.href}
                        key={index}
                        className="w-52"
                      >
                        {itemSubMenu.title}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </>
            ) : (
              <Button
                size="lg"
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
                onPress={() => push(item.href)}
              >
                {item.title}
              </Button>
            )}
          </NavbarItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

async function getNotifications({ userId }: { userId: string }) {
  try {
    const payload = {
      id: userId,
    };
    const { data } = await axios.post(
      "/api/globalData/users/notification",
      payload
    );
    console.log(data);
    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      user: null,
      error,
    };
  }
}
