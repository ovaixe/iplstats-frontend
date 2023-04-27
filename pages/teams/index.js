import { useEffect, useState } from "react";
import TeamCard from "@/components/TeamCard";
import Loader from "@/components/Loader";
import { getAllTeams } from "@/utils/dataFetch";
import Link from "next/link";

export default function TeamsPage(props) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTeams(setTeams, setLoading);
  }, []);

  if (loading) return <Loader />;
  else
    return (
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 p-5 pt-20 justify-items-center ">
          {teams.map((team, index) => (
            <Link key={index} href={`/teams/${team.id}`} className="w-[90%] h-[90%]">
              <TeamCard team={team} />
            </Link>
          ))}
        </div>
      </div>
    );
}
