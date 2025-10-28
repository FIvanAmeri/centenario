"use client";

import React from "react";

const CheckIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);


const WarningIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.375c.83 1.579 2.51 2.22 4.204 1.272 1.48-.829 2.982-1.272 4.549-1.272s3.07.443 4.549 1.272c1.694.948 3.374.307 4.204-1.272C21.942 14.545 22 13.784 22 13.007c0-1.206-.06-2.404-.176-3.585.086-1.173.076-2.352-.02-3.518C21.725 3.5 20.317 2 18.736 2H5.264C3.683 2 2.275 3.5 2.076 6.004c-.096 1.166-.106 2.345-.02 3.518-.116 1.181-.176 2.379-.176 3.585 0 .777.058 1.538.172 2.285Z" />
  </svg>
);


const CloseIcon = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);


interface AlertMessageProps {
  message: string | null;
  type: "success" | "error";
  onClose: () => void;
}

const baseClasses = "flex items-center p-4 rounded-xl shadow-lg transition-all duration-300 transform";

const styles = {
  success: {
    bg: "bg-green-100 border border-green-300",
    text: "text-green-800",
    icon: CheckIcon, 
    iconColor: "text-green-500",
    title: "Registro Exitoso",
  },
  error: {
    bg: "bg-red-100 border border-red-300",
    text: "text-red-800",
    icon: WarningIcon, 
    iconColor: "text-red-500",
    title: "Error de Formulario",
  },
};

export default function AlertMessage({ message, type, onClose }: AlertMessageProps) {
  if (!message) return null;

  const style = styles[type];
  const Icon = style.icon;

  return (
    <div 
        className={`${baseClasses} ${style.bg} ${style.text} max-w-lg mx-auto mb-6`}
        role="alert"
    >
      <Icon className={`h-6 w-6 mr-3 flex-shrink-0 ${style.iconColor}`} aria-hidden="true" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">{style.title}</h3>
        <p className="text-sm">{message}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className={`ml-4 p-1 rounded-full ${style.iconColor} hover:bg-gray-200/50 transition`}
        aria-label="Cerrar alerta"
      >
        <CloseIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
