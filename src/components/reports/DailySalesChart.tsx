import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis } from "recharts";

// Define the type for a single data point
type DailyRevenue = {
  date: string;      // e.g., "2025-12-01"
  revenue: number;   // e.g., 1200
};

// Props type
type DailySalesChartProps = {
  data: DailyRevenue[];
};

export function DailySalesChart({ data }: DailySalesChartProps) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Daily Sales Revenue</CardTitle>
      </CardHeader>

      <CardContent>
        {/* Pass an empty config if you don't need custom colors/labels */}
        <ChartContainer config={{}}>
          <LineChart width={600} height={300} data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
