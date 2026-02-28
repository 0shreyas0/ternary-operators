import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type ActiveSectionContextType = {
  activeSection: string | null;
  setActiveSection: (id: string) => void;
};

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export const ActiveSectionProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};

export const useActiveSection = () => {
  const context = useContext(ActiveSectionContext);
  if (context === undefined) {
    throw new Error('useActiveSection must be used within an ActiveSectionProvider');
  }
  return context;
};

/**
 * Custom hook to observe a section and report its visibility to the Context
 */
export const useSectionObserver = (id: string, ref: React.RefObject<any>) => {
  const { setActiveSection } = useActiveSection();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the section is intersecting the "active band" (defined by rootMargin),
          // we set it as the active section.
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      },
      {
        root: null,
        // Detection band: from 25% to 26% of the viewport height. 
        // A very narrow band prevents multiple sections from being active at once.
        rootMargin: '-25% 0px -74% 0px',
        threshold: 0, 
      }
    );

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [id, ref, setActiveSection]);
};
