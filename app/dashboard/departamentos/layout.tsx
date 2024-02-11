import Menu from "@/components/DepartamentosPage/Menu/index";
export default async function DepartamentosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-screen">
      <div className="flex w-full max-w-screen overflow-hidden p-8">
        <Menu />
        {children}
      </div>
    </main>
  );
}
