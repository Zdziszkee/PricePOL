"use client";

import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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

// Generate data for the last 12 months
function generateMonthlyData() {
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

  const data = [];

  for (let i = 11; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12;
    const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;

    // Generate realistic booking percentages (higher in summer months)
    let percentage;
    if (monthIndex >= 5 && monthIndex <= 8) {
      // Summer months (June-September): 60-90%
      percentage = Math.floor(Math.random() * 30) + 60;
    } else if (monthIndex === 11 || monthIndex <= 1) {
      // Winter months (December-February): 50-75%
      percentage = Math.floor(Math.random() * 25) + 50;
    } else {
      // Spring/Fall months: 40-70%
      percentage = Math.floor(Math.random() * 30) + 40;
    }

    data.push({
      month: months[monthIndex],
      percentage,
      year,
    });
  }

  return data;
}

const chartConfig = {
  percentage: {
    label: "Booked",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function BookingStatsChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setChartData(generateMonthlyData());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Booking Statistics</CardTitle>
          <CardDescription>
            Percentage of days booked - Last 12 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex aspect-video items-center justify-center text-muted-foreground">
            Loading...
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate average booking rate
  const averageBooking = Math.round(
    chartData.reduce((sum, item) => sum + item.percentage, 0) /
      chartData.length,
  );

  // Calculate trend (comparing last 3 months vs previous 3 months)
  const recentAvg =
    chartData.slice(-3).reduce((sum, item) => sum + item.percentage, 0) / 3;
  const previousAvg =
    chartData.slice(-6, -3).reduce((sum, item) => sum + item.percentage, 0) / 3;
  const trend = ((recentAvg - previousAvg) / previousAvg) * 100;
  const isTrendingUp = trend > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Statistics</CardTitle>
        <CardDescription>
          Percentage of days booked - Last 12 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="percentage" fill="var(--color-percentage)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => `${value}%`}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {isTrendingUp ? "Trending up" : "Trending down"} by{" "}
          {Math.abs(trend).toFixed(1)}% this quarter
          <TrendingUp
            className={`h-4 w-4 ${isTrendingUp ? "" : "rotate-180"}`}
          />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing booking percentage for the last 12 months (avg:{" "}
          {averageBooking}%)
        </div>
      </CardFooter>
    </Card>
  );
}
