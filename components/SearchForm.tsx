import { Search } from "@deemlol/next-icons";
import Form from "next/form";
import SearchFormReset from "@/components/SearchFormReset";
import { Button } from "./ui/button";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      action="/"
      scroll={false}
      className="search-form bg-white w-full lg:w-[600px]  rounded-full px-4 py-4 flex justify-between"
    >
      <input
        name="query"
        defaultValue={query}
        placeholder="Search Startups"
        className=" outline-none w-full lg:min-w-[400px] lg:w-[400px] lg:max-w-[400px] px-4 py-1 text-xl"
      />
      <div className="flex items-center gap-2">
        {query && <SearchFormReset />}
        <Button
          title="search"
          className="border rounded-full bg-black text-white p-2"
        >
          <Search className="size-5" />
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;
