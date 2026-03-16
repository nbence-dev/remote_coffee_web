import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAdmin = Boolean(cookieStore.get(ADMIN_SESSION_COOKIE));
  return (
    <div>
      {" "}
      {isAdmin ? <h1>You are already logged in.</h1> : <AdminLoginForm />}
    </div>
  );
}
