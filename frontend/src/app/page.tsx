"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeSelector } from "@/components/theme-selector";
import { CombinedStatsChart } from "@/components/combined-stats-chart";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());

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

        <div className="flex flex-col items-center gap-4 p-6 rounded-lg border bg-card shadow-sm max-w-md">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md"
          />

          {date && (
            <div className="text-center pt-4 border-t w-full">
              <p className="text-sm text-muted-foreground">Selected date:</p>
              <p className="text-lg font-semibold">
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
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
