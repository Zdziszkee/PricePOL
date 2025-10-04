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

// Generate monthly data for the last 12 months
function generateMonthlyData(): ChartDataItem[] {
  const data: ChartDataItem[] = [];
  const today = new Date();
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

  for (let i = 11; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(date.getMonth() - i);
    date.setDate(1); // First day of month

    const monthIndex = date.getMonth();

    // Higher occupation in summer months
    const isSummer = monthIndex >= 5 && monthIndex <= 8;
    const isWinter = monthIndex === 11 || monthIndex <= 1;

    let baseOccupation = 45;
    if (isSummer) baseOccupation += 25;
    if (isWinter) baseOccupation += 10;

    const occupation = Math.min(
      95,
      baseOccupation + Math.floor(Math.random() * 20),
    );
    const actualRevenue = Math.floor(occupation * (Math.random() * 100 + 150));

    data.push({
      date: date.toISOString().split("T")[0],
      month: months[monthIndex],
      occupation,
      revenue: Math.round(actualRevenue / 10), // Scale for display
      actualRevenue,
    });
  }

  return data;
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
                  const actualValue = Number(value) * 10;
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
