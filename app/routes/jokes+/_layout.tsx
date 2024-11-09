import { Outlet } from "@remix-run/react";

export default function Layout() {
  return (
    <div className="container mx-auto p-4 max-w-[500px]">
      <Outlet />
    </div>
  );
}
