import { useState, useEffect } from "react";
import { useTheme, UseThemeProps } from "next-themes";
import { useHydrate } from "./use-hydrate";

export type Nav = "site" | "page";

export function useNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [nav, setNav] = useState<Nav>("site");
  const { theme, setTheme } = useHydrate<UseThemeProps>(
    useTheme,
    ["dark"],
    ({ fn }) => [fn],
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return {
    menu: {
      get: isMenuOpen,
      set: setIsMenuOpen,
    },
    props: {
      mounted,
      scrolled,
    },
    theme: {
      get: theme,
      set: setTheme,
    },
    nav: {
      get: nav,
      set: setNav,
    },
  };
}
