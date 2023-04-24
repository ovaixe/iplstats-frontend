import { useEffect, useState } from "react";
import config from "../config/config.json";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";

export default function PredictScore(props) {
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

  const [battingTeam, setBattingTeam] = useState(null);
  const [bowlingTeam, setBowlingTeam] = useState(null);
  const [overs, setOvers] = useState(null);
  const [currentScore, setCurrentScore] = useState(null);
  const [runsInPrev5, setRunsInPrev5] = useState(null);
  const [wicketsInPrev5, setwicketsInPrev5] = useState(null);
  const [wickets, setWickets] = useState(null);

  const [predictButton, setPredictButton] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [scoreLoader, setScoreLoader] = useState(false);

  useEffect(() => {
    if (
      battingTeam &&
      battingTeam !== "Choose a team" &&
      bowlingTeam &&
      bowlingTeam !== "Choose a team" &&
      overs &&
      overs !== "" &&
      currentScore &&
      currentScore !== "" &&
      runsInPrev5 &&
      runsInPrev5 !== "" &&
      wicketsInPrev5 &&
      wicketsInPrev5 !== "" &&
      wickets &&
      wickets !== ""
    ) {
      setPredictButton(true);
    } else {
      setPredictButton(false);
    }
  }, [
    battingTeam,
    bowlingTeam,
    overs,
    currentScore,
    runsInPrev5,
    wicketsInPrev5,
    wickets,
  ]);

  const handlePredictWinner = async () => {
    window.scrollBy(0, window.innerHeight);
    setScoreLoader(true);
    try {
      const payload = {
        batting_team: battingTeam,
        bowling_team: bowlingTeam,
        overs: +overs,
        current_score: +currentScore,
        runs_in_prev_5: +runsInPrev5,
        wickets_in_prev_5: +wicketsInPrev5,
        wickets: +wickets,
      };

      const response = await axios.post(
        `${config.url}/api/predict-score/`,
        payload
      );
      const { data } = response;
      if (data.isSuccess) {
        setScore(data.data);
        setScoreLoader(false);
        setShowScore(true);
      } else throw data.error;
    } catch (err) {
      setError(true);
      setScoreLoader(false);
      console.log("[SERVER ERROR][PredictScore:handlePredictWinner]: ", err);
    }
  };

  return (
    <div className="w-full h-auto">
      <div className="text-[#BDAE55] text-xl font-bold flex justify-center pt-10 lg:text-3xl lg:font-extrabold">
        Predict The Score
      </div>
      <div className="w-full h-auto flex flex-col items-center p-5 pt-20 space-y-10 lg:flex-row lg:space-y-0 lg:justify-between lg:items-center">
        <div className="w-[80%] h-[50%] lg:mx-10 p-5 pt-0 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 rounded-3xl flex flex-col items-center lg:w-[40%]">
          <div className="w-[70%] h-10 lg:w-[50%] lg:h-16 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-b-3xl flex items-center justify-center">
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
        <div className="w-[80%] h-[50%] lg:mx-10 p-5 pt-0 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 rounded-3xl flex flex-col items-center lg:w-[40%]">
          <div className="w-[70%] h-10 lg:w-[50%] lg:h-16 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-b-3xl flex items-center justify-center">
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
      <div className="w-full h-auto flex justify-center">
        <form className="p-5 lg:p-20 lg:mx-20 w-[80%]">
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="overs"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Overs
              </label>
              <input
                id="overs"
                type="number"
                onChange={(e) => setOvers(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter current overs"
                required
              />
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
                htmlFor="runs_in_prev_5"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Runs in previous 5 overs
              </label>
              <input
                type="number"
                id="runs_in_prev_5"
                onChange={(e) => setRunsInPrev5(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter runs in last 5 overs"
                required
              />
            </div>
            <div>
              <label
                htmlFor="wickets_in_prev_5"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Wickets in previous 5 overs
              </label>
              <input
                type="number"
                id="wickets_in_prev_5"
                onChange={(e) => setwicketsInPrev5(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter wickets in last 5 overs"
                required
              />
            </div>
          </div>
          <div className=" mb-6 lg:w-[50%]">
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
              pattern="[0-9]"
              required
            />
          </div>

          <div className="w-full flex flex-row justify-center">
            <button
              type="button"
              disabled={!predictButton}
              onClick={handlePredictWinner}
              className={`text-white ${
                !predictButton ? "bg-gray-500" : "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-blue-800"
              } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[70%] sm:w-auto px-5 py-2.5 text-center`}
            >
              Predict Score
            </button>
          </div>
        </form>
      </div>
      <div className="w-full h-96 p-5 lg:p-10 flex flex-col items-center justify-center">
        {scoreLoader ? (
          <Loader />
        ) : showScore ? (
          <div className="w-[70%] lg:w-[50%] h-[50%] lg:h-48 bg-gradient-to-r from-green-300 via-green-400 to-green-500 rounded-3xl p-5 pt-0 flex flex-col items-center justify-between">
            <div className="w-full p-2 text-white text-xl font-bold rounded-b-3xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 flex items-center justify-center lg:text-3xl lg:font-extrabold">
              Predicted Score
            </div>
            <div className="text-white text-xl font-bold bg-[#2d8014] py-2 px-5 border-2 rounded-xl lg:text-2xl">
              {score}
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
