import { heroui } from "@heroui/react";

export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        // ต้องมีบรรทัดนี้ ไม่งั้น CSS ของ HeroUI จะไม่ทำงาน
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [heroui()]
}