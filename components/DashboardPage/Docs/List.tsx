"use client";
import * as React from "react";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale"; // Importe o locale para português brasileiro
import { FaEye, FaPencil, FaX } from "react-icons/fa6";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function DisableClickSelectionGrid({
  documents,
}: {
  documents: {
    id: number;
    title: string;
    description: string;
    content: string;
    createdAt: Date;
    author: {
      user: {
        nick: string;
      };
    };
  }[];
}) {
  const { push } = useRouter();
  const data = {
    columns: [
      { field: "id", hide: true },
      { field: "title", headerName: "Título", width: 200 },
      {
        field: "description",
        headerName: "Descrição",
        width: 200,
        editable: false,
      },
      {
        field: "author",
        headerName: "Criado por",
        width: 200,
        editable: false,
      },
      {
        field: "createdAt",
        headerName: "Criado em",
        width: 200,
        editable: false,
      },
      {
        field: "actions",
        headerName: "Ações",
        width: 200,
        editable: false,
        renderCell: (params: GridCellParams) => params.value,
      },
    ] as GridColDef[],
    rows: documents.map((doc) => ({
      id: doc.id,
      title: doc.title,
      description: doc.description,
      author: doc.author.user.nick,
      createdAt: format(doc.createdAt, "dd 'de' MMM yyyy HH:mm", {
        locale: ptBR,
      }),
      actions: (
        <div className="flex gap-2">
          <Button
            isIconOnly
            onPress={() => push(`/dashboard/docs/${doc.title}`)}
            className="text-white"
            color="success"
            aria-label="See"
          >
            <FaEye />
          </Button>
          <Button isIconOnly color="primary" aria-label="Edit">
            <FaPencil />
          </Button>
          <Button isIconOnly color="danger" aria-label="Delete">
            <FaX />
          </Button>
        </div>
      ),
    })),
    initialState: {
      columns: {
        columnVisibilityModel: {
          id: false,
        },
      },
    },
    experimentalFeatures: {
      ariaV7: true,
    },
  };
  console.log(data);

  return (
    <div className="h-full w-fit max-h-full max-w-full p-4 rounded overflow-auto">
      <DataGrid
        className="bg-white w-full max-h-full h-full overflow-none"
        checkboxSelection
        disableRowSelectionOnClick
        {...data}
      />
    </div>
  );
}
