'use client'
import { Monster } from "@/components/Monster";
import { useMonster } from "@/components/providers/Monster";
import { useStage } from "@/components/providers/Stage";
import { Button } from "@/components/ui/button";
import { monsterCount } from "@/lib/monster";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Dispatch, SetStateAction, useMemo, useRef } from "react";

export default function Page() {
  const { myMonsterId, } = useMonster();
  const { attack ,enemyId, enemyHp, playerHp, reset } = useStage();

  

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
        <Button
          onClick={() => {
            reset();
          }}
          variant="outline"
          className="mb-4"
        >
          Reset
        </Button>
        <h2 className="font-bold text-2xl mb-6">Battle Start</h2>
        <div className="grid grid-cols-2 gap-5">
          <div className="w-40">
            <Monster
              hp={playerHp}
              id={myMonsterId}
              mode="battle"
              onAttack={() => {
                attack('enemy')
              }}
            />
          </div>
          <div className="w-40">
            <Monster
              hp={enemyHp}
              id={enemyId}
              mode="battle"
              onAttack={() => {
                attack('player')
              }}
            />
          </div>
        </div>
        <p>{myMonster}</p>
        <main>Battle</main>
      </div>
  );
}
