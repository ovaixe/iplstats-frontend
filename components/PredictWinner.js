import { useEffect, useState } from "react";
import config from "../config/config.json";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
import SelectBattingTeam from "./SelectBattingTeam";
import SelectBowlingTeam from "./SelectBowlingTeam";
import WinnerResult from "./WinnerResult";

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
  }, [battingTeam, bowlingTeam, city, currentScore, overs, wickets, target]);

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
        <SelectBattingTeam
          battingTeam={battingTeam}
          bowlingTeam={bowlingTeam}
          setBattingTeam={setBattingTeam}
        />
        <div className="lg:w-1 lg:h-96 lg:bg-[#93a3fa] lg:rounded-lg"></div>
        <SelectBowlingTeam
          battingTeam={battingTeam}
          bowlingTeam={bowlingTeam}
          setBowlingTeam={setBowlingTeam}
        />
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
          <WinnerResult winner={winner} />
        ) : error ? (
          <Error />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
