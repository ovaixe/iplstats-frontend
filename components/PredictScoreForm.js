import { useEffect, useState } from "react";
import config from "../config/config.json";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function PredictScoreForm(props) {
  const {
    battingTeam,
    bowlingTeam,
    setScore,
    setError,
    setShowScore,
    setScoreLoader,
  } = props;
  const [overs, setOvers] = useState(null);
  const [currentScore, setCurrentScore] = useState(null);
  const [runsInPrev5, setRunsInPrev5] = useState(null);
  const [wicketsInPrev5, setwicketsInPrev5] = useState(null);
  const [wickets, setWickets] = useState(null);
  const [predictButton, setPredictButton] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (
      battingTeam &&
      battingTeam !== "Choose a team" &&
      bowlingTeam &&
      bowlingTeam !== "Choose a team"
      // overs &&
      // overs !== "" &&
      // currentScore &&
      // currentScore !== "" &&
      // runsInPrev5 &&
      // runsInPrev5 !== "" &&
      // wicketsInPrev5 &&
      // wicketsInPrev5 !== "" &&
      // wickets &&
      // wickets !== ""
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

  const handlePredictScore = async () => {
    window.scrollBy(0, window.innerHeight);
    setScoreLoader(true);
    try {
      const payload = {
        batting_team: battingTeam,
        bowling_team: bowlingTeam,
        overs: overs,
        current_score: currentScore,
        runs_in_prev_5: runsInPrev5,
        wickets_in_prev_5: wicketsInPrev5,
        wickets: wickets,
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
    <form className="p-5 lg:p-20 lg:mx-20 w-[80%]" onSubmit={handleSubmit(handlePredictScore)}>
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
            name="overs"
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter current overs"
            {...register("overs", {
              onChange: (e) => setOvers(e.target.value),
              required: "Please enter current overs",
              min: {
                value: 5,
                message: "Please enter atleast 5 overs",
              },
              max: {
                value: 19.5,
                message: "Please enter less than 20 overs",
              },
            })}
          />
          {errors?.overs && (
            <div className="text-sm text-red-400 p-2">
              {errors.overs.message}
            </div>
          )}
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
            name="current_score"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter current runs"
            {...register("current_score", {
              onChange: (e) => setCurrentScore(e.target.value),
              required: "Please enter current score",
              min: {
                value: 0,
                message: "Please enter correct score",
              },
            })}
          />
          {errors?.current_score && (
            <div className="text-sm text-red-400 p-2">
              {errors.current_score.message}
            </div>
          )}
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
            name="runs_in_prev_5"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter runs in last 5 overs"
            {...register("runs_in_prev_5", {
              onChange: (e) => setRunsInPrev5(e.target.value),
              required: "Please enter score in last 5 overs",
              min: {
                value: 0,
                message: "Please enter correct score",
              },
              max: {
                value: currentScore,
                message: 'Please enter correct score, it should be less than or equal to current score'
              }
            })}
          />
          {errors?.runs_in_prev_5 && (
            <div className="text-sm text-red-400 p-2">
              {errors.runs_in_prev_5.message}
            </div>
          )}
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
            name="wickets_in_prev_5"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter wickets fallen in last 5 overs"
            {...register("wickets_in_prev_5", {
              onChange: (e) => setwicketsInPrev5(e.target.value),
              required: "Please enter wickets fallen in last 5 overs",
              min: {
                value: 0,
                message: "Please enter atleast 0 wickets",
              },
              max: {
                value: 9,
                message: "Please enter less than 10 wickets",
              },
            })}
          />
          {errors?.wickets_in_prev_5 && (
            <div className="text-sm text-red-400 p-2">
              {errors.wickets_in_prev_5.message}
            </div>
          )}
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
          name="wickets"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter total wickets fallen"
          pattern="[0-9]"
          {...register("wickets", {
            onChange: (e) => setWickets(e.target.value),
            required: "Please enter total wickets fallen",
            min: {
              value: wicketsInPrev5,
              message: "Please enter correct wickets, it should be greater or equal to wickets in last 5 overs",
            },
            max: {
              value: 9,
              message: "Please enter less than 10 wickets",
            },
          })}
        />
        {errors?.wickets && (
            <div className="text-sm text-red-400 p-2">
              {errors.wickets.message}
            </div>
          )}
      </div>

      <div className="w-full flex flex-row justify-center">
        <button
          type="submit"
          disabled={!predictButton}
          className={`text-white ${
            !predictButton
              ? "bg-gray-500"
              : "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-blue-800"
          } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[70%] sm:w-auto px-5 py-2.5 text-center`}
        >
          Predict Score
        </button>
      </div>
    </form>
  );
}
