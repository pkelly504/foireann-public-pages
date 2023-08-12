import { Organization } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export default function ClubList({ clubs }: { clubs: Organization[] }) {
  return (
    <div>
      {clubs.map((club) => (
        <div key={club.id}>
          <h2>{club.name}</h2>
          <Image
            src={club.logo}
            alt={`${club.name} logo`}
            width={200}
            height={200}
          />
          <div>
            <Link href={`/clubs/static-only/${club.id}`}>
              Go to {club.name} Static Only Homepage
            </Link>
          </div>
          <div>
            <Link href={`/clubs/static-hybrid/${club.id}`}>
              Go to {club.name} Static Hybrid Homepage
            </Link>
          </div>
          <div>
            <Link href={`/clubs/static-isr-on-demand-only/${club.id}`}>
              Go to {club.name} Static ISR On Demand Only Homepage
            </Link>
          </div>
          <div>
            <Link href={`/clubs/static-isr-timed/${club.id}`}>
              Go to {club.name} Static ISR Timed Homepage
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
