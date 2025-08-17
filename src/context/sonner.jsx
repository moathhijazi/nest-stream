"use client";

import React, { createContext, useContext } from "react";
import { Toaster, toast } from "sonner";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <Toaster
        position="top-center"
        closeButton
        
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context.toast;
}
