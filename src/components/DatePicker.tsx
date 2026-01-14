"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-day-picker/dist/style.css";

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export default function DatePicker({ date, setDate }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (selected: Date | undefined) => {
    setDate(selected);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ${
          date
            ? "bg-violet-100 text-violet-900 border border-violet-200" // Darker Active State
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900" // Darker Inactive State
        }`}
      >
        <CalendarIcon size={16} />
        {date ? format(date, "MMM d") : ""}
        {date && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setDate(undefined);
            }}
            className="ml-1 text-violet-400 hover:text-red-600 cursor-pointer"
          >
            <X size={14} />
          </span>
        )}
      </button>

      {/* Calendar Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-xl shadow-2xl p-4"
          >
            {/* Added text-gray-900 to wrapper to darken calendar days */}
            <div className="text-gray-900 font-medium">
              <DayPicker
                mode="single"
                selected={date}
                onSelect={handleSelect}
                styles={{
                  head_cell: {
                    width: "40px",
                    color: "#6b7280",
                    fontWeight: "bold",
                  }, // Darker headers
                  table: { maxWidth: "none" },
                  day: { margin: "2px", fontWeight: "500" }, // Thicker font for days
                }}
                modifiersClassNames={{
                  selected:
                    "bg-[var(--accent)] text-white hover:bg-[var(--accent)] rounded-lg font-bold",
                  today: "text-[var(--accent)] font-black text-lg", // Bolder Today
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
