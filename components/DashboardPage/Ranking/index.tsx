"use client";

import { FaTrophy } from "react-icons/fa6";
import Image from "next/image";
import PlaySound from "@/components/PlaySound";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

type User = {
  nick: string;
  Profile: {
    points: number;
  } | null;
};

export default function Ranking({ users }: { users: User[] | null }) {
  if (!users) {
    return <div>Loading...</div>;
  }

  const [quantity, setQuantity] = useState<number>(4);

  const topFiveUsers = users.slice(0, quantity);

  return (
    <>
      {/* INICIO RANKING */}
      <div className="flex flex-col gap-2 w-96 h-fit">
        <div className="bg-zinc-900 max-sm:w-full max-sm:!px-1 flex max-h-96 overflow-y-auto flex-col gap-6 bg-opacity-50 rounded-xl p-4 w-96 h-fit">
          <div>
            <h1 className="flex gap-2 px-2 items-center text-xl">
              <FaTrophy /> Ranking Semanal
            </h1>
          </div>
          <div className="flex flex-col gap-3">
            {topFiveUsers.map((user, index) => (
              <RankingItem key={index} user={user} />
            ))}
            <Button
              onMouseEnter={PlaySound}
              onClick={() => {
                console.log(users.length, quantity + 8);
                users.length > quantity + 8
                  ? setQuantity(quantity + 4)
                  : setQuantity(users.length);
              }}
              className="bg-blue-800 mt-1"
            >
              Ver mais
            </Button>
            {quantity > 4 && (
              <Button
                onMouseEnter={PlaySound}
                onClick={() =>
                  quantity >= 8 ? setQuantity(quantity - 4) : setQuantity(4)
                }
                className="bg-blue-800 mt-1"
              >
                Ver menos
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* FIM RANKING */}
    </>
  );
}

interface RankingItemProps {
  user: User;
}

const RankingItem: React.FC<RankingItemProps> = ({ user }) => {
  const [figureData, setFigureData] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      const response = await fetch(
        `https://www.habbo.com.br/api/public/users?name=${user.nick}`
      );
      const data = await response.json();
      setFigureData(data.figureString); // assuming figureData is the correct property in the API response
    };
    fetchAvatar();
  }, [user]);

  if (!figureData) {
    return <div>Loading...</div>;
  }

  return (
    <div
      onMouseEnter={PlaySound}
      className="flex w-full bg-blue-500 h-10 rounded-md hover:cursor-pointer hover:bg-violet-700 transition-all duration-250 justify-between"
    >
      <div className="w-max flex items-center h-10 rounded-md">
        <div className="relative w-14 h-12 p-1">
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill={true}
            className="p-1"
            style={{
              objectFit: "cover",
              objectPosition: "50% 50%",
            }}
            src={`https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&figure=${figureData}&direction=3&head_direction=3&size=m&gesture=srp&headonly=1`}
            alt={""}
          />
        </div>
        <div>
          <p>{user.nick}</p>
        </div>
      </div>
      <div className="w-fit flex h-full items-center px-2">
        <p className="flex">{user.Profile?.points} pontos</p>
        <div className="relative w-8 h-8 p-1">
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill={true}
            className="p-1"
            style={{ objectFit: "cover" }}
            src={`https://www.habbo.com.br/habbo-imaging/badge/b07104s36134s44014s411340aa4fc4aaafc7a8ab371cf429a05a155.gif`}
            alt={""}
          />
        </div>
      </div>
    </div>
  );
};
