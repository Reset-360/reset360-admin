import { Header } from '@/src/components/layout/header';
import AppSidebar from '@/src/components/layout/sidebar';
import { ThemeModeToggle } from '@/src/components/layout/theme-mode-toggle';
import { ProfileDropdown } from '@/src/components/profile-dropdown';
import { SidebarProvider } from '@/src/components/ui/sidebar';
import ProtectedRoute from '@/src/lib/protected-route';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />

        <main className="w-full">
          <Header>
            <div className="ms-auto flex items-center space-x-4">
              <ThemeModeToggle />
              <ProfileDropdown />
            </div>
          </Header>

          {children}
        </main>
      </SidebarProvider>
    </ProtectedRoute>
  );
}
