import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO_SRC } from "@/lib/brand";

type Props = {
  /** Header (compact) vs footer (larger) */
  variant?: "header" | "footer";
  className?: string;
  priority?: boolean;
};

const heights = {
  header: "h-8 sm:h-9",
  footer: "h-10 sm:h-11",
};

export function BrandLogo({ variant = "header", className = "", priority = false }: Props) {
  const h = heights[variant];
  return (
    <Link
      href="/"
      className={`inline-flex items-center shrink-0 min-w-0 ${className}`}
      aria-label="Tripeloo Trips home"
    >
      <Image
        src={BRAND_LOGO_SRC}
        alt="Tripeloo Trips"
        width={220}
        height={56}
        priority={priority}
        className={`w-auto ${h} max-w-[min(200px,55vw)] object-contain object-left`}
      />
    </Link>
  );
}
