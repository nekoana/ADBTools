import localFont from "next/font/local";

export const jetBrains = localFont({
  src: [
    {
      path: "/fonts/JetBrainsMono-Bold.woff2",
      style: "blod",
    },
    {
      path: "/fonts/JetBrainsMono-BoldItalic.woff2",
      style: "italic",
    },
  ],
  display: "swap",
});
