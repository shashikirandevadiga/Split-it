
import * as React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const NumberInput = React.forwardRef(
  ({ className, value, onChange, step = 1, min, max, ...props }, ref) => {
    const handleIncrement = () => {
      const numericValue = parseFloat(value) || 0;
      const newValue = numericValue + step;
      if (max === undefined || newValue <= max) {
        if (onChange) onChange({ target: { value: String(newValue) } });
      }
    };

    const handleDecrement = () => {
      const numericValue = parseFloat(value) || 0;
      const newValue = numericValue - step;
      if (min === undefined || newValue >= min) {
        if (onChange) onChange({ target: { value: String(newValue) } });
      }
    };

    return (
      <div className={cn("relative group", className)}>
        <Input
          type="number"
          className="pr-8 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          ref={ref}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          {...props}
        />
        <div className="absolute inset-y-0 right-1 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={handleIncrement}
            className="h-1/2 px-2 flex items-center justify-center text-white/70 hover:text-white rounded-tr-md hover:bg-white/10"
            tabIndex={-1}
          >
            <ChevronUp className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            className="h-1/2 px-2 flex items-center justify-center text-white/70 hover:text-white rounded-br-md hover:bg-white/10"
            tabIndex={-1}
          >
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
