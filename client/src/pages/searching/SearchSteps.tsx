import { CheckCircle2, Loader2 } from "lucide-react";
import { Step } from "./types";

interface SearchStepsProps {
  steps: Step[];
}

export default function SearchSteps({ steps }: SearchStepsProps) {
  return (
    <div className="space-y-6 text-left mb-8">
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
      <div className="bg-[#00Cba9]/20 rounded-full p-0.5 relative">
        <Loader2 className="h-4 w-4 text-[#00Cba9] animate-spin" />
        <div className="absolute inset-0 rounded-full bg-[#00Cba9]/30 animate-ping" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-full p-0.5">
      <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
    </div>
  );
}

