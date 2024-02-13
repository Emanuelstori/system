import Menu from "@/components/DepartamentosPage/Menu/index";
export default async function DepartamentosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen w-full">
      <div className="flex w-full max-w-screen overflow-hidden p-8">
        {/*<Menu />*/}
        {children}
      </div>
    </div>
  );
}
