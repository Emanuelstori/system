"use client";
import { Button } from "@nextui-org/react";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import PlaySound from "@/components/PlaySound";
export default function Pagination({ maxPage }: { maxPage: number | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchParamsValue, setSearchParamsValue] = useState<any>();

  useEffect(() => {
    if (searchParams) {
      const currentPage = searchParams.get("page");
      if (currentPage) {
        setSearchParamsValue(parseInt(currentPage));
      }
    }
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  function handleNext() {
    var currentPage;
    if (!searchParamsValue) {
      currentPage = 1;
    } else {
      currentPage = searchParamsValue;
    }
    if (maxPage)
      if (currentPage * 20 < maxPage)
        router.push(
          `${pathname}?${createQueryString("page", currentPage + 1)}`
        );
  }
  function handleBack() {
    if (searchParamsValue <= 1) {
      return;
    }
    router.push(
      `${pathname}?${createQueryString(
        "page",
        (searchParamsValue - 1).toString()
      )}`
    );
  }
  return (
    <div className="flex flex-wrap p-2">
      <Button
        radius="none"
        variant="bordered"
        className="p-2 rounded-l-md border flex gap-1 items-center"
        onMouseEnter={PlaySound}
        onClick={handleBack}
      >
        <FaLeftLong /> Anterior
      </Button>
      <Button
        radius="none"
        variant="bordered"
        className="p-2 rounded-r-md border flex gap-1 items-center"
        onMouseEnter={PlaySound}
        onClick={handleNext}
      >
        Próxima <FaRightLong />
      </Button>
    </div>
  );
}
