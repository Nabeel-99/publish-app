import React from "react";

type User = {
  bio: string;
  email: string;
  id: string;
  image: string;
  name: string;
  username: string;
  _id: string;
};
const ProfileCard = ({ user }: { user: User }) => {
  return (
    <div className="flex relative flex-col gap-3 lg:h-[360px] items-center p-6 lg:px-10 rounded-2xl shadow-md shadow-black drop-shadow-2xl border-3 border-black bg-[#d34a6c]">
      <div className="mt-8">
        {" "}
        <img
          className="rounded-full h-48 w-full  p-4 object-cover"
          alt=""
          src={user?.image}
        />
      </div>

      <p className="text-white font-extrabold shadow-2xs ">@{user?.username}</p>
      <p className="text-white  text-sm">{user?.bio}</p>
      <div className="absolute -top-4  ">
        <div className="bg-white relative w-52 max-w-52 text-center border-3 z-10 border-black rounded-2xl font-bold text-black p-3 px-6 uppercase">
          {user?.name}
        </div>
        <div className="bg-black lg:max-w-52 w-52 h-11 shadow-md drop-shadow-accent absolute top-1 -rotate-6  border-3  border-black rounded-2xl font-bold  p-3 px-6 " />
      </div>
    </div>
  );
};

export default ProfileCard;
