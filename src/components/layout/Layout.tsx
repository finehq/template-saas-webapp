import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-full bg-background container">{children}</div>
  );
};

export default Layout;
