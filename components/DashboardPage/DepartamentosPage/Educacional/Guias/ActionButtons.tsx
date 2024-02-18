"use client";

import ModalScripts from "./modals/ModalScripts";
import ModalAulas from "./modals/ModalAulas";
import ModalAddScripts from "./modals/ModalAddScripts";
export default function ActionButtons({
  roles,
}: {
  roles: {
    id: number;
    role: string;
    companyId: number;
    createdAt: Date;
  }[];
}) {
  return (
    <>
      <div className="flex flex-col w-full gap-2 bg-cyan-500 bg-opacity-50 h-28 rounded p-2 justify-between">
        <ModalScripts />
        <ModalAulas />
        <ModalAddScripts roles={roles} />
      </div>
    </>
  );
}
