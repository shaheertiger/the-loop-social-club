import Image from "next/image";
import floorPlan from "../../public/photos/floor-plan.jpg";

/** Hero panel: the club's floor plan, shown whole so its numbered legend stays readable. */
export function HeroVisual() {
  return (
    <figure className="m-0 overflow-hidden rounded-[28px] border border-cream/15 bg-[#f6f1e8]">
      <Image
        src={floorPlan}
        alt="Floor plan of The Loop Social: 6 pickleball courts, 2 cricket training lanes, a café and lounge, reception, washrooms and lockers, and a private events room"
        priority
        placeholder="blur"
        sizes="(min-width: 1200px) 560px, (min-width: 768px) 46vw, 100vw"
        className="block h-auto w-full"
      />
    </figure>
  );
}
