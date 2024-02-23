"use client";

export default function Cards({ members }: { members: number }) {
  return (
    <div className="w-full bg-zinc-950 bg-opacity-50 h-fit flex p-2 flex-col justify-between">
      <div className="font-extrabold">Informações de atividades:</div>
      <div className="w-full bg-opacity-50 h-48 p-2 flex gap-4 justify-around">
        <div className="flex flex-col">
          <div className="flex w-full bg-blue-700 p-2 rounded-t border-black border-b-2 border-opacity-10 justify-center font-extrabold">
            Cursos
          </div>
          <div className="flex bg-blue-700 rounded-b">
            <div className="flex flex-col w-56 p-2 items-center">
              <div className="w-full flex justify-center bg-blue-400 rounded-t font-bold p-2">
                C.A
              </div>
              <div className="flex justify-center w-full text-center bg-zinc-900 rounded-b p-2">
                Um total de x cursos aplicados.
              </div>
            </div>
            <div className="flex flex-col w-56 p-2 items-center">
              <div className="w-full flex justify-center bg-blue-400 rounded-t font-bold p-2">
                T.G
              </div>
              <div className="flex justify-center w-full text-center bg-zinc-900 rounded-b p-2">
                Um total de x cursos aplicados.
              </div>
            </div>
            <div className="flex flex-col w-56 p-2 items-center">
              <div className="w-full flex justify-center bg-blue-400 rounded-t font-bold p-2">
                CID
              </div>
              <div className="flex justify-center w-full text-center bg-zinc-900 rounded-b p-2">
                Um total de x cursos aplicados.
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex w-full bg-blue-700 p-2 rounded-t border-black border-b-2 border-opacity-10 justify-center font-extrabold">
            Informações Gerais
          </div>
          <div className="flex bg-blue-700 rounded-b">
            <div className="flex flex-col w-56 p-2 items-center">
              <div className="w-full flex justify-center bg-blue-400 rounded-t font-bold p-2">
                Instrutores
              </div>
              <div className="flex justify-center text-center w-full bg-zinc-900 rounded-b p-2">
                Um total de {members.toString()} instrutores admitidos.
              </div>
            </div>
            <div className="flex flex-col w-56 p-2 items-center">
              <div className="w-full flex justify-center bg-blue-400 rounded-t font-bold p-2">
                Alunos
              </div>
              <div className="flex justify-center text-center w-full bg-zinc-900 rounded-b p-2">
                Um total de x alunos aprovados.
              </div>
            </div>
            <div className="flex flex-col w-56 p-2 items-center">
              <div className="w-full flex justify-center bg-blue-400 rounded-t font-bold p-2">
                Alunos
              </div>
              <div className="flex justify-center text-center w-full bg-zinc-900 rounded-b p-2">
                Um total de x alunos reprovados.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
