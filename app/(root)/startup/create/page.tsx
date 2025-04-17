import StartupForm from "@/components/StartupForm";

const page = () => {
  return (
    <section className="bg-red-400 min-h-[250px] flex flex-col  gap-4 items-center justify-center">
      <h1 className="heading rounded-sm">SUBMIT YOUR PITCH</h1>
      <StartupForm />
    </section>
  );
};

export default page;
