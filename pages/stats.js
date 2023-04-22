import { useState } from "react";
import StatsResult from "@/components/StatsResult";
import axios from "axios";
import Loader from "@/components/Loader";
import Error from "../components/Error";
import config from "../config/config.json";

export default function StatsPage(props) {
  const teams = [
    "Chennai Super Kings",
    "Delhi Capitals",
    "Gujarat Titans",
    "Punjab Kings",
    "Kolkata Knight Riders",
    "Mumbai Indians",
    "Rajasthan Royals",
    "Royal Challengers Bangalore",
    "Sunrisers Hyderabad",
    "Lucknow Super Giants",
  ];
  const seasons = [
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2012",
    "2012",
    "2011",
    "2010",
    "2009",
    "2008",
  ];
  const filters = [
    { name: "Most Fours", value: "most-fours" },
    { name: "Most Fours in Inning", value: "most-fours-innings" },
    { name: "Most Sixes", value: "most-sixes" },
    { name: "Most Sixes in Inning", value: "most-sixes-innings" },
    { name: "Most Fifties", value: "most-fifties" },
    { name: "Most Centuries", value: "most-centuries" },
  ];

  const [filter, setFilter] = useState(null);
  const [season, setSeason] = useState("alltime");
  const [team, setTeam] = useState("allteams");
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleButton = async () => {
    setError(false);
    setShowData(true);
    setLoading(true);
    try {
      const response = await axios.get(
        `${config.url}/api/stats/${filter}?season=${season}&team=${team}`
      );
      const { data } = response;
      if (data.isSuccess) {
        setData(data.data);
        setLoading(false);
        setShowData(true);
      } else throw data.error;
    } catch (err) {
      setLoading(false);
      setError(true);
      console.log("[SERVER ERROR][StatsPage:handleButton]: ", err);
    }
  };

  return (
    <div className="p-10 bg-[#2F3557] flex flex-col">
      <div className="flex flex-col lg:flex-row justify-between items-center space-y-10 lg:space-y-0">
        <div className="flex flex-col space-y-5 items-center">
          <label className="block text-lg font-medium text-white lg:font-bold">
            Filter
          </label>
          <select
            type="text"
            onChange={(e) =>
              e.target.value === "Select"
                ? setFilter(null)
                : setFilter(e.target.value)
            }
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option defaultValue>Select</option>
            {filters.map((filter, index) => (
              <option key={index} value={filter.value}>
                {filter.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-5 items-center">
          <label className="block text-lg font-medium text-white lg:font-bold">
            Season
          </label>
          <select
            type="text"
            onChange={(e) =>
              e.target.value === "All Time"
                ? setSeason("alltime")
                : setSeason(e.target.value)
            }
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option defaultValue>All Time</option>
            {seasons.map((season, index) => (
              <option key={index} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col space-y-5 items-center">
          <label className="block text-lg font-medium text-white lg:font-bold">
            Team
          </label>
          <select
            type="text"
            onChange={(e) =>
              e.target.value === "All Teams"
                ? setTeam("allteams")
                : setTeam(e.target.value)
            }
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option defaultValue>All Teams</option>
            {teams.map((team, index) => (
              <option key={index} value={team}>
                {team}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-row">
          <button
            type="button"
            disabled={!filter}
            onClick={handleButton}
            className={`text-white ${
              !filter ? "bg-gray-500" : "bg-blue-700 hover:bg-blue-800"
            } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
          >
            Get Stats
          </button>
        </div>
      </div>
      <div className="mt-[100px] flex flex-col items-center">
        {showData ? (
          loading ? (
            <Loader />
          ) : error ? (
            <Error />
          ) : (
            <StatsResult data={data} filter={filter} />
          )
        ) : null}
      </div>
    </div>
  );
}
