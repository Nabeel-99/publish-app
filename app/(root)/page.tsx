import SearchForm from "../../components/SearchForm";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY, params });
  return (
    <>
      <section className="bg-red-400 min-h-[500px] flex flex-col  gap-4 items-center justify-center">
        <div className="bg-yellow-400 px-4 py-4 rounded-md font-bold">
          PITCH, CONNECT AND GROW
        </div>
        <h1 className="heading rounded-sm">
          Pitch Your Startup, <br /> Connect With Developers
        </h1>
        <p className="text-white text-center text-lg">
          Submit Ideas and Get Noticed By Top Developers
        </p>
        <SearchForm query={query} />
      </section>
      <section>
        <div className="flex px-6 lg:px-12 py-10 flex-col gap-2">
          <h1 className="font-bold text-xl">
            {query ? `Search results for "${query}"` : "Recommended Startups"}
          </h1>
          <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-4">
            {posts.length > 0 ? (
              posts.map((post: StartupTypeCard) => (
                <StartupCard key={post?._id} post={post} />
              ))
            ) : (
              <p className="text-center col-span-6  text-lg text-gray-400">
                No startups found.
              </p>
            )}
          </div>
        </div>
      </section>
      <SanityLive />
    </>
  );
}
