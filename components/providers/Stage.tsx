'use client'
import { monsterCount } from "@/lib/monster";
import { createContext, useContext, useMemo, useState } from "react";

type ContextType = {
  playerHp: number;
  enemyHp: number;
  enemyId: number;
  reset: () => void;
  attack: (target: 'player' | 'enemy') => void
}

const Context = createContext<ContextType>({} as ContextType);

export const useStage = () => useContext(Context);

export const StageProvider = ({ children }: {children: React.ReactNode}) => {
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [enemyHp, setEnemyHp] = useState<number>(100);

  const enemyId = useMemo(() => {
    return Math.floor(Math.random() * monsterCount) + 1;
  }, []);

  const reset = () => {
    setPlayerHp(100);
    setEnemyHp(100);
  }

  const attack = (target: 'player' | 'enemy') => {
    if (target === 'player') {
      setPlayerHp((prev) => Math.max(prev - 10, 0));
    } else {
      setEnemyHp((prev) => Math.max(prev - 10, 0));
    }
  }

  return (
    <Context.Provider
      value={{
        playerHp,
        enemyHp,
        attack,
        enemyId,
        reset,
      }}
    >
      {children}
    </Context.Provider>
  );
}