"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import HistorialSolicitudesMedico from "@/components/dashboard/HistorialSolicitudesMedico";

export default function PageHistorial() {
  return (
    <DashboardLayout>
      <HistorialSolicitudesMedico />
    </DashboardLayout>
  );
}