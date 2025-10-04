"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
      <main className="flex flex-col gap-8 items-center max-w-2xl">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to PricePOL
          </h1>
          <p className="text-muted-foreground text-lg">
            Select a date from the calendar below
          </p>
        </div>

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
