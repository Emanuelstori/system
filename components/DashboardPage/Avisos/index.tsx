"use client";

import { FaClipboardList } from "react-icons/fa6";

export default function Avisos() {
  return (
    <>
      {/* INICIO QUADRO DE AVISOS */}
      <div className="flex w-full max-sm:max-w-full overflow-auto flex-col gap-2 items-start">
        <h1 className="flex gap-2 px-2 text-xl items-center">
          <FaClipboardList /> Quadro de avisos
        </h1>
        <div className="flex-grow-1 w-[calc(100%-8rem)] flex flex-wrap gap-8 justify-start">
          <div className="flex flex-grow-1 flex-col justify-center bg-zinc-900 h-fit rounded-lg gap-2 p-4">
            <h1 className="font-bold">Tabela de Cargos</h1>
            <p>
              Em seguida apresenta-se os cargos oficiais da Polícia RHC
              Corporation.
            </p>
            <table
              className="w-[35rem]"
              border={1}
              cellPadding={1}
              cellSpacing={1}
            >
              <tbody>
                <tr>
                  <td className="text-center px-4 border w-fit">Cargo</td>
                  <td className="text-center px-2 border">
                    Dias min p/ promoção
                  </td>
                  <td className="text-center px-2 border">Cursos</td>
                  <td className="text-center px-2 border">Valor</td>
                  <td className="text-center px-2 border">Visual</td>
                  <td className="text-center px-10 border">Cor</td>
                </tr>
                <tr>
                  <td className="text-center border w-fit">Soldado</td>
                  <td className="text-center border"></td>
                  <td className="text-center px-2 border"></td>
                  <td className="text-center px-2 border"></td>
                  <td className="text-center px-2 border">Pré-Definido</td>
                  <td className="text-center px-2 border">Marrom Escuro</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* FIM QUADRO DE AVISOS */}
    </>
  );
}
