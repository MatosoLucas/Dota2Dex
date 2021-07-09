import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface HeroProviderProps {
  children: ReactNode;
}

interface HeroProps {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: Array<string>;
}

interface HeroContextData {
  heroes: Array<HeroProps>
}

const HeroContext = createContext({} as HeroContextData)

export function HeroProvider({ children }: HeroProviderProps) {
  const [heroes, setHeroes] = useState<HeroProps[]>([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.opendota.com/api/heroes')
      const data = await response.json()
      setHeroes(data)
    }
   fetchData()
  }, [])

  return (
    <HeroContext.Provider
      value={{ heroes }}>
      {children}
    </HeroContext.Provider>
  )
}

export function useHeroes(): HeroContextData {
  const context = useContext(HeroContext)

  return context
}