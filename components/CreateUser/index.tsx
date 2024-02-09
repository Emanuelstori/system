"use client";

import { Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";

export default function CreateUser() {
  const [valueNick, setValueNick] = useState("");
  const [valueTag, setValueTag] = useState("");
  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event);
    const payload = {
      username: valueNick,
      TAG: valueTag,
    };
    await axios.post("/api/auth/newUser", payload);
  }
  return (
    <form onSubmit={handleCreate}>
      <Input
        isRequired
        type="text"
        id="username"
        name="username"
        required
        variant="bordered"
        placeholder="Digite seu nick"
        label="Nick"
        onChange={(e) => {
          setValueNick(e.currentTarget.value);
        }}
      />
      <Input
        isRequired
        type="text"
        id="TAG"
        name="TAG"
        required
        variant="bordered"
        placeholder="Digite sua TAG"
        label="TAG"
        onChange={(e) => {
          setValueTag(e.currentTarget.value);
        }}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
