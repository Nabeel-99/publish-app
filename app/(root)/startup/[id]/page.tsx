import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_QUERY_BY_ID,
} from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
const md = markdownit();
export const experimental_ppr = true;
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_QUERY_BY_ID, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks",
    }),
  ]);

  if (!post) return notFound();
  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="bg-red-400 min-h-[250px] p-4 flex flex-col  gap-4 items-center justify-center">
        <div className="bg-yellow-400 px-4 py-4 rounded-md font-bold">
          {formatDate(post._createdAt)}
        </div>
        <h1 className="heading rounded-sm">{post.title}</h1>
        <p className="text-center max-w-3xl text-white">{post.description}</p>
      </section>
      <section className="">
        <div className="flex flex-col max-w-4xl mx-auto w-full  gap-6  px-8 lg:px-0  pt-8  pb-8  lg:items-center">
          <img src={post.image} alt="" className="object-cover w-2/3 mx-auto" />
          <div className="flex  max-w-4xl mx-auto w-full lg:items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                width={48}
                height={48}
                src={post.author.image}
                alt={post.author.name}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-xl font-bold">{post.author.name}</p>
                <Link href={`/user/${post.author._id}`} className="text-sm">
                  @{post.author.username}
                </Link>
              </div>
            </div>

            <span className="font-bold text-sm lg:text-base bg-pink-200 rounded-full px-2 flex items-center justify-center">
              {" "}
              {post.category}
            </span>
          </div>
          <div className="flex flex-col gap-3 max-w-4xl mx-auto w-full">
            <h1 className="text-xl font-bold">Pitch Details</h1>
            {parsedContent ? (
              <article
                className="markdown prose prose-lg prose-headings:font-bold prose-headings:text-black prose-p:text-gray-800 prose-ul:list-disc prose-strong:text-black prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 break-words"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p>No details provided.</p>
            )}
          </div>
        </div>
      </section>
      <section className=" pb-10 w-full flex flex-col items-center">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto px-8 lg:px-0  mt-8   ">
          <div className=" bg-pink-200 w-full h-0.5 rounded-full" />
          <Suspense fallback={<Skeleton />}>
            <View id={post._id} />
          </Suspense>
          {editorPosts.length > 0 && (
            <>
              <h1 className="text-2xl font-bold">Similar Startups</h1>
              <div className="grid  md:grid-cols-2  gap-4">
                {editorPosts.map((post: StartupTypeCard, i: number) => (
                  <StartupCard key={i} post={post} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
