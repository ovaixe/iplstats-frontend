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
  const [ballsLeft, setBallsLeft] = useState(null);
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
      ballsLeft &&
      ballsLeft !== "" &&
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
    ballsLeft,
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
        current_score: +currentScore,
        balls_left: +ballsLeft,
        wickets: +wickets,
        target: +target,
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
      <div className="w-full h-auto flex flex-col p-5 pt-20 space-y-10 lg:flex-row lg:space-y-0 lg:justify-between lg:items-center">
        <div className="w-full h-[50%] p-5 pt-0 bg-[#93a3fa] rounded-3xl flex flex-col items-center lg:w-[45%]">
          <div className="w-[70%] h-10 lg:w-[50%] lg:h-16 bg-[#d17243] rounded-b-3xl flex items-center justify-center">
            <h1 className="text-sm text-white font-bold lg:text-lg lg:font-extrabold">
              Batting Team
            </h1>
          </div>
          {battingTeam && battingTeam !== "Choose a team" ? (
            <img
              src={`teams/${battingTeam}.png`}
              className="w-68 h-48 rounded-3xl mt-5"
            ></img>
          ) : (
            <></>
          )}
          <div className="text-lg text-white p-5 lg:text-3xl lg:font-bold">
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
        <div className="w-full h-[50%] p-5 pt-0 bg-[#93a3fa] rounded-3xl flex flex-col items-center lg:w-[45%]">
          <div className="w-[70%] h-10 lg:w-[50%] lg:h-16 bg-[#d17243] rounded-b-3xl flex items-center justify-center">
            <h1 className="text-sm text-white font-bold lg:text-lg lg:font-extrabold">
              Bowling Team
            </h1>
          </div>
          {bowlingTeam && bowlingTeam !== "Choose a team" ? (
            <img
              src={`teams/${bowlingTeam}.png`}
              className="w-68 h-48 rounded-3xl mt-5"
            ></img>
          ) : (
            <></>
          )}
          <div className="text-lg text-white p-5 lg:text-3xl lg:font-bold">
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
      <div className="w-full h-auto">
        <form className="p-5 lg:p-20 lg:mx-20">
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
                htmlFor="balls_left"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Balls Left
              </label>
              <input
                type="number"
                id="balls_left"
                onChange={(e) => setBallsLeft(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter balls left"
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
                placeholder="Enter wickets"
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
                !predictButton ? "bg-gray-500" : "bg-blue-700 hover:bg-blue-800"
              } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
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
          <div className="w-[80%] h-auto bg-[#85b570] rounded-3xl p-5 pt-0 flex flex-col items-center justify-between space-y-5">
            <div className="w-full p-3 text-white text-xl font-bold bg-[#d17243] rounded-b-3xl flex justify-center lg:text-3xl lg:font-extrabold">
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

function getTeamName(team) {
  const names = {
    CSK: "Chennai Super Kings",
    DC: "Delhi Capitals",
    GT: "Gujarat Titans",
    PK: "Punjab Kings",
    KKR: "Kolkata Knight Riders",
    MI: "Mumbai Indians",
    RR: "Rajasthan Royals",
    RCB: "Royal Challengers Bangalore",
    SH: "Sunrisers Hyderabad",
    LSG: "Lucknow Super Giants",
  };

  return names[team];
}
