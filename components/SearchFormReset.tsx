"use client";

import { X } from "@deemlol/next-icons";
import Link from "next/link";
import { Button } from "./ui/button";
const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) form.reset();
  };
  return (
    <Button
      onClick={reset}
      type="reset"
      title="reset"
      className="border rounded-full bg-black text-white p-2"
    >
      <Link href="/">
        <X className="size-5" />
      </Link>
    </Button>
  );
};

export default SearchFormReset;
