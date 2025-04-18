import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <>
      <section className="bg-red-400 min-h-[250px] flex flex-col  gap-4 items-center justify-center">
        <h1 className="heading rounded-sm">SUBMIT YOUR PITCH</h1>
      </section>
      <section>
        <div className="max-w-2xl px-4 xl:px-0 mt-20 mx-auto w-full">
          <StartupForm />
        </div>
      </section>
    </>
  );
};

export default Page;
