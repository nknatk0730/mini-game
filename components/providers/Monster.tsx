'use client';

import { createContext, useContext } from "react";
import useLocalStorage from "use-local-storage";

type ContextType = {
  myMonsterId: number | undefined;
  setMyMonsterId: (id: number) => void;
};

const Context = createContext<ContextType>({} as ContextType);

export const MonsterProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  // const [myMonsterId, setMyMonsterId] = useState<number>();

  const [myMonsterId, setMyMonsterId] = useLocalStorage<number>("myMonsterId", 1);

  return (
    <Context.Provider
      value={{
        myMonsterId,
        setMyMonsterId,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMonster = () => useContext(Context);