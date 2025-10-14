"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SolicitudesMedico from "@/components/dashboard/SolicitudesMedico";

export default function PageSolicitudes() {
  return (
    <DashboardLayout>
      <SolicitudesMedico />
    </DashboardLayout>
  );
}