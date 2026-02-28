import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { PRINCESS_DATA } from '../constants/princesses';

// ── Types ──────────────────────────────────────────────────────────────────────
export interface CollectedPrincess {
  id: number;
  name: string;
  color: string;
  collectedAt: number; // timestamp
}

interface GameContextType {
  collected: Set<number>;
  lastCollected: CollectedPrincess | null;
  collect: (id: number) => void;
  totalCount: number;
  collectedCount: number;
  isComplete: boolean;
}

// ── Context ────────────────────────────────────────────────────────────────────
const GameContext = createContext<GameContextType | null>(null);

const STORAGE_KEY = 'disney-princess-collected';

// ── Provider ───────────────────────────────────────────────────────────────────
export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [collected, setCollected] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set<number>(JSON.parse(saved)) : new Set<number>();
    } catch {
      return new Set<number>();
    }
  });

  const [lastCollected, setLastCollected] = useState<CollectedPrincess | null>(null);

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...collected]));
  }, [collected]);

  const collect = useCallback((id: number) => {
    if (collected.has(id)) return; // already found
    const princess = PRINCESS_DATA[id];
    setCollected(prev => new Set([...prev, id]));
    setLastCollected({ id, name: princess.name, color: princess.color, collectedAt: Date.now() });
    // Clear toast after 3s
    setTimeout(() => setLastCollected(null), 3000);
  }, [collected]);

  return (
    <GameContext.Provider value={{
      collected,
      lastCollected,
      collect,
      totalCount: PRINCESS_DATA.length,
      collectedCount: collected.size,
      isComplete: collected.size === PRINCESS_DATA.length,
    }}>
      {children}
    </GameContext.Provider>
  );
};

// ── Hook ───────────────────────────────────────────────────────────────────────
export const useGame = (): GameContextType => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
};
