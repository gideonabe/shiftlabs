'use client';

import { useEffect, ReactNode } from "react";
import { MotionConfig } from 'framer-motion';
import { useAuthStore } from "@/store/authStore";

export default function RootLayoutClient({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Hydrate auth state from localStorage on client mount
    useAuthStore.getState().hydrate();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}