import AppSidebar from '@/src/components/layout/sidebar';
import TopNav from '@/src/components/layout/topnav';
import { SidebarProvider } from '@/src/components/ui/sidebar';
import ProtectedRoute from '@/src/lib/protected-route';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full pl-2 pr-4 ">
          <TopNav />

          <div className="py-2">{children}</div>
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
