"use client";

import * as React from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChartDataItem {
  date: string;
  month: string;
  occupation: number;
  revenue: number;
  actualRevenue: number;
}

// Hardcoded monthly data for the last 12 months
function generateMonthlyData(): ChartDataItem[] {
  return [
    {
      date: "2024-01-01",
      month: "January",
      occupation: 55,
      revenue: 95,
      actualRevenue: 9500,
    },
    {
      date: "2024-02-01",
      month: "February",
      occupation: 52,
      revenue: 88,
      actualRevenue: 8800,
    },
    {
      date: "2024-03-01",
      month: "March",
      occupation: 48,
      revenue: 82,
      actualRevenue: 8200,
    },
    {
      date: "2024-04-01",
      month: "April",
      occupation: 58,
      revenue: 102,
      actualRevenue: 10200,
    },
    {
      date: "2024-05-01",
      month: "May",
      occupation: 65,
      revenue: 118,
      actualRevenue: 11800,
    },
    {
      date: "2024-06-01",
      month: "June",
      occupation: 78,
      revenue: 152,
      actualRevenue: 15200,
    },
    {
      date: "2024-07-01",
      month: "July",
      occupation: 85,
      revenue: 178,
      actualRevenue: 17800,
    },
    {
      date: "2024-08-01",
      month: "August",
      occupation: 88,
      revenue: 185,
      actualRevenue: 18500,
    },
    {
      date: "2024-09-01",
      month: "September",
      occupation: 72,
      revenue: 138,
      actualRevenue: 13800,
    },
    {
      date: "2024-10-01",
      month: "October",
      occupation: 62,
      revenue: 112,
      actualRevenue: 11200,
    },
    {
      date: "2024-11-01",
      month: "November",
      occupation: 58,
      revenue: 98,
      actualRevenue: 9800,
    },
    {
      date: "2024-12-01",
      month: "December",
      occupation: 68,
      revenue: 128,
      actualRevenue: 12800,
    },
  ];
}

const chartConfig = {
  occupation: {
    label: "Occupation",
    color: "var(--chart-1)",
  },
  revenue: {
    label: "Revenue",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function CombinedStatsChart() {
  const [timeRange, setTimeRange] = React.useState("12");
  const [allData, setAllData] = React.useState<ChartDataItem[]>([]);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setAllData(generateMonthlyData());
    setMounted(true);
  }, []);

  const filteredData = React.useMemo(() => {
    if (!mounted || allData.length === 0) return [];

    let monthsToShow = 12;

    if (timeRange === "6") {
      monthsToShow = 6;
    } else if (timeRange === "3") {
      monthsToShow = 3;
    }

    return allData.slice(-monthsToShow);
  }, [allData, timeRange, mounted]);

  if (!mounted) {
    return null;
  }

  // Calculate statistics
  const totalRevenue = filteredData.reduce(
    (sum, item) => sum + item.actualRevenue,
    0,
  );
  const averageOccupation = Math.round(
    filteredData.reduce((sum, item) => sum + item.occupation, 0) /
      filteredData.length,
  );

  const halfwayPoint = Math.floor(filteredData.length / 2);
  const recentAvgOccupation =
    filteredData
      .slice(halfwayPoint)
      .reduce((sum, item) => sum + item.occupation, 0) /
    (filteredData.length - halfwayPoint);
  const previousAvgOccupation =
    filteredData
      .slice(0, halfwayPoint)
      .reduce((sum, item) => sum + item.occupation, 0) / halfwayPoint;
  const occupationTrend =
    ((recentAvgOccupation - previousAvgOccupation) / previousAvgOccupation) *
    100;

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Occupation & Revenue Statistics</CardTitle>
          <CardDescription>
            Showing statistics for the selected period
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last 12 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="12" className="rounded-lg">
              Last 12 months
            </SelectItem>
            <SelectItem value="6" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="3" className="rounded-lg">
              Last 3 months
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart accessibilityLayer data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
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
              labelFormatter={(value) => value}
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
        <div className="flex gap-2 font-medium leading-none">
          Trending {occupationTrend > 0 ? "up" : "down"} by{" "}
          {Math.abs(occupationTrend).toFixed(1)}% in selected period{" "}
          <TrendingUp
            className={`h-4 w-4 ${occupationTrend > 0 ? "" : "rotate-180"}`}
          />
        </div>
        <div className="leading-none text-muted-foreground">
          Total revenue: {totalRevenue.toLocaleString("pl-PL")} zł | Avg
          occupation: {averageOccupation}%
        </div>
      </CardFooter>
    </Card>
  );
}
