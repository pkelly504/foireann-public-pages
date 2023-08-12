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
import { useEffect, useState } from "react";

type StaticHybridClubProps = {
  club?: Organization;
  jwt?: string;
};

export default function StaticHybridClub({
  club,
  jwt,
}: StaticHybridClubProps) {
  const router = useRouter();

  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const res: PagedResponse<PlacesResponse> = await fetch(
        `https://organization-uat.gaaservers.net/place?filter=organization.id:${club?.id}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      ).then((res) => res.json());

      setPlaces(res._embedded?.places || []);
    };

    if (router.isReady && club?.id && jwt) {
      fetchPlaces();
    }
  }, [club?.id, jwt, router.isReady]);

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
      <h1>
        Welcome to {club.name} where the club is fetched at build time but the places are fetched client side. The club info is rebuilt when something changes on the org.
      </h1>

      <Image
        src={club.logo}
        alt={`${club.name} logo`}
        width={200}
        height={200}
      />

      <div>
        <h2>Places</h2>
        {places.length === 0 && <h3>No places found. Check your network tab</h3>}

        {places.length && (
          <ul>
            {places.map((place) => (
              <li key={place.id}>{place.name}</li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

export async function getStaticProps({
  params: { id },
}: {
  params: { id: string };
}): Promise<GetStaticPropsResult<StaticHybridClubProps>> {
  if (!process.env.JWT) {
    return {
      props: {
        club: undefined,
        jwt: process.env.JWT,
      },
    };
  }

  return {
    props: {
      club: await getOrg(id, process.env.JWT),
      jwt: process.env.JWT,
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
  // All other paths will not be pre-rendered and will be fetched at request time.
  return { paths, fallback: true };
}

function getOrg(id: string, jwt: string): Promise<Organization> {
  return fetch(`https://organization-uat.gaaservers.net/organization/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => res.json());
}
