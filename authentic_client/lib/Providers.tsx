"use client"
import { store } from "@/redux/store";
import { ReactNode } from "react";
import { Provider } from 'react-redux'
import { Toaster } from "sonner";

const ThemeProvider = ({ children }: { children: ReactNode }) => {

  return (
    <Provider store={store}>
      {children}
      <Toaster />
    </Provider>
  );
}
export default ThemeProvider