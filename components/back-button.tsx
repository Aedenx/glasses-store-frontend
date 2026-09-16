import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackButton({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[2px] text-white/70 transition duration-300 hover:border-emerald-400/60 hover:bg-emerald-400/10 hover:text-emerald-300"
    >
      <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
      {label}
    </Link>
  );
}