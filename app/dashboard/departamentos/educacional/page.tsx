export default async function EducacitionalPage() {
  return (
    <>
      <div className="flex w-full gap-16">
        <div className="w-full flex flex-col gap-8 h-full">
          <div className="w-full bg-zinc-950 bg-opacity-50 h-full p-2">
            Quadro de informações:
          </div>
          <div className="w-full bg-zinc-950 bg-opacity-50 h-fit flex p-2 flex-col justify-around">
            <div className="font-extrabold">Setores:</div>
            <div className="w-full bg-opacity-50 h-fit p-2 flex gap-4 justify-around">
              <div className="flex flex-col">
                <div className="flex w-full bg-green-700 p-2 rounded-t border-black border-b-2 border-opacity-10 justify-center font-extrabold">
                  Guias
                </div>
                <div className="flex flex-col bg-green-700 rounded-b p-8 text-center justify-ceter font-extrabold">
                  <div className="w-36">
                    <img
                      className="w-full"
                      src="http://habbo.com.br/habbo-imaging/badge/b25064s02130s01110s43114s1911472b5b0fd48e75d868bf14a95f3f7ab52.gif"
                    />
                  </div>
                  Acessar setor!
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex w-full bg-red-600 p-2 rounded-t border-black border-b-2 border-opacity-10 justify-center font-extrabold">
                  Instrutores
                </div>
                <div className="flex flex-col bg-red-600 rounded-b p-8 text-center justify-ceter font-extrabold">
                  <div className="w-36">
                    <img
                      className="w-full"
                      src="http://habbo.com.br/habbo-imaging/badge/b05134s02134s36014s43114s41011299d65f60c6dff2cae1edb394ae1adf5.gif"
                    />
                  </div>
                  Acessar setor!
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex w-full bg-blue-700 p-2 rounded-t border-black border-b-2 border-opacity-10 justify-center font-extrabold">
                  Treinadores
                </div>
                <div className="flex flex-col bg-blue-700 rounded-b p-8 text-center justify-ceter font-extrabold">
                  <div className="w-36">
                    <img
                      className="w-full"
                      src="http://habbo.com.br/habbo-imaging/badge/b05134s02134s36064s43114s410614b414aa4b858105e89216491aa224133.gif"
                    />
                  </div>
                  Acessar setor!
                </div>
              </div>
            </div>
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
