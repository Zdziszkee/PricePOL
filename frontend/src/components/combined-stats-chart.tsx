"use client";

import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartDataItem {
  month: string;
  occupation: number;
  revenue: number;
  actualRevenue: number;
  year: number;
}

// Generate combined data for the last 12 months
function generateCombinedData(): ChartDataItem[] {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const data: ChartDataItem[] = [];

  for (let i = 11; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;

    // Generate realistic booking percentages and revenue
    let occupation: number;
    let actualRevenue: number;

    if (monthIndex >= 5 && monthIndex <= 8) {
      // Summer months (June-September)
      occupation = Math.floor(Math.random() * 30) + 60;
      actualRevenue = Math.floor(Math.random() * 10000) + 15000;
    } else if (monthIndex === 11 || monthIndex <= 1) {
      // Winter months (December-February)
      occupation = Math.floor(Math.random() * 25) + 50;
      actualRevenue = Math.floor(Math.random() * 8000) + 10000;
    } else {
      // Spring/Fall months
      occupation = Math.floor(Math.random() * 30) + 40;
      actualRevenue = Math.floor(Math.random() * 8000) + 8000;
    }

    data.push({
      month: months[monthIndex],
      occupation,
      revenue: Math.round(actualRevenue / 100), // Scale down for display
      actualRevenue,
      year,
    });
  }

  return data;
}

const chartConfig = {
  occupation: {
    label: "Occupation",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CombinedStatsChart() {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setChartData(generateCombinedData());
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Calculate totals and trends
  const totalRevenue = chartData.reduce(
    (sum, item) => sum + item.actualRevenue,
    0,
  );
  const averageOccupation = Math.round(
    chartData.reduce((sum, item) => sum + item.occupation, 0) /
      chartData.length,
  );

  const recentRevenueAvg =
    chartData.slice(-3).reduce((sum, item) => sum + item.actualRevenue, 0) / 3;
  const previousRevenueAvg =
    chartData.slice(-6, -3).reduce((sum, item) => sum + item.actualRevenue, 0) /
    3;
  const revenueTrend =
    ((recentRevenueAvg - previousRevenueAvg) / previousRevenueAvg) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Occupation & Revenue Statistics</CardTitle>
        <CardDescription>Last 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
              formatter={(value, name) => {
                if (name === "revenue") {
                  const actualValue = Number(value) * 100;
                  return [
                    `${actualValue.toLocaleString("pl-PL")} zł`,
                    "Revenue",
                  ];
                }
                return [`${value}%`, "Occupation"];
              }}
            />
            <Bar
              dataKey="occupation"
              fill="var(--color-occupation)"
              radius={4}
            />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending {revenueTrend > 0 ? "up" : "down"} by{" "}
          {Math.abs(revenueTrend).toFixed(1)}% this quarter{" "}
          <TrendingUp
            className={`h-4 w-4 ${revenueTrend > 0 ? "" : "rotate-180"}`}
          />
        </div>
        <div className="text-muted-foreground leading-none">
          Total revenue: {totalRevenue.toLocaleString("pl-PL")} zł | Avg
          occupation: {averageOccupation}%
        </div>
      </CardFooter>
    </Card>
  );
}
