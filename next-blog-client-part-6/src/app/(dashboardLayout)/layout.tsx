import { DashboardLayoutClient } from "@/components/layout/dashboard-layout";

export default function DashboardLayout({
  admin,
  user,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  return <DashboardLayoutClient admin={admin} user={user} />;
}
