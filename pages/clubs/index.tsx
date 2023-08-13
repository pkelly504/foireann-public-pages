import ClubList from "@/components/ClubList";
import { Organization, OrganizationsResponse, PagedResponse } from "../../types/types";

export default function Clubs({ clubs }: { clubs: Organization[] }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {clubs?.length > 0 && (
        <>
        <h1>Select your club from below</h1>
          <ClubList clubs={clubs} />
        </>
      )}

      {clubs.length === 0 && (
        <h2>No clubs found. Did you add a jwt before building?</h2>
      )}
    </main>
  );
}

export async function getStaticProps() {
    if (!process.env.JWT) {
    return {
      props: {
        clubs: [],
      }
    }
  }

  const clubs: PagedResponse<OrganizationsResponse> = await fetch(`https://organization-uat.gaaservers.net/organization`, {
    headers: {
      Authorization: `Bearer ${process.env.JWT}`
    }
  }).then((res) => res.json());

  return {
    props: {
      clubs: clubs._embedded?.organizations || [],
    },
  };
}
