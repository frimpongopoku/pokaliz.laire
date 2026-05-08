import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-screen bg-[#0D0B0E] overflow-hidden"
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
