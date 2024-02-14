import RankingEducacional from "@/components/DashboardPage/DepartamentosPage/Educacional/RankingEducacional";
import SetoresEducacional from "@/components/DashboardPage/DepartamentosPage/Educacional/SetoresEducacional";
import { FaPlus } from "react-icons/fa6";

export default async function EducacitionalPage() {
  return (
    <>
      <div className="flex w-full gap-16 flex-wrap">
        <div className="flex-grow max-sm:w-full flex flex-col gap-8">
          <div className="w-full bg-zinc-950 bg-opacity-50 h-fit p-2 rounded">
            <div className="flex justify-between w-full">
              <div>Quadro de informações:</div>
              <div className="w-fit h-fit bg-blue-400 p-2 rounded hover:cursor-pointer hover:brightness-110 hover:scale-105">
                <FaPlus />
              </div>
            </div>
            <div className="flex flex-grow overflow-auto flex-col justify-center h-fit rounded-lg gap-2 p-4">
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
          <div className="w-full bg-zinc-950 bg-opacity-50 h-fit flex px-2 py-4 flex-col rounded justify-around">
            <div className="font-extrabold">Setores:</div>
            <SetoresEducacional />
            {""}
          </div>
        </div>
        <div className="flex xl:flex-col max-xl:w-full w-72 gap-8 h-full max-xl:justify-around">
          <RankingEducacional title="Ranking Guias:" />
          <RankingEducacional title="Ranking Instrutores:" />
          <RankingEducacional title="Ranking Treinadores:" />
        </div>
      </div>
    </>
  );
}
