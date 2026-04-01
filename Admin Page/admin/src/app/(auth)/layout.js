// import dynamic from "next/dynamic";
// const AppLayout = dynamic(() => import("@/layouts"), {
//   ssr: false,
// });

import AppLayout from "@/layouts";

export default function RootLayout({ children }) {
  return <AppLayout>{children}</AppLayout>;
}
