import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server";
import React from "react";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });
  after(async () => {
    await writeClient
      .patch(id)
      .set({ views: (totalViews || 0) + 1 })
      .commit();
  });

  return (
    <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3 border rounded-3xl p-2 bg-pink-50">
      <p>
        Views: <span className="font-bold">{totalViews}</span>
      </p>
      <div className="absolute animate-pulse -top-2 -right-2 w-4 h-4 bg-pink-400 rounded-full" />
    </div>
  );
};

export default View;
