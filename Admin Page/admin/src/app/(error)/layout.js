import dynamic from "next/dynamic";
const AppLayout = dynamic(() => import("@/layouts"), {
  ssr: false,
});

export default function RootLayout({ children }) {
  return <AppLayout>{children}</AppLayout>;
}
