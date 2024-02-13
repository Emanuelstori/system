import SetoresEducacional from "@/components/DashboardPage/DepartamentosPage/Educacional/SetoresEducacional";

export default async function EducacitionalPage() {
  return (
    <>
      <div className="flex w-full gap-16">
        <div className="w-full flex flex-col gap-8 h-full">
          <div className="w-full bg-zinc-950 bg-opacity-50 h-full p-2">
            Quadro de informações:
          </div>
          <div className="w-full bg-zinc-950 bg-opacity-50 h-fit flex px-2 py-4 flex-col justify-around">
            <div className="font-extrabold">Setores:</div>
            <SetoresEducacional />
            {""}
          </div>
        </div>
        <div className="flex flex-col w-52 gap-8 h-full">
          <div className="flex flex-col w-full bg-blue-500 h-48 p-2">
            Ranking Guias
          </div>
          <div className="flex flex-col w-full bg-blue-500 h-48 p-2">
            Ranking Instrutores
          </div>
          <div className="flex flex-col w-full bg-blue-500 h-48 p-2">
            Ranking Treinadores
          </div>
        </div>
      </div>
    </>
  );
}
