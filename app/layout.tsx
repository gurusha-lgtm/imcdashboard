import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopBar } from '@/components/dashboard/TopBar';
import { TaskStoreProvider } from '@/lib/store';
import { AuthProvider } from '@/lib/auth';
import { AppShell } from '@/components/dashboard/AppShell';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IMC 2026 — Project Dashboard',
  description: 'India Mobile Congress 2026 Event Management Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <AuthProvider>
          <TaskStoreProvider>
            <AppShell>
              <div className="flex min-h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <TopBar />
                  <main className="flex-1 overflow-auto">
                    {children}
                  </main>
                </div>
              </div>
            </AppShell>
          </TaskStoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
