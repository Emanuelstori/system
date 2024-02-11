import Educacional from "./Educacional";
import Lotas from "./Lotas";
import RH from "./RH";
export default async function Menu() {
  return (
    <aside className="flex flex-col p-8 w-fit h-fit bg-zinc-900 rounded-lg">
      <div className="pb-2">Departamentos:</div>
      <Educacional />
      <RH />
      <Lotas />
    </aside>
  );
}
