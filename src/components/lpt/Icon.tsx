import {
  TrendingUp,
  BarChart3,
  GraduationCap,
  ClipboardList,
  BookOpen,
  FileText,
  MapPin,
  Info,
  GitCompare,
  Building2,
  Calculator,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";

/**
 * Resolves the string icon names stored in SITE_TREE / MEGA (config has no JSX)
 * to lucide components. Falls back to FileText for unknown names.
 */
const MAP: Record<string, LucideIcon> = {
  TrendingUp,
  BarChart3,
  GraduationCap,
  ClipboardList,
  BookOpen,
  FileText,
  MapPin,
  Info,
  GitCompare,
  Building2,
  Calculator,
  MessagesSquare,
};

export function Icon({
  name,
  className = "h-4 w-4",
  strokeWidth = 1.9,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = MAP[name] ?? FileText;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden />;
}
