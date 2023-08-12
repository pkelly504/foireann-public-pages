import {
  Organization,
  PagedResponse,
  Place,
  PlacesResponse,
} from "@/types/types";
import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import Image from "next/image";
import Link from "next/link";

type StaticOnlyClubProps = {
  club: Organization;
  places: Place[];
};

export default function StaticOnlyClub({ club, places }: StaticOnlyClubProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={`/clubs`}>Go back to club list</Link>
      <h1>Welcome to {club.name} where everything is fetched at build time. If a route wasnt generated you will get a 404</h1>

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
}): Promise<GetStaticPropsResult<StaticOnlyClubProps>> {
  if (!process.env.JWT) {
    throw new Error('no jwt');
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
  // Harcoding for now but these would be gotten from an API
  const paths = [
    "b29eed44-2761-44e4-e810-3a661f9a1731", // Loughmacrory
    "4079016d-9402-10b4-ae9a-e7d41c4a1287", // Carrickmore
    "26f5bd4a-a64f-dadf-9615-2ca6e6402090", // Tommy Larkins,
    "43baa676-2fa8-1bb4-3b39-c62553b21079", // Aghyaran
    "1f71e393-b380-9197-ed66-df836fe81946", // Silverbridge
  ].map((id) => ({ params: { id } }));

  // We'll pre-render only these paths at build time.
  // All other paths will trigger 404s
  return { paths, fallback: false };
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
