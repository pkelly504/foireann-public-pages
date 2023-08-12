import {
  Organization,
  PagedResponse,
  Place,
  PlacesResponse,
} from "@/types/types";
import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type StaticIsrOnDemandOnlyClubProps = {
  club?: Organization;
  places: Place[];
};

export default function StaticIsrOnDemandOnlyClub({ club, places }: StaticIsrOnDemandOnlyClubProps) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed when getStaticProps gets called.
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (!club) {
    return <h2>Club not found. Are you sure you added it.</h2>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={`/clubs`}>Go back to club list</Link>
      <h1>Welcome to {club.name} where everything is fetched at build time, but the page is rebuilt when something on the org changes OR every 10 secs</h1>

      <Image
        src={club.logo}
        alt={`${club.name} logo`}
        width={200}
        height={200}
      />

      <div>
        <h2>Places</h2>
        <ul>
          {places.map((place) => (
            <li key={place.id}>{place.name}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export async function getStaticProps({
  params: { id },
}: {
  params: { id: string };
}): Promise<GetStaticPropsResult<StaticIsrOnDemandOnlyClubProps>> {
  if (!process.env.JWT) {
    return {
      props: {
        club: undefined,
        places: [],
      },
    };
  }

  const [club, places]: [Organization, PagedResponse<PlacesResponse>] =
    await Promise.all([
      getOrg(id, process.env.JWT),
      getPlaces(id, process.env.JWT),
    ]);

  return {
    props: {
      club,
      places: places._embedded?.places || [],
    },
  };
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  // Pre-render no paths, but rather rely on fallback: true to generate pages when they are first visited
  // TODO - what if a page does not exist and ISR kicks in? Assumption is ISR will not do anything until cache is seeded by first
  return { paths: [], fallback: true };
}

async function getOrg(id: string, jwt: string): Promise<Organization> {
  return await fetch(
    `https://organization-uat.gaaservers.net/organization/${id}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  ).then((res) => res.json());
}

async function getPlaces(
  id: string,
  jwt: string
): Promise<PagedResponse<PlacesResponse>> {
  return await fetch(
    `https://organization-uat.gaaservers.net/place?filter=organization.id:${id}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  ).then((res) => res.json());
}
