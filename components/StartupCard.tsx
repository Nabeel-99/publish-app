import { formatDate } from "@/lib/utils";
import { Author, Startups } from "@/sanity/types";
import { Eye } from "@deemlol/next-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export type StartupTypeCard = Omit<Startups, "author"> & { author?: Author };
const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;
  return (
    <div className="p-4 flex flex-col border rounded-3xl shadow-md drop-shadow-2xl shadow-black gap-3">
      <div className="flex items-center justify-between">
        <div className="border rounded-full bg-pink-200 p-3">
          {formatDate(_createdAt)}
        </div>{" "}
        <div className="flex items-center gap-2 text-sm">
          <Eye /> {views}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Link href={`/user/${author?._id}`}>
            <span>{author?.name}</span>
          </Link>

          <h2 className="font-extrabold text-xl">{title}</h2>
        </div>
        <Image
          src={"https://placehold.co/48x48"}
          alt="placeholder"
          width={48}
          height={48}
          className="rounded-full"
        />
      </div>
      <p>{description}</p>
      <img
        src={image}
        alt="image"
        className="h-48 w-full object-contain border"
      />
      <div className="flex items-center justify-between">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <span>{category}</span>
        </Link>

        <Link
          href={`/startup/${_id}`}
          className="border rounded-full hover:bg-black/80 px-6 bg-black text-white p-2"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default StartupCard;
