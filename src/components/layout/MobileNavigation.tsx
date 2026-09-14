"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, ChevronDown } from "lucide-react";
import type { NavItem } from "@/lib/types";
import { Button } from "@/components/ui/Button";

export function MobileNavigation({
  items,
  open,
  onClose,
}: {
  items: NavItem[];
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Site navigation">
      <button
        aria-label="Close navigation"
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-paper-raised border-l rule flex flex-col"
      >
        <div className="flex items-center justify-between px-5 py-5 border-b rule">
          <span className="font-display text-lg">Menu</span>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="p-2 -mr-2 rounded-[3px] hover:bg-stone"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-4">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.label} className="border-b rule py-1">
                {item.children ? (
                  <>
                    <button
                      className="w-full flex items-center justify-between py-3 text-left font-display text-lg"
                      aria-expanded={expanded === item.label}
                      onClick={() =>
                        setExpanded(expanded === item.label ? null : item.label)
                      }
                    >
                      {item.label}
                      <ChevronDown
                        size={18}
                        className={`transition-transform ${expanded === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {expanded === item.label && (
                      <ul className="pb-3 pl-1 flex flex-col gap-1">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className="block py-2 text-ink-soft hover:text-ink"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-3 font-display text-lg"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-5 py-5 border-t rule">
          <Button href="/get-involved" onClick={onClose} className="w-full">
            Get Involved
          </Button>
        </div>
      </div>
    </div>
  );
}
