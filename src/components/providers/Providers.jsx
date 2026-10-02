"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App as AntApp, ConfigProvider, theme as antTheme } from "antd";
import ThemeProvider, { useTheme } from "./ThemeProvider";
import SmoothScroll from "./SmoothScroll";

function AntdTheme({ children }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <ConfigProvider
      theme={{
        algorithm: dark ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
        token: {
          colorPrimary: dark ? "#b8ff5c" : "#4f8a00",
          colorTextLightSolid: dark ? "#07080b" : "#ffffff",
          borderRadius: 12,
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          colorBgContainer: dark ? "rgba(255,255,255,0.04)" : "#ffffff",
          colorBorder: dark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.14)",
        },
        components: {
          Input: { paddingBlockLG: 12 },
          Button: { primaryShadow: "none", fontWeight: 600 },
        },
      }}
    >
      <AntApp component={false}>{children}</AntApp>
    </ConfigProvider>
  );
}

export default function Providers({ children }) {
  return (
    <AntdRegistry>
      <ThemeProvider>
        <AntdTheme>
          <SmoothScroll>{children}</SmoothScroll>
        </AntdTheme>
      </ThemeProvider>
    </AntdRegistry>
  );
}
