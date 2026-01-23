import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface TrendDataPoint {
  date: string;
  lowRisk: number;
  mediumRisk: number;
  highRisk: number;
}

interface TrendChartProps {
  data: TrendDataPoint[];
}

const COLORS = {
  low: 'hsl(160, 84%, 39%)',
  medium: 'hsl(45, 93%, 47%)',
  high: 'hsl(0, 72%, 51%)',
};

function TrendChart({ data }: TrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="gradientLow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.low} stopOpacity={0.3} />
            <stop offset="95%" stopColor={COLORS.low} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradientMedium" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.medium} stopOpacity={0.3} />
            <stop offset="95%" stopColor={COLORS.medium} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradientHigh" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.high} stopOpacity={0.3} />
            <stop offset="95%" stopColor={COLORS.high} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
        <XAxis
          dataKey="date"
          tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 12 }}
          tickLine={{ stroke: 'hsl(220, 15%, 18%)' }}
          axisLine={{ stroke: 'hsl(220, 15%, 18%)' }}
        />
        <YAxis
          tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 12 }}
          tickLine={{ stroke: 'hsl(220, 15%, 18%)' }}
          axisLine={{ stroke: 'hsl(220, 15%, 18%)' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(220, 20%, 10%)',
            border: '1px solid hsl(220, 15%, 18%)',
            borderRadius: '8px',
            color: 'hsl(210, 20%, 95%)',
          }}
        />
        <Area
          type="monotone"
          dataKey="lowRisk"
          stroke={COLORS.low}
          strokeWidth={2}
          fill="url(#gradientLow)"
          name="Low Risk"
        />
        <Area
          type="monotone"
          dataKey="mediumRisk"
          stroke={COLORS.medium}
          strokeWidth={2}
          fill="url(#gradientMedium)"
          name="Medium Risk"
        />
        <Area
          type="monotone"
          dataKey="highRisk"
          stroke={COLORS.high}
          strokeWidth={2}
          fill="url(#gradientHigh)"
          name="High Risk"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default TrendChart;
