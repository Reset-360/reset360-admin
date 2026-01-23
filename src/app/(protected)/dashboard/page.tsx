'use client';

import { Main } from '@/src/components/layout/main';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import TotalSeatsIssued, { QuickStatCard } from './components/QuickStatCard';
import api from '@/src/lib/axios';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Armchair,
  PackagePlus,
  Shield,
  TicketCheck,
  TicketSlash,
  TrendingUp,
  Users,
  XCircle,
} from 'lucide-react';
import { PageHeader } from '@/src/components/layout/page-header';
import StatCard from './components/StatCard';
import RiskDistributionChart from './components/RiskDistributionChart';
import TrendChart from './components/TrendChart';

type TrendStat = {
  date: string;
  lowRisk: number;
  mediumRisk: number;
  highRisk: number;
};

const DEFAULT_TREND_STATS: TrendStat[] = [
  { date: 'Jan', lowRisk: 0, mediumRisk: 0, highRisk: 0 },
  { date: 'Feb', lowRisk: 0, mediumRisk: 0, highRisk: 0 },
  { date: 'Mar', lowRisk: 0, mediumRisk: 0, highRisk: 0 },
  { date: 'Apr', lowRisk: 0, mediumRisk: 0, highRisk: 0 },
  { date: 'May', lowRisk: 0, mediumRisk: 0, highRisk: 0 },
  { date: 'Jun', lowRisk: 0, mediumRisk: 0, highRisk: 0 },
  { date: 'Jul', lowRisk: 0, mediumRisk: 0, highRisk: 0 },
  { date: 'Aug', lowRisk: 0, mediumRisk: 0, highRisk: 0 },
  { date: 'Sep', lowRisk: 0, mediumRisk: 0, highRisk: 0 },
  { date: 'Oct', lowRisk: 0, mediumRisk: 0, highRisk: 0 },
  { date: 'Nov', lowRisk: 0, mediumRisk: 0, highRisk: 0 },
  { date: 'Dec', lowRisk: 0, mediumRisk: 0, highRisk: 0 },
];

export default function DashboardPage() {
  const [results, setResults] = useState({
    totalCompleted: 0,
    lowRisk: 0,
    mediumRisk: 0,
    highRisk: 0,
  });

  const [seatStats, setSeatStats] = useState({
    totalSeatsOrdered: 0,
    totalSeatsIssued: 0,
    totalSeatsRedeemed: 0,
    totalSeatsNotRedeemed: 0,
  });

  const [trendStats, setTrendStats] =
    useState<TrendStat[]>(DEFAULT_TREND_STATS);

  useEffect(() => {
    Promise.all([
      api.get('/seat-batches/stats'),
      api.get('/assessments/stats/completed'),
      api.get('/assessments/stats/risk-trend'),
    ])
      .then(([seatsRes, assessmentsRes, trendRes]) => {
        setSeatStats(seatsRes.data);
        setResults(assessmentsRes.data);
        setTrendStats(trendRes.data);
      })
      .catch(() => toast.error('Error fetching stats data'));
  }, []);

  return (
    <Main>
      <PageHeader
        title="Dashboard"
        subtitle="Central hub for administration, insights, and evolving controls."
      />

      <Tabs
        orientation="vertical"
        defaultValue="overview"
        className="space-y-4"
      >
        <div className="w-full overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              Analytics
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Cards */}
          <p className="tracking-widest font-bold text-md">ADAPTS Results</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Assessments"
              value={results.totalCompleted}
              icon={Users}
              variant="default"
            />
            <StatCard
              title="Low Risk"
              value={results.lowRisk}
              icon={Shield}
              variant="low"
            />
            <StatCard
              title="Medium Risk"
              value={results.mediumRisk}
              icon={AlertTriangle}
              variant="medium"
            />
            <StatCard
              title="High Risk"
              value={results.highRisk}
              icon={XCircle}
              variant="high"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-5">
            {/* Risk Distribution */}
            <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Risk Distribution
              </h2>
              <div className="h-[280px]">
                <RiskDistributionChart data={results} />
              </div>
            </div>

            {/* Trend Over Time */}
            <div className="rounded-xl border border-border bg-card p-6 lg:col-span-3">
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                Assessment Trends
              </h2>
              <div className="h-[280px]">
                <TrendChart data={trendStats} />
              </div>
            </div>
          </div>

          {/* Seat Stats */}
          <p className="tracking-widest font-bold text-md">Seat Codes Stats</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <QuickStatCard
              title="Total Seats Ordered"
              icon={<PackagePlus />}
              value={seatStats.totalSeatsOrdered}
            />
            <QuickStatCard
              title="Total Seats Issued"
              icon={<Armchair />}
              value={seatStats.totalSeatsIssued}
            />
            <QuickStatCard
              title="Total Redeemed Seats"
              icon={<TicketCheck />}
              value={seatStats.totalSeatsRedeemed}
            />

            <QuickStatCard
              title="Total Unclaimed Seats"
              icon={<TicketSlash />}
              value={seatStats.totalSeatsNotRedeemed}
            />
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <Card className="col-span-1 lg:col-span-4">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent className="ps-2"></CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </Main>
  );
}
