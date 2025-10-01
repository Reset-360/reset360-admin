import AppSidebar from '@/src/components/layout/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/src/components/ui/sidebar';
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
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
