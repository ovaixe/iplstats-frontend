import Link from "next/link";

export default function NavBar(props) {
  return (
    <div className="sticky top-0 z-50 w-full h-20 bg-[#1B458C] flex flex-row justify-between">
      <div className="w-[20%]">
        <img src="/nav-logo.png" className="w-20 h-20 object-contain"></img>
      </div>
      <div className="w-[80%] lg:w-[60%] flex items-center justify-center lg:justify-start space-x-5 lg:space-x-10 text-[#EAB305] text-lg">
        <Link href={"/"} className="">
          HOME
        </Link>
        <Link href={"/teams"} className="">
          TEAMS
        </Link>
        {/* <Link href={'/matches'} className="">MATCHES</Link> */}
        <Link href={"/stats"} className="">
          STATS
        </Link>
        <Link href={"/predict"} className="">
          PREDICT
        </Link>
      </div>
    </div>
  );
}
