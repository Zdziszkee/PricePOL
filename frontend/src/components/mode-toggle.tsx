"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  if (!mounted) {
    return (
      <Button variant="outline" size="icon">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  return (
    <Button variant="outline" size="icon" onClick={cycleTheme}>
      {theme === "light" && (
        <>
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">Switch to dark mode</span>
        </>
      )}
      {theme === "dark" && (
        <>
          <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">Switch to system mode</span>
        </>
      )}
      {theme === "system" && (
        <>
          <Monitor className="h-[1.2rem] w-[1.2rem] transition-all" />
          <span className="sr-only">Switch to light mode</span>
        </>
      )}
    </Button>
  );
}
