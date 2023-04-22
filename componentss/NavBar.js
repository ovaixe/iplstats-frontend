import Link from "next/link";

export default function NavBar(props) {
    return (
        <div className="w-full h-20 bg-[#1B458C] flex flex-row justify-between">
            <div className="w-[20%]">
                <img src="/nav-logo.png" className="object-contain"></img>
            </div>
            <div className="w-[60%] flex items-center justify-center space-x-10 text-white text-lg">
                <Link href={'/'} className="">HOME</Link>
                <Link href={'/teams'} className="">TEAMS</Link>
                {/* <Link href={'/matches'} className="">MATCHES</Link> */}
                <Link href={'/stats'} className="">STATS</Link>
                <Link href={'/predict'} className="">PREDICT</Link>
            </div>
            <div className="w-[20%]"></div>
        </div>
    );
}