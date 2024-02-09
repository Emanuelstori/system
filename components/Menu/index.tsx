"use client";
import React, { useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  cn,
} from "@nextui-org/react";
import UserArea from "../UserArea";
import { useRouter } from "next/navigation";
import { UserDataFiltred } from "@/Types/UserType";
import PlaySound from "../PlaySound";

export default function Menu({
  isMenuOpen,
  setIsMenuOpen,
  userInfo,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: any;
  userInfo: UserDataFiltred | undefined;
}) {
  const menuItems = [
    {
      title: "Geral",
      submenu: [
        {
          title: "Início",
          href: "/dashboard/",
        },
      ],
    },
    {
      title: "Listagem",
      href: "/dashboard/listagem",
    },
  ];
  const { push } = useRouter();

  return (
    <Navbar
      isBordered
      maxWidth="full"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="w-full px-4"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          LOGO
          <p className="font-bold text-inherit">
            {process.env.NEXT_PUBLIC_POLICE_NAME}
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          LOGO
          <p className="font-bold text-inherit">
            {process.env.NEXT_PUBLIC_POLICE_NAME}
          </p>
        </NavbarBrand>
        {menuItems.map((itemMenu, index) => (
          <NavbarMenuItem key={`${itemMenu}-${index}`}>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  radius="sm"
                  variant="light"
                  onMouseEnter={PlaySound}
                  onClick={() => {
                    itemMenu.href && push(itemMenu.href);
                  }}
                >
                  {itemMenu.title}
                </Button>
              </DropdownTrigger>
              {itemMenu.submenu !== undefined ? (
                <DropdownMenu
                  aria-label="ACME features"
                  className="w-[340px]"
                  itemClasses={{
                    base: "gap-4",
                  }}
                >
                  {itemMenu.submenu?.map((itemSubMenu, index) => (
                    <DropdownItem
                      onMouseEnter={PlaySound}
                      key={`${itemSubMenu}-${index}`}
                      onClick={() => {
                        itemSubMenu.href && push(itemSubMenu.href);
                      }}
                    >
                      {itemSubMenu.title}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              ) : (
                ""
              )}
            </Dropdown>
          </NavbarMenuItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex sm:hidden">
          <UserArea userInfo={userInfo} />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <UserArea userInfo={userInfo} />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((itemMenu, index) => (
          <NavbarMenuItem key={`${itemMenu}-${index}`}>
            <Dropdown>
              <DropdownTrigger>
                <button
                  className="selection:border-none selection:outline-none outline-none"
                  onClick={() => {
                    itemMenu.href && push(itemMenu.href);
                  }}
                >
                  {itemMenu.title}
                </button>
              </DropdownTrigger>
              {itemMenu.submenu !== undefined ? (
                <DropdownMenu
                  variant="faded"
                  aria-label="Dropdown menu with description"
                >
                  <DropdownSection>
                    {itemMenu.submenu?.map((itemSubMenu, index) => (
                      <DropdownItem
                        key={`${itemSubMenu}-${index}`}
                        onClick={() => {
                          itemSubMenu.href && push(itemSubMenu.href);
                        }}
                      >
                        {itemSubMenu.title}
                      </DropdownItem>
                    ))}
                  </DropdownSection>
                </DropdownMenu>
              ) : (
                ""
              )}
            </Dropdown>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
