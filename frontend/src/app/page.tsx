"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { ThemeSelector } from "@/components/theme-selector";
import { CombinedStatsChart } from "@/components/combined-stats-chart";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-background">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ThemeSelector />
        <ModeToggle />
      </div>
      <main className="flex flex-col gap-8 items-center w-full max-w-6xl py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to PricePOL
          </h1>
          <p className="text-muted-foreground text-lg">
            Select a date from the calendar below
          </p>
        </div>

        <div className="w-full">
          <CombinedStatsChart />
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            This app uses <strong>Next.js</strong> with{" "}
            <strong>shadcn/ui</strong> components
          </p>
          <p className="text-xs text-muted-foreground">
            Dark/Light mode and color theme support enabled
          </p>
        </div>
      </main>
    </div>
  );
}
