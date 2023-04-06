import Loader from "@/Components/Loader";
import { useEffect, useState } from "react";
import { getTeam } from "@/utils/dataFetch";
import { useRouter } from "next/router";

export default function TeamPage(props) {
  const router = useRouter();
  const [team, setTeam] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = router.query.team;
    if (id) getTeam(setTeam, setLoading, id);
  }, [router]);

  if (loading) return <Loader />;
  else
    return (
      <div className="w-full bg-[#031A45] flex flex-col lg:flex-row p-5 space-y-10">
        <div className="w-[100%] lg:w-[50%] flex flex-row items-center">
          <div className="w-[50%]">
            <img src={team.logo} className="rounded-lg"></img>
          </div>
          <div className="w-[50%] text-white text-3xl font-bold ml-20">
            {team.name}
          </div>
        </div>
        <div className="h-90 w-1 bg-gray-500 rounded-2xl"></div>
        <div className="w-[100%] lg:w-[50%] flex justify-around">
            <div className="w-[80%] h-auto bg-[#11295C] rounded-2xl">
                <div className="text-lg text-white font-bold p-5"><span className="text-lg text-yellow-500 font-bold">OWNER - </span>{team.owner}</div>
                <div className="w-full h-2 bg-[#031A45]"></div>
                <div className="text-lg text-white font-bold p-5"><span className="text-lg text-yellow-500 font-bold">COACH - </span>{team.coach}</div>
                <div className="w-full h-2 bg-[#031A45]"></div>
                <div className="text-lg text-white font-bold p-5"><span className="text-lg text-yellow-500 font-bold">CAPTAIN - </span>{team.captain}</div>
            </div>
        </div>
      </div>
    );
}
