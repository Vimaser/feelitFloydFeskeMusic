"use client";
import { createContext, useContext, useState } from "react";

const LayoutContext = createContext();
export const useLayout = () => useContext(LayoutContext);

const LayoutProvider = ({ children }) => {
  const [isRTL, setIsRTL] = useState(false);

  const value = {
    isRTL,
    setIsRTL,
  };

  return (
    <LayoutContext.Provider value={value}>
      <div dir={isRTL ? "rtl" : "ltr"}>{children}</div>
    </LayoutContext.Provider>
  );
};
export default LayoutProvider;
