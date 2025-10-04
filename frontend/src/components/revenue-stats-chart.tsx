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
function generateMonthlyRevenueData() {
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

    // Generate realistic revenue in PLN (higher in summer months)
    let revenue;
    if (monthIndex >= 5 && monthIndex <= 8) {
      // Summer months (June-September): 15000-25000 PLN
      revenue = Math.floor(Math.random() * 10000) + 15000;
    } else if (monthIndex === 11 || monthIndex <= 1) {
      // Winter months (December-February): 10000-18000 PLN
      revenue = Math.floor(Math.random() * 8000) + 10000;
    } else {
      // Spring/Fall months: 8000-16000 PLN
      revenue = Math.floor(Math.random() * 8000) + 8000;
    }

    data.push({
      month: months[monthIndex],
      revenue,
      year,
    });
  }

  return data;
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function RevenueStatsChart() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setChartData(generateMonthlyRevenueData());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Revenue Statistics</CardTitle>
          <CardDescription>
            Monthly revenue in PLN - Last 12 months
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

  // Calculate average revenue
  const averageRevenue = Math.round(
    chartData.reduce((sum, item) => sum + item.revenue, 0) / chartData.length,
  );

  // Calculate trend (comparing last 3 months vs previous 3 months)
  const recentAvg =
    chartData.slice(-3).reduce((sum, item) => sum + item.revenue, 0) / 3;
  const previousAvg =
    chartData.slice(-6, -3).reduce((sum, item) => sum + item.revenue, 0) / 3;
  const trend = ((recentAvg - previousAvg) / previousAvg) * 100;
  const isTrendingUp = trend > 0;

  // Calculate total revenue
  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Statistics</CardTitle>
        <CardDescription>
          Monthly revenue in PLN - Last 12 months
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
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: any) => `${(value / 1000).toFixed(1)}k zł`}
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
          Total revenue: {totalRevenue.toLocaleString("pl-PL")} zł (avg:{" "}
          {averageRevenue.toLocaleString("pl-PL")} zł/month)
        </div>
      </CardFooter>
    </Card>
  );
}
