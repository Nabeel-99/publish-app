"use client";
import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { BsFillCursorFill } from "react-icons/bs";
import MDEditor from "@uiw/react-md-editor";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createStartup } from "@/lib/actions";
const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };
      console.log("formValues", formValues);
      await formSchema.parseAsync(formValues);

      const result = await createStartup(prevState, formData, pitch);
      console.log(result);
      if (result.status === "SUCCESS") {
        toast.success("Pitch submitted successfully");
        router.push(`/startup/${result._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast.error("Please check your inputs and try again.");
        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }
      toast.error("Something went wrong");
      return {
        ...prevState,
        error: "Something went wrong",
        status: "ERROR",
      };
    }
  };
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="uppercase font-bold">
          Title
        </label>
        <Input
          id="title"
          name="title"
          placeholder="Startup Name"
          className="border-3 border-black py-6 rounded-full"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <label htmlFor="description" className="uppercase font-bold">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          placeholder="Short description of your startup idea"
          className="border-3 text-xl border-black py-6 min-h-32 max-h-32 rounded-xl"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description}</p>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <label htmlFor="category" className="uppercase font-bold">
          Category
        </label>
        <Input
          id="category"
          name="category"
          placeholder="type a category e.g Tech, Education, etc"
          className="border-3 border-black py-6 rounded-full"
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-6">
        <label htmlFor="link" className="uppercase font-bold">
          Image/Video Link
        </label>
        <Input
          id="link"
          name="link"
          placeholder="Paste a link to your demo or promo video"
          className="border-3 border-black py-6 rounded-full"
        />
        {errors.link && <p className="text-red-500 text-sm">{errors.link}</p>}
      </div>
      <div data-color-mode="light" className="flex flex-col gap-2 mt-6 mb-10">
        <label htmlFor="pitch" className="uppercase font-bold">
          Pitch
        </label>
        <MDEditor
          id="pitch"
          preview="edit"
          height={300}
          style={{
            borderRadius: 20,
            border: "3px solid black",
            overflow: "hidden",
            padding: 10,
          }}
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          textareaProps={{
            placeholder:
              "Briefly explain your startup idea and the problem you want to solve",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.pitch && <p className="text-red-500 text-sm">{errors.pitch}</p>}
      </div>
      <div className="flex flex-col gap-2 mb-10">
        <Button
          type="submit"
          disabled={isPending}
          className="border-4 cursor-pointer flex items-center gap-2 border-black py-8  rounded-full bg-[#d24d61] uppercase text-white font-bold"
        >
          <span>{isPending ? "Submitting..." : "Submit Your Startup"}</span>
          <span>
            <BsFillCursorFill className="size-5" />
          </span>
        </Button>
      </div>
    </form>
  );
};

export default StartupForm;
