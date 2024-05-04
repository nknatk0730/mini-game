'use client'
import { Monster } from "@/components/Monster";
import { useMonster } from "@/components/providers/Monster";
import { Button } from "@/components/ui/button";
import { monsters } from "@/lib/monster";
import Link from "next/link";

export default function Home() {
  const {myMonsterId, setMyMonsterId} = useMonster();

  return (
    <main className="py-10 container">
      {myMonsterId && (
        <div>
          <h2>Your Monster is</h2>
          {myMonsterId && (
            <div className="w-40">
              <Monster
                id={myMonsterId}
                mode='none'
              ></Monster>
            </div>
          )}
          <Button asChild variant="destructive">
            <Link href="/battle">Battle Start</Link>
          </Button>
        </div>
      )}
      <h2 className="font-bold text-2xl flex items-center justify-between">
        Choose the Monster
      </h2>
      <div className="grid grid-cols-3 py-10 gap-4">
        {monsters.map((monster, i) => {
          return (
            <Monster
              mode="select"
              id={monster.id}
              key={monster.id}
              onSelected={(id) => {
                setMyMonsterId(id);
              }}
            />
          );
        })}
      </div>
    </main>
  );
}


