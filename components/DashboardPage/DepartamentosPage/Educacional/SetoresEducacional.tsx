"use client";

import { Skeleton } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function SetoresEducacional() {
  const router = useRouter();
  return (
    <div className="w-full max-sm:mt-4 bg-opacity-50 h-fit p-2 flex flex-wrap gap-4 justify-around">
      <div
        onClick={() =>
          router.push("/dashboard/departamentos/educacional/guias")
        }
        className="flex flex-col hover:cursor-pointer transform transition-transform hover:scale-105 rounded hover:animate-glow"
      >
        <div className="flex w-full bg-green-700 p-2 rounded-t border-b-black border-b-2 border-opacity-10 justify-center font-extrabold">
          Guias
        </div>
        <div className="flex flex-col bg-green-700 rounded-b p-8 text-center justify-ceter font-extrabold">
          <div className="w-36">
            <Suspense
              fallback={
                <Skeleton className="rounded-lg">
                  <div className="h-24 rounded-lg bg-secondary"></div>
                </Skeleton>
              }
            >
              <img
                className="w-full"
                src="http://habbo.com.br/habbo-imaging/badge/b25064s02130s01110s43114s1911472b5b0fd48e75d868bf14a95f3f7ab52.gif"
              />
            </Suspense>
          </div>
          Acessar setor!
        </div>
      </div>
      <div
        onClick={() =>
          router.push("/dashboard/departamentos/educacional/guias")
        }
        className="flex flex-col hover:cursor-pointer transform transition-transform hover:scale-105 rounded hover:animate-glow"
      >
        <div className="flex w-full bg-red-600 p-2 rounded-t border-black border-b-2 border-opacity-10 justify-center font-extrabold">
          Instrutores
        </div>
        <div className="flex flex-col bg-red-600 rounded-b p-8 text-center justify-ceter font-extrabold">
          <div className="w-36">
            <Suspense
              fallback={
                <Skeleton className="rounded-lg">
                  <div className="h-24 rounded-lg bg-secondary"></div>
                </Skeleton>
              }
            >
              <img
                className="w-full"
                src="http://habbo.com.br/habbo-imaging/badge/b05134s02134s36014s43114s41011299d65f60c6dff2cae1edb394ae1adf5.gif"
              />
            </Suspense>
          </div>
          Acessar setor!
        </div>
      </div>
      <div
        onClick={() =>
          router.push("/dashboard/departamentos/educacional/guias")
        }
        className="flex flex-col hover:cursor-pointer transform transition-transform hover:scale-105 rounded hover:animate-glow"
      >
        <div className="flex w-full bg-blue-700 p-2 rounded-t border-black border-b-2 border-opacity-10 justify-center font-extrabold">
          Treinadores
        </div>
        <div className="flex flex-col bg-blue-700 rounded-b p-8 text-center justify-ceter font-extrabold">
          <div className="w-36">
            <Suspense
              fallback={
                <Skeleton className="rounded-lg">
                  <div className="w-full h-24 rounded-lg bg-secondary"></div>
                </Skeleton>
              }
            >
              <img
                className="w-full"
                src="http://habbo.com.br/habbo-imaging/badge/b05134s02134s36064s43114s410614b414aa4b858105e89216491aa224133.gif"
              />
            </Suspense>
          </div>
          Acessar setor!
        </div>
      </div>
    </div>
  );
}
