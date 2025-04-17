import StartupCard from "@/components/StartupCard";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY_BY_ID } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import markdownit from "markdown-it";
const md = markdownit();
export const experimental_ppr = true;
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_QUERY_BY_ID, { id });
  if (!post) return notFound();
  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="bg-red-400 min-h-[250px] flex flex-col  gap-4 items-center justify-center">
        <div className="bg-yellow-400 px-4 py-4 rounded-md font-bold">
          {formatDate(post._createdAt)}
        </div>
        <h1 className="heading rounded-sm">{post.title}</h1>
        <p className="text-center text-white">{post.description}</p>
      </section>
      <section className="w-full flex flex-col items-center">
        <div className="flex flex-col  lg:w-3/4  gap-6  px-8 pt-8 lg:px-12 pb-8  lg:items-center">
          <img src={post.image} alt="" className="object-cover" />
          <div className="flex   lg:w-3/4 lg:items-center justify-between">
            <div className="flex items-center">
              <Image
                width={48}
                height={48}
                src={post.author.image}
                alt={post.author.name}
                className="rounded-full"
              />
              <div className="flex flex-col gap-2">
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
          <div className="flex flex-col gap-3   lg:w-3/4  ">
            <h1 className="text-xl font-bold">Pitch Details</h1>
            {parsedContent ? (
              <article
                className="prose"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p>No details Provided.</p>
            )}
          </div>
          <div className="flex flex-col gap-6  mt-8  lg:w-3/4 ">
            <div className=" bg-pink-200 w-full h-0.5 rounded-full" />
            <h1 className="text-2xl font-bold">Similar Startups</h1>
            <div className="grid  md:grid-cols-2  gap-4">
              <StartupCard post={post} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
