import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className="h-screen w-full bg-background">{children}</div>;
};

export default Layout;
