import Image from "next/image";
import doubles from "../../public/photos/pickleball-doubles.jpg";

/** Hero panel: a doubles pickleball match, with a caption over a soft fade. */
export function HeroVisual() {
  return (
    <figure className="relative m-0 h-full min-h-[300px] overflow-hidden rounded-[28px] border border-cream/15 bg-navy-deep">
      <Image
        src={doubles}
        alt="Four players in a doubles pickleball match on an indoor court"
        fill
        priority
        placeholder="blur"
        sizes="(min-width: 768px) 46vw, 100vw"
        className="object-cover object-[15%_center]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-navy-deep/90 to-transparent" />
      <figcaption className="absolute right-5 bottom-5 left-5 flex items-center gap-2 text-sm leading-snug font-medium text-cream">
        <span aria-hidden="true" className="size-1.5 flex-none rounded-full bg-orange" />
        6 indoor courts · cricket lanes · café · event space
      </figcaption>
    </figure>
  );
}
