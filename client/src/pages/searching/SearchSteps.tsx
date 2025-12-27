import { CheckCircle2, Loader2 } from "lucide-react";
import { Step } from "./types";

interface SearchStepsProps {
  steps: Step[];
}

export default function SearchSteps({ steps }: SearchStepsProps) {
  return (
    <div className="space-y-6 text-left mb-8 transform-gpu">
      {steps.map((step, index) => (
        <div
          key={index}
          className="flex items-center gap-3 transition-all duration-300"
        >
          <StepIcon status={step.status} />
          <span
            className={`text-sm font-medium transition-colors duration-300 ${
              step.status === "completed"
                ? "text-gray-700"
                : step.status === "active"
                ? "text-[#00Cba9] font-semibold"
                : "text-gray-400"
            }`}
          >
            {step.text}
          </span>
        </div>
      ))}
    </div>
  );
}

function StepIcon({ status }: { status: Step["status"] }) {
  if (status === "completed") {
    return (
      <div className="bg-[#00Cba9] rounded-full p-0.5 animate-in zoom-in duration-300">
        <CheckCircle2 className="h-4 w-4 text-white" />
      </div>
    );
  }

  if (status === "active") {
    return (
      <div className="relative rounded-full p-0.5 bg-[#00Cba9]/15">
        {/* halo leve (sem ping) */}
        <div className="absolute inset-0 rounded-full ring-2 ring-[#00Cba9]/20" />

        {/* spinner SEM motion-safe (sempre gira) */}
        <Loader2
          className="relative h-4 w-4 text-[#00Cba9] animate-spin transform-gpu will-change-transform"
          style={{ animationDuration: "800ms" }}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-full p-0.5">
      <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
    </div>
  );
}
