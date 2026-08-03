"use client";

import { useState } from "react";
import { GlobalHeader } from "./GlobalHeader";
import { GlobalSidenav } from "./GlobalSidenav";

export function PublicNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <GlobalHeader isAdmin={false} onMenuClick={() => setIsMobileMenuOpen(true)} />
      <GlobalSidenav 
        variant="public" 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}
