import { monsters } from "@/lib/monster";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Howl, Howler } from "howler";


type MonsterProps = 
  | {
    id: number;
    mode: 'select';
    onSelected: (id: number) => void;
    onAttack?: undefined;
    onInit?: undefined; 
  }
  | {
    id: number;
    mode: 'battle';
    onAttack: () => void;
    onSelected?: undefined;
    onInit: (setHp: Dispatch<SetStateAction<number>>) => void
  }
  | {
    id: number;
    mode: 'none';
    onAttack?: undefined;
    onSelected?: undefined;
    onInit?: undefined;
  };

export const Monster = ({
  id,
  mode,
  onInit,
  onSelected,
  onAttack,
}: MonsterProps) => {
  const [hp, setHp] = useState(100);
  var sound = useMemo(() => {
    return new Howl({
      src: ['sounds/attack.mp3'],
      html5: true,
    });
  }, []);
  
  const monster = useMemo(() => {
    monsters.find((monster) => monster.id === id)
  }, [id]);

  useEffect(() => {
    onInit?.(setHp);
    console.log('initialization');
    
  }, [setHp, onInit])

  if (!id) {
    return null;
  }

  return (
    <div key={id} className="p-4 border space-y-2 shadow-sm">
      <div className="aspect-square relative">
        <Image
          src={`/images/monster-${id}.svg`}
          unoptimized
          alt="a"
          fill
        />
      </div>
      <h2>{id}</h2>
      {mode === "battle" && (
        <div>
          <p>HP: {hp}</p>
          <div className="h-3 rounded-full overflow-hidden border">
            <div
              className={cn(
                "bg-lime-500 size-full origin-left transition duration-500",
                hp > 50
                  ? "bg-green-500"
                  : hp > 20
                  ? "bg-yellow-400"
                  : "bg-red-500"
              )}
              style={{
                transform: `scaleX(${hp / 100})`,
              }}
            ></div>
          </div>
        </div>
      )}

      {mode === "battle" && (
        <Button
          disabled={hp <= 0}
          onClick={() => {
            onAttack();
            sound.play();
          }}
          variant="destructive"
        >
          Attack
        </Button>
      )}

      {mode === "select" && (
        <Button
          disabled={hp <= 0}
          onClick={() => {
            onSelected(id);
          }}
        >
          Select
        </Button>
      )}
    </div>
  );
};