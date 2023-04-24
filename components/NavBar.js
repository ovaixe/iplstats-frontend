import Link from "next/link";

export default function NavBar(props) {
  return (
    <div className="sticky top-0 z-50 w-full h-20 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 flex flex-row justify-between space-x-5 px-1 lg:px-5">
      <div className="w-[20%]">
        <img src="/nav-logo.png" className="w-20 h-20 object-contain"></img>
      </div>
      <div className="w-[80%] lg:w-[60%] flex items-center justify-center lg:justify-start space-x-2 lg:space-x-10 text-[#EAB305] text-sm font-bold lg:text-lg">
        <Link href={"/"} className="bg-[#041A45] py-1 px-2 rounded-xl">
          Home
        </Link>
        <Link href={"/teams"} className="bg-[#041A45] py-1 px-2 rounded-xl">
          Teams
        </Link>
        {/* <Link href={'/matches'} className="">MATCHES</Link> */}
        <Link href={"/stats"} className="bg-[#041A45] py-1 px-2 rounded-xl">
          Stats
        </Link>
        <Link href={"/predict"} className="bg-[#041A45] py-1 px-2 rounded-xl">
          Predict
        </Link>
      </div>
    </div>
  );
}
