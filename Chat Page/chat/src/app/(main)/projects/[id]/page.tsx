"use client";

import React from "react";
import ProjectDetailView from "@/views/ProjectDetailView";
import { useParams } from "next/navigation";

export default function ProjectDetailPage() {
    const params = useParams();
    const id = params.id as string;

    return <ProjectDetailView projectId={id} />;
}
