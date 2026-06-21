import { headers } from "next/headers";
import { Plus_Jakarta_Sans } from "next/font/google";
import AdminShell from "@/components/admin/AdminShell";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  title: "Huixun Heat Sink CMS - Admin",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const path = h.get("x-pathname") || "";
  const isLogin = path === "/admin/login";

  return (
    <section className={`${plusJakartaSans.variable} admin-root`}>
      {isLogin ? children : <AdminShell>{children}</AdminShell>}
    </section>
  );
}
