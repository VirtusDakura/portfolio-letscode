"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  
  // Check if we are on the admin page or any sub-route of it
  const isAdminRoute = pathname?.startsWith("/admin");

  // If it's the admin page, hide the public Navbar and Footer
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Otherwise, show the normal website layout
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ScrollToTop />
    </>
  );
}
