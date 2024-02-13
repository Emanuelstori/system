export default async function EducacitionalPage() {
    return (
      <>
        <div className="flex w-full gap-16">
          <div className="w-full flex flex-col gap-8 h-full">
            <div className="w-full bg-zinc-950 bg-opacity-50 h-fit flex p-2 flex-col justify-between">
              <div className="font-extrabold">Informações de atividades:</div>
              <div className="w-full bg-opacity-50 h-48 p-2 flex gap-4 justify-between">
                <div className="flex flex-col">
                  <div className="flex w-full bg-green-700 p-2 rounded-t border-black border-b-2 border-opacity-10 justify-center font-extrabold">
                    Aulas
                  </div>
                  <div className="flex bg-green-700 rounded-b">
                    <div className="flex flex-col w-56 p-2 items-center">
                      <div className="w-full flex justify-center bg-blue-400 rounded-t font-bold p-2">
                        CFA
                      </div>
                      <div className="flex text-center bg-zinc-900 rounded-b p-2">
                        Um total de x aulas aplicadas.
                      </div>
                    </div>
                    <div className="flex flex-col w-56 p-2 items-center">
                      <div className="w-full flex justify-center bg-blue-400 rounded-t font-bold p-2">
                        APC
                      </div>
                      <div className="flex text-center bg-zinc-900 rounded-b p-2">
                        Um total de x aulas aplicadas.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex w-full bg-red-600 p-2 rounded-t border-black border-b-2 border-opacity-10 justify-center font-extrabold">
                    Instrutores
                  </div>
                  <div className="flex bg-red-600 rounded-b">
                    <div className="flex flex-col w-56 p-2 items-center">
                      <div className="w-full flex justify-center bg-blue-400 rounded-t font-bold p-2">
                        CA
                      </div>
                      <div className="flex text-center bg-zinc-900 rounded-b p-2">
                        Um total de x cursos aplicados.
                      </div>
                    </div>
                    <div className="flex flex-col w-56 p-2 items-center">
                      <div className="w-full flex justify-center bg-blue-400 rounded-t font-bold p-2">
                        TG
                      </div>
                      <div className="flex text-center bg-zinc-900 rounded-b p-2">
                        Um total de x cursos aplicados.
                      </div>
                    </div>
                    <div className="flex flex-col w-56 p-2 items-center">
                      <div className="w-full flex justify-center bg-blue-400 rounded-t font-bold p-2">
                        CID
                      </div>
                      <div className="flex text-center bg-zinc-900 rounded-b p-2">
                        Um total de x cursos aplicados.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex w-full bg-blue-700 p-2 rounded-t border-black border-b-2 border-opacity-10 justify-center font-extrabold">
                    Treinadores
                  </div>
                  <div className="flex bg-blue-700 rounded-b">
                    <div className="flex flex-col w-56 p-2 items-center">
                      <div className="w-full flex justify-center bg-blue-400 rounded-t font-bold p-2">
                        CFO
                      </div>
                      <div className="flex text-center bg-zinc-900 rounded-b p-2">
                        Um total de x cursos aplicados.
                      </div>
                    </div>
                    <div className="flex flex-col w-56 p-2 items-center">
                      <div className="w-full flex justify-center bg-blue-400 rounded-t font-bold p-2">
                        CFE
                      </div>
                      <div className="flex text-center bg-zinc-900 rounded-b p-2">
                        Um total de x cursos aplicados.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {""}
            </div>
            <div className="w-full bg-zinc-950 bg-opacity-50 h-full p-2">
              Histórico de atividade
            </div>
          </div>
          <div className="flex flex-col w-52 gap-8 h-full">
            <div className="flex flex-col w-full bg-blue-500 h-28 rounded p-2">
              botões de ação
            </div>
            <div className="flex flex-col w-full bg-blue-500 h-48 p-2">
              quadro de avisos
            </div>
            <div className="flex flex-col w-full bg-blue-500 h-48 p-2">
              membros
            </div>
          </div>
        </div>
      </>
    );
  }
  