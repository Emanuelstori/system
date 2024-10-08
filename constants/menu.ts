import { minLevelSeeAllDocs, minLevelSeeGestao } from ".";

export const menuItems = [
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
        title: "Marketing",
        href: "/dashboard/departamentos/marketing",
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
        href: "/dashboard/estatuto",
      },
      {
        title: "Código Penal",
        href: "/dashboard/codpenal",
      },
      {
        title: "Lista de documentos",
        href: "/dashboard/docs",
        minLevel: minLevelSeeAllDocs,
      },
    ],
  },
  {
    title: "Gestão",
    href: "/dashboard/",
    minLevel: minLevelSeeGestao,
  },
];
