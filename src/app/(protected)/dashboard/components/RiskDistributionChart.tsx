import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface RiskData {
  lowRisk: number;
  mediumRisk: number;
  highRisk: number;
}

interface RiskDistributionChartProps {
  data: RiskData;
}

const COLORS = {
  low: 'hsl(160, 84%, 39%)',
  medium: 'hsl(45, 93%, 47%)',
  high: 'hsl(0, 72%, 51%)',
};

function RiskDistributionChart({ data }: RiskDistributionChartProps) {
  const chartData = [
    { name: 'Low Risk', value: data.lowRisk, color: COLORS.low },
    { name: 'Medium Risk', value: data.mediumRisk, color: COLORS.medium },
    { name: 'High Risk', value: data.highRisk, color: COLORS.high },
  ].filter((item) => item.value > 0);

  const total = data.lowRisk + data.mediumRisk + data.highRisk;

  // If all values are 0, show a placeholder
  if (total === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(220, 20%, 10%)',
                border: '1px solid hsl(220, 15%, 18%)',
                borderRadius: '8px',
                color: 'hsl(210, 20%, 95%)',
              }}
              formatter={(value: number) => [`${value} assessments`, '']}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">{total}</p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-6">
        {[
          { label: 'Low', color: COLORS.low, value: data.lowRisk },
          { label: 'Medium', color: COLORS.medium, value: data.mediumRisk },
          { label: 'High', color: COLORS.high, value: data.highRisk },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-muted-foreground">
              {item.label}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RiskDistributionChart;
