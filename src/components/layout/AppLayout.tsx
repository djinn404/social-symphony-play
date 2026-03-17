import { ReactNode } from "react";
import SpaceSidebar from "./SpaceSidebar";
import BottomDock from "./BottomDock";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <SpaceSidebar />
      <main className="flex-1 overflow-y-auto pb-16">
        {children}
      </main>
      <BottomDock />
    </div>
  );
}
