import LogoutButton from "@/components/LogoutButton"
import { User, UserPlus, Search } from "lucide-react";

const SearchInput = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle search submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search" className="sr-only">Search</label>
      <div className="flex items-center gap-2 w-full">
        <div className="w-[30px]">
          <Search size={"small"} color="white" />
        </div>
        <input 
          type="text" 
          id="search"
          placeholder="Search..." 
          className="p-2 border-2 border-gray-600 bg-gray-100 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="cursor-pointer p-2 bg-gray-300 text-black py-2 rounded-md hover:bg-active">Search</button>
      </div>
    </form>
  );
};

const Sidebar = () => {
  return (
    <div className="h-full flex flex-col justify-between bg-cyan-700 pb-4 px-2">
      <nav className="font-secondary flex flex-col gap-2 p-4">

        <SearchInput />

        <button className="flex items-center gap-2 py-2 rounded-md cursor-pointer text-gray-700 hover:bg-active text-white">
            <div className="w-[30px]">
              <User size="small" color="white"/> 
            </div>
             <span>View Students</span>
        </button>

        <button className="flex items-center gap-2 py-2 rounded-md cursor-pointer text-gray-700 hover:bg-active text-white">
            <div className="w-[30px]">
                <UserPlus size="small" color="white"/>
            </div>
          <span>Add Student</span>
        </button>

      </nav>
        <div className="flex flex-col items-center">
            <LogoutButton />
        </div>
    </div>
  );
};

export default Sidebar;
