"use client";

import { HiDocumentArrowUp, HiDocumentArrowDown } from "react-icons/hi2";
export default function RankingEducacional({title}: {title: string}) {
  return (
    <div className="flex flex-col w-full bg-blue-500 h-fit p-2 shadow-md rounded shadow-blue-400/50">
      <div className="flex flex-col gap-2">
        <div>
          <div className="font-extrabold">{title}</div>
        </div>
        <div className="bg-white items-center justify-around w-full h-16 shadow-md rounded shadow-zinc-400/50 flex text-black font-bold">
          <div className="flex flex-col items-center fit p-2">
            <HiDocumentArrowUp size={25} />x
          </div>
          <div className="flex flex-col items-center w-fit p-2 text-zinc-200 font-normal text-xs">
            <div className="w-10 rounded-full">
              <img
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d.png"
                className="rounded-full object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col items-center w-fit p-2">
            <HiDocumentArrowDown size={25} />x
          </div>
        </div>
        <div className="bg-white items-center justify-around w-full h-16 shadow-md rounded shadow-zinc-400/50 flex text-black font-bold">
          <div className="flex flex-col items-center fit p-2">
            <HiDocumentArrowUp size={25} />x
          </div>
          <div className="flex flex-col items-center w-fit p-2 text-zinc-200 font-normal text-xs">
            <div className="w-10 rounded-full">
              <img
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d.png"
                className="rounded-full object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col items-center w-fit p-2">
            <HiDocumentArrowDown size={25} />x
          </div>
        </div>
        <div className="bg-white items-center justify-around w-full h-16 shadow-md rounded shadow-zinc-400/50 flex text-black font-bold">
          <div className="flex flex-col items-center fit p-2">
            <HiDocumentArrowUp size={25} />x
          </div>
          <div className="flex flex-col items-center w-fit p-2 text-zinc-200 font-normal text-xs">
            <div className="w-10 rounded-full">
              <img
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d.png"
                className="rounded-full object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col items-center w-fit p-2">
            <HiDocumentArrowDown size={25} />x
          </div>
        </div>
      </div>
    </div>
  );
}
