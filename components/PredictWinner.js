import { useEffect, useState } from "react";
import config from "../config/config.json";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";

export default function PredictMatchWinner(props) {
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
  const cities = [
    "Ahmedabad",
    "Kolkata",
    "Mumbai",
    "Navi Mumbai",
    "Pune",
    "Delhi",
    "Chennai",
    "Hyderabad",
    "Visakhapatnam",
    "Chandigarh",
    "Bangalore",
    "Jaipur",
    "Indore",
    "Raipur",
    "Ranchi",
    "Cuttack",
    "Dharamsala",
    "Nagpur",
  ];
  const [battingTeam, setBattingTeam] = useState(null);
  const [bowlingTeam, setBowlingTeam] = useState(null);
  const [city, setCity] = useState(null);
  const [currentScore, setCurrentScore] = useState(null);
  const [overs, setOvers] = useState(null);
  const [wickets, setWickets] = useState(null);
  const [target, setTarget] = useState(null);
  const [predictButton, setPredictButton] = useState(false);
  const [winner, setWinner] = useState(null);
  const [error, setError] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [winnerLoader, setWinnerLoader] = useState(false);

  useEffect(() => {
    if (
      battingTeam &&
      battingTeam !== "Choose a team" &&
      bowlingTeam &&
      bowlingTeam !== "Choose a team" &&
      city &&
      city !== "Choose a city" &&
      currentScore &&
      currentScore !== "" &&
      overs &&
      overs !== "" &&
      wickets &&
      wickets !== "" &&
      target &&
      target !== ""
    ) {
      setPredictButton(true);
    } else {
      setPredictButton(false);
    }
  }, [
    battingTeam,
    bowlingTeam,
    city,
    currentScore,
    overs,
    wickets,
    target,
  ]);

  const handlePredictWinner = async () => {
    window.scrollBy(0, window.innerHeight);
    setWinnerLoader(true);
    try {
      const payload = {
        batting_team: battingTeam,
        bowling_team: bowlingTeam,
        city: city,
        current_score: currentScore,
        overs: overs,
        wickets: wickets,
        target: target,
      };

      const response = await axios.post(
        `${config.url}/api/predict-match-winner/`,
        payload
      );
      const { data } = response;
      if (data.isSuccess) {
        setWinner(data.data);
        setWinnerLoader(false);
        setShowWinner(true);
      } else throw data.error;
    } catch (err) {
      setWinnerLoader(false);
      setError(true);
      console.log(
        "[SERVER ERROR][PredictMatchWinner:handlePredictWinner]: ",
        err
      );
    }
  };

  return (
    <div className="w-full h-auto">
      <div className="text-[#BDAE55] text-xl font-bold flex justify-center pt-10 lg:text-3xl lg:font-extrabold">
        Predict The Match Winner
      </div>
      <div className="w-full h-auto flex flex-col items-center p-5 pt-20 space-y-10 lg:flex-row lg:space-y-0 lg:justify-between lg:items-center">
        <div className="w-[90%] h-[50%] p-3 lg:mx-10 pt-0 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 rounded-3xl flex flex-col items-center lg:w-[40%]">
          <div className="w-[70%] h-10 lg:w-[50%] lg:h-16 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-b-3xl flex items-center justify-center">
            <h1 className="text-sm text-white font-bold lg:text-lg lg:font-extrabold">
              Batting Team
            </h1>
          </div>
          {battingTeam && battingTeam !== "Choose a team" ? (
            <img
              src={`teams/${battingTeam}.png`}
              className="w-30 h-30 lg:w-68 lg:h-48 rounded-3xl mt-5"
            ></img>
          ) : (
            <></>
          )}
          <div className="text-lg text-[#f9de84] p-3 lg:text-3xl lg:font-bold">
            {battingTeam}
          </div>
          <div className="w-full lg:flex lg:flex-row lg:justify-betwee lg:items-center">
            <label
              htmlFor="batting-teams"
              className="block mb-2 text-sm font-medium text-white lg:font-bold lg:w-[30%]"
            >
              Select Batting Team
            </label>
            <select
              id="batting-teams"
              onChange={(e) => setBattingTeam(e.target.value)}
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 lg:w-[70%]"
            >
              <option defaultValue>Choose a team</option>
              {teams.map((team, index) => (
                <option
                  key={index}
                  disabled={bowlingTeam === team}
                  value={team}
                >
                  {team}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="lg:w-1 lg:h-96 lg:bg-[#93a3fa] lg:rounded-lg"></div>
        <div className="w-[90%] h-[50%] lg:mx-10 p-3 pt-0 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 rounded-3xl flex flex-col items-center lg:w-[40%]">
          <div className="w-[70%] h-10 lg:w-[50%] lg:h-16 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-b-3xl flex items-center justify-center">
            <h1 className="text-sm text-white font-bold lg:text-lg lg:font-extrabold">
              Bowling Team
            </h1>
          </div>
          {bowlingTeam && bowlingTeam !== "Choose a team" ? (
            <img
              src={`teams/${bowlingTeam}.png`}
              className="w-30 h-30 lg:w-68 lg:h-48 rounded-3xl mt-5"
            ></img>
          ) : (
            <></>
          )}
          <div className="text-lg text-[#f9de84] p-3 lg:text-3xl lg:font-bold">
            {bowlingTeam}
          </div>
          <div className="w-full lg:flex lg:flex-row lg:justify-between lg:items-center">
            <label
              htmlFor="bowling-teams"
              className="block mb-2 text-sm font-medium text-white lg:font-bold lg:w-[30%]"
            >
              Select Bowling Team
            </label>
            <select
              id="bowling-teams"
              onChange={(e) => setBowlingTeam(e.target.value)}
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 lg:w-[70%]"
            >
              <option defaultValue>Choose a team</option>
              {teams.map((team, index) => (
                <option
                  key={index}
                  disabled={battingTeam === team}
                  value={team}
                >
                  {team}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex justify-center">
        <form className="p-5 lg:p-20 lg:mx-20 w-[80%]">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City Name
              </label>
              <select
                id="city"
                onChange={(e) => setCity(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              >
                <option defaultValue>Choose a city</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="current_score"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Current Score
              </label>
              <input
                type="number"
                id="current_score"
                onChange={(e) => setCurrentScore(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter current runs"
                required
              />
            </div>
            <div>
              <label
                htmlFor="overs"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Overs
              </label>
              <input
                type="number"
                id="overs"
                onChange={(e) => setOvers(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Overs"
                required
              />
            </div>
            <div>
              <label
                htmlFor="wickets"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Wickets
              </label>
              <input
                type="number"
                id="wickets"
                onChange={(e) => setWickets(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter wickets fallen"
                pattern="[1-10]"
                required
              />
            </div>
          </div>
          <div className="mb-6 lg:w-[50%]">
            <label
              htmlFor="target"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Target
            </label>
            <input
              type="number"
              id="target"
              onChange={(e) => setTarget(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter target"
              required
            />
          </div>
          <div className="w-full flex flex-row justify-center">
            <button
              type="button"
              disabled={!predictButton}
              onClick={handlePredictWinner}
              className={`text-white ${
                !predictButton
                  ? "bg-gray-500"
                  : "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-blue-800"
              } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[70%] sm:w-auto px-5 py-2.5 text-center`}
            >
              Predict Winner
            </button>
          </div>
        </form>
      </div>
      <div className="w-full h-[500px] p-5 flex flex-col items-center justify-center lg:p-10">
        {winnerLoader ? (
          <Loader />
        ) : showWinner ? (
          <div className="w-[80%] h-auto bg-gradient-to-r from-green-300 via-green-400 to-green-500 rounded-3xl p-5 pt-0 flex flex-col items-center justify-between space-y-5">
            <div className="w-full p-3 text-white text-xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-b-3xl flex justify-center lg:text-3xl lg:font-extrabold">
              Winning Team
            </div>
            <img
              src={`teams/${winner}.png`}
              className="w-68 h-48 rounded-3xl"
            ></img>
            <div className="text-white text-lg font-bold bg-[#2d8014] p-2 border-2 rounded-3xl flex justify-center lg:text-2xl">
              {winner}
            </div>
          </div>
        ) : error ? (
          <Error />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
