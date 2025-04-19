import { auth } from "@/auth";
import ProfileCard from "@/components/ProfileCard";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { Skeleton } from "@/components/ui/skeleton";
import UserStartups from "@/components/UserStartups";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import {
  AUTHOR_BY_ID_QUERY,
  STARTUP_BY_AUTHOR_QUERY,
  STARTUP_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

export const experimental_ppr = true;
const Page = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, {
    id,
  });

  if (!user) return notFound();
  return (
    <>
      <div className="flex flex-col md:flex-row gap-10 pb-10 pt-10 px-4 md:px-10">
        <div className="md:w-sm ">
          <ProfileCard user={user} />
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 w-full   gap-10">
          <Suspense fallback={<Skeleton />}>
            <UserStartups id={id} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Page;
