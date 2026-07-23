"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { AuthProvider } from "./auth-provider";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </ThemeProvider>
      <Toaster position="bottom-center" toastOptions={{ duration: 4000 }} />
    </Provider>
  );
}

