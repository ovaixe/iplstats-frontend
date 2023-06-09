import Loader from "@/components/Loader";
import { useEffect, useState } from "react";
import { getTeam } from "@/utils/dataFetch";
import { useRouter } from "next/router";

export default function TeamPage(props) {
  const router = useRouter();
  const [team, setTeam] = useState();
  const [loading, setLoading] = useState(true);
  const [winningSeasons, setWinningSeasons] = useState([]);

  useEffect(() => {
    const id = router.query.team;
    if (id) getTeam(setTeam, setLoading, id);
  }, [router]);

  useEffect(() => {
    if (team) {
      let winningSeasons = team.winning_seasons.split("-");
      winningSeasons = winningSeasons.filter((season) => season !== "#");
      setWinningSeasons(winningSeasons);
    }
  }, [team]);

  if (loading) return <Loader />;
  else
    return (
      <div>
        <div className="w-full bg-[#031A45] flex flex-col lg:flex-row p-5 space-y-10">
          <div className="w-[100%] lg:w-[50%] flex flex-row items-center">
            <div className="w-[40%]">
              <img src={team.logo} className="rounded-lg w-full h-20 lg:h-48" ></img>
            </div>
            <div className="w-[60%]">
              <div className="text-white text-sm lg:text-3xl font-bold p-3">
                {team.name}
              </div>
              {winningSeasons.length ? (
                <div className="flex flex-row items-center pl-4">
                  <img src="https://www.iplt20.com/assets/images/team-trophy.png" className="w-10 h-10"></img>
                  <div className="w-auto h-auto bg-[#11295C] rounded-r-3xl text-[#EAB305] text-sm font-bold p-2">
                    {winningSeasons.map((season, index, array) =>
                      index < array.length - 1 ? season + ", " : season
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="h-90 w-1 bg-gray-500 rounded-2xl"></div>
          <div className="w-[100%] lg:w-[50%] flex justify-around items-center">
            <div className="lg:w-[80%] h-auto bg-[#11295C] rounded-2xl">
              <div className="text-sm lg:text-lg text-white font-bold p-5">
                <span className="text-lg text-yellow-500 font-bold">
                  OWNER -{" "}
                </span>
                {team.owner}
              </div>
              <div className="w-full h-1 lg:h-2 bg-[#031A45]"></div>
              <div className="text-sm lg:text-lg text-white font-bold p-5">
                <span className="text-lg text-yellow-500 font-bold">
                  COACH -{" "}
                </span>
                {team.coach}
              </div>
              <div className="w-full h-1 lg:h-2 bg-[#031A45]"></div>
              <div className="text-sm lg:text-lg text-white font-bold p-5">
                <span className="text-lg text-yellow-500 font-bold">
                  CAPTAIN -{" "}
                </span>
                {team.captain}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-96"></div>
      </div>
    );
}
