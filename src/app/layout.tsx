"use client";

import { createContext, useContext, useRef } from "react";
import Navbar from "./Components/navbar";
import { ScrollDirectionProvider } from "./Contexts/scrollDirection";
import { Lenisprovider } from "./Contexts/LenisContexts";

const AnimationContext = createContext<AnimationContextType>({
  isReady: false,
  hasAnimated: false,
  setHasAnimated: () => {},
});

export const useAnimationReady = () => useContext(AnimationContext);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <html lang="en">
      <body>
        <Lenisprovider>
          <main ref={contentRef} className="main_content">
            <ScrollDirectionProvider>
              {/* <Navbar /> */}
              {children}
            </ScrollDirectionProvider>
          </main>
        </Lenisprovider>
      </body>
    </html>
  );
}
