import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function UserDashboard() {
  return redirect("/dashboard/create-blog");
}
