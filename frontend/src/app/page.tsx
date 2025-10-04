"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ModeToggle } from "@/components/mode-toggle";
import { CombinedStatsChart } from "@/components/combined-stats-chart";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen flex flex-col items-center p-8 bg-background">
      <div className="absolute top-4 right-4">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col items-center gap-4 p-6 rounded-lg border bg-card shadow-sm">
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

          <div className="flex flex-col">
            <CombinedStatsChart />
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            This app uses <strong>Next.js</strong> with{" "}
            <strong>shadcn/ui</strong> components
          </p>
          <p className="text-xs text-muted-foreground">
            Theme support is enabled via the ThemeProvider
          </p>
        </div>
      </main>
    </div>
  );
}
