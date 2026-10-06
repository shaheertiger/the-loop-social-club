import Image from "next/image";

type LogoProps = {
  tone: "navy" | "cream";
  className?: string;
  priority?: boolean;
};

export function Logo({ tone, className, priority }: LogoProps) {
  return (
    <Image
      src={`/brand/loop-social-logo-${tone}.svg`}
      alt="Loop Social — Pickleball, Cricket, Café"
      width={1690}
      height={510}
      priority={priority}
      className={className}
    />
  );
}
