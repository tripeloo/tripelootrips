/** Smooth transition from hero into the next section. */
export function LandingWave({ variant = "sand" }: { variant?: "sand" | "mist" }) {
  const textClass = variant === "sand" ? "text-landing-sandDeep" : "text-landing-mistDeep";
  return (
    <div className={`relative w-full -mt-px leading-[0] ${textClass}`} aria-hidden>
      <svg
        className="block h-10 w-full sm:h-14"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M0 56V24c180 18 360 28 540 18s360-28 540-14 270 14 360 18v10H0z"
        />
      </svg>
    </div>
  );
}
