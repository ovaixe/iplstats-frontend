import { useEffect, useState } from "react";
import config from "../config/config.json";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function PredictWinnerForm(props) {
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
  const {
    battingTeam,
    bowlingTeam,
    setWinner,
    setWinnerLoader,
    setShowWinner,
    setError,
  } = props;
  const [city, setCity] = useState(null);
  const [currentScore, setCurrentScore] = useState(null);
  const [overs, setOvers] = useState(null);
  const [wickets, setWickets] = useState(null);
  const [target, setTarget] = useState(null);
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
      bowlingTeam !== "Choose a team" &&
      city &&
      city !== "Choose a city"
      // currentScore &&
      // currentScore !== "" &&
      // overs &&
      // overs !== "" &&
      // wickets &&
      // wickets !== "" &&
      // target &&
      // target !== ""
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
    <form
      className="p-5 lg:p-20 lg:mx-20 w-[80%]"
      onSubmit={handleSubmit(handlePredictWinner)}
    >
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
            name="city"
            onChange={(e) => setCity(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultValue>Choose a city</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className="">
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
            onWheel={(e) => e.target.blur()}
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
            htmlFor="overs"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Overs
          </label>
          <input
            type="number"
            step=".1"
            id="overs"
            name="overs"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Overs"
            onWheel={(e) => e.target.blur()}
            {...register("overs", {
              onChange: (e) => setOvers(e.target.value),
              required: "Please enter current overs",
              pattern: {
                value: /^([0-9]|1[0-9])(\.[0-5])?$/,
                message: "Please enter the correct overs",
              },
              min: {
                value: 0,
                message: "Please enter atleast 5 overs",
              },
              max: {
                value: 19.5,
                message: "Please enter overs less than 20",
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
            placeholder="Enter wickets fallen"
            onWheel={(e) => e.target.blur()}
            {...register("wickets", {
              onChange: (e) => setWickets(e.target.value),
              required: "Please enter current wickets",
              min: {
                value: 0,
                message: "Please enter atleast 0 wicket",
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
          name="target"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter target"
          onWheel={(e) => e.target.blur()}
          {...register("target", {
            onChange: (e) => setTarget(e.target.value),
            required: "Please enter target",
            min: {
              value: currentScore,
              message: "Please enter correct target, it should be greater than current score",
            },
          })}
        />
        {errors?.target && (
          <div className="text-sm text-red-400 p-2">
            {errors.target.message}
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
          Predict Winner
        </button>
      </div>
    </form>
  );
}
