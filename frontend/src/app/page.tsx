"use client";

import { CombinedStatsChart } from "@/components/combined-stats-chart";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4">
        <div className="flex flex-col gap-8 max-w-6xl mx-auto">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground text-lg">
              Overview of your property statistics and revenue
            </p>
          </div>

          <div className="w-full">
            <CombinedStatsChart />
          </div>
        </div>
      </main>
    </div>
  );
}
