import Image from "next/image";
import { Logo } from "./components/Logo";
import { Iconbutton } from "./components/Iconbutton";
import { Upcoming } from "./components/Upcoming";

export default function Home() {
  return (
    <div className="h-[4184px] w-full">
      <div className="w-full h-[59px] px-16 flex justify-between items-center">
        <Logo />
        <button className="w-[97px] h-[36px]">Genre</button>
        <input className="border rounded-lg border-gray-200 w-[379px] px-[12px]"></input>
        <Iconbutton />
      </div>
      <div>
        <Upcoming />
      </div>
    </div>
  );
}
