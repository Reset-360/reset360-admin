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
} from 'lucide-react';
import { PageHeader } from '@/src/components/layout/page-header';
import { ResultStatCard } from './components/ResultStatCard';

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

  useEffect(() => {
    Promise.all([
      api.get('/seat-batches/stats'),
      api.get('/assessments/stats/completed'),
    ])
      .then(([seatsRes, assessmentsRes]) => {
        setSeatStats(seatsRes.data);
        setResults(assessmentsRes.data);
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
            <ResultStatCard
              icon={Users}
              iconColor="text-primary"
              iconBg="bg-primary/10"
              label="Total Assessments"
              value={results.totalCompleted}
            />
            <ResultStatCard
              icon={Shield}
              iconColor="text-emerald-400"
              iconBg="bg-emerald-500/10"
              label="Low Risk"
              value={results.lowRisk}
              valueColor="text-emerald-400"
            />
            <ResultStatCard
              icon={TrendingUp}
              iconColor="text-amber-400"
              iconBg="bg-amber-500/10"
              label="Medium Risk"
              value={results.mediumRisk}
              valueColor="text-amber-400"
            />
            <ResultStatCard
              icon={AlertTriangle}
              iconColor="text-red-400"
              iconBg="bg-red-500/10"
              label="High Risk"
              value={results.highRisk}
              valueColor="text-red-400"
            />
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
