'use client'
import { Monster } from "@/components/Monster";
import { useMonster } from "@/components/providers/Monster";
import { Button } from "@/components/ui/button";
import { monsterCount } from "@/lib/monster";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Dispatch, SetStateAction, useMemo, useRef } from "react";

export default function Page() {
  const { myMonsterId, } = useMonster();
  const setMyHp = useRef<Dispatch<SetStateAction<number>>>();
  const setEnemyHp = useRef<Dispatch<SetStateAction<number>>>();

  const randomEnemyId = useMemo(() => {
    return Math.floor(Math.random() * monsterCount) + 1;
  }, []);

  if (!myMonsterId) {
    redirect('/');
  }

  const myMonster = myMonsterId
    ? `Your Monster is ${myMonsterId}`
    : 'select Monster';

  return (
    <div className="container py-10">
      <Button asChild className="mb-6" variant="outline">
        <Link href="/">Back</Link>
      </Button>
      <Button onClick={() => {
        setMyHp.current?.(100);
        setEnemyHp.current?.(100);
      }} variant='outline' className="mb-4">
        Reset
      </Button>
      <h2 className="font-bold text-2xl mb-6">Battle Start</h2>
      <div className="grid grid-cols-2 gap-5">
        <div className="w-40">
          <Monster
            onInit={(setter) => {
              setMyHp.current = setter;
            }}
            id={myMonsterId}
            mode="battle"
            onAttack={() => {
              setEnemyHp.current?.((prev) => Math.max(prev - 10, 0));
            }}
          />
        </div>
        <div className="w-40">
          <Monster
            onInit={(setter) => {
              setEnemyHp.current = setter;
            }}
            id={randomEnemyId}
            mode="battle"
            onAttack={() => {
              setMyHp.current?.((prev) => Math.max(prev - 10, 0))
            }}
          />
        </div>
      </div>
      <p>{myMonster}</p>
      <main>Battle</main>
    </div>
  );
}
