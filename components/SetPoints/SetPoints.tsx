"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { RxUpdate } from "react-icons/rx";
import { toast } from "react-toastify";

export default function SetPoints(userData: any) {
    const options = [
        {
            value: "Adicionar",
            label: "Adicionar Pontos"
        },
        {
            value: "Remover",
            label: "Remover Pontos"
        },
        {
            value: "Setar",
            label: "Setar Pontos"
        }
    ];
    const [optionValue, setOptionValue] = useState("");
    const [qtdPontos, setQtdPontos] = useState(0);

    function setMaxValue(event: any) {
        const value = Number(event.target.value);
        if (value < 0) {
            setQtdPontos(0);
            return;
        }
        if (optionValue === "Remover") {
            if (value > userData?.userData.Profile?.points) {
                setQtdPontos(userData?.userData.Profile?.points);
                return;
            }
        }
        setQtdPontos(value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            qtdPoints: qtdPontos,
            action: optionValue,
            profileId: userData?.userData.Profile.id
        }

        const id = toast.loading("Realizando atualização de pontos...", {
            position: toast.POSITION.BOTTOM_RIGHT,
            theme: "dark",
        });

        try {
            await axios.post("/api/globalData/users/setPoints", payload)
            toast.update(id, {
                render: "Atualização de pontos realizada!",
                type: "success",
                isLoading: false,
                theme: "dark",
                autoClose: 5000,
                closeButton: true,
            });
            onclose;
        } catch (e) {
            toast.update(id, {
                render: "Whoops! Algo deu errado, tente novamente.",
                type: "error",
                isLoading: false,
                theme: "dark",
                autoClose: 5000,
                closeButton: true,
            });
            console.log(e);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
            <h1 className="font-semibold p-1">Pontos do Funcionário: {userData?.userData.Profile?.points}</h1>
            <Select
                isRequired
                items={options}
                label="Operação"
                placeholder="Selecionar operação"
                className="max-w-xs"
                onChange={(e) => setOptionValue(e.target.value)}
            >
                {(option) => <SelectItem data-label={option.label} key={option.value}>{option.label}</SelectItem>}
            </Select>
            <Input
                isRequired
                label="Qtd. Pontos"
                placeholder="Pontos"
                className="max-w-xs"
                type="number"
                value={String(qtdPontos)}
                max={optionValue === "Remover" ? userData?.userData.Profile?.points : undefined}
                onChange={(e) => setMaxValue(e)}
            />
            <Button disabled={!optionValue && !qtdPontos ? true : false} className="text-white w-full" type="submit" color="success">
                <RxUpdate size={24} />
                {optionValue === "Adicionar" ? "Adicionar Pontos" : (optionValue === "Remover" ? "Remover Pontos" : optionValue === "Setar" ? "Setar Pontos" : "Selecione Operação...")}
            </Button>

        </form>
    )
}