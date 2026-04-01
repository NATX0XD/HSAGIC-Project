import { MainLayout } from "@/layouts";

export default function MainGroupLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MainLayout>{children}</MainLayout>;
}
