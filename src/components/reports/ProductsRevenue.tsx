import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type {ChartConfig} from '@/components/ui/chart'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { top5ProductType } from "@/types/responseTypes"
import { formatCurrency } from "@/lib/formatCurrency"

export const description = "A mixed bar chart"

export function ProductsRevenue({top5RevenueProducts,}: {top5RevenueProducts: top5ProductType[];}) {

  const chartData = top5RevenueProducts.map((p, i) => ({
    productName: p.productName,
    revenue: p.revenue,   
    fill: `var(--chart-${(i % 5) + 1})`, 
  }))

  const chartConfig: ChartConfig = chartData.reduce((acc, item, i) => {
    acc[item.productName] = {
      label: item.productName,
      color: `var(--chart-${(i % 5) + 1})`,
    }
    return acc
  }, {
    revenue: { label: "Revenue-" }
  } as ChartConfig)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products by Revenue</CardTitle>
        <CardDescription>This period’s performance</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 0 }}
          >
            <YAxis
              dataKey="productName"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value: any) => {
                const label = chartConfig[value as keyof typeof chartConfig]?.label;
                return String(label ?? value);
              }}
            />

            <XAxis dataKey="revenue" type="number" hide />

            {/* <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            /> */}
            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (!payload?.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="rounded-md border bg-background p-2 text-sm shadow-md">
                    <div className="font-medium">{data.productName}</div>
                    <div className="text-muted-foreground">
                      {formatCurrency(data.revenue)}
                    </div>
                  </div>
                );
              }}
            />
            <Bar dataKey="revenue" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}
