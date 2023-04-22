import PredictMatchWinner from "@/componentss/PredictWinner";
import PredictScore from "@/componentss/PredictScore";
import { useState } from "react";

export default function PredictPage(props) {
  const [predictWinner, setPredictWinner] = useState(false);
  const [predictScore, setPredictScore] = useState(false);

  const handlePredictWinner = () => {
    window.scrollTo(0, 500);
    setPredictScore(false);
    setPredictWinner(true);
  };

  const handlePredictScore = () => {
    window.scrollTo(0, 500);
    setPredictWinner(false);
    setPredictScore(true);
  };

  return (
    <>
      <div className="w-full h-auto bg-[#031A45] flex flex-col items-center justify-around p-5 pt-10 space-y-10 lg:p-10">
        <h1 className="text-yellow-500 text-2xl font-extrabold lg:text-3xl">
          Predict the match outcomes
        </h1>
        <div className="w-full flex flex-col space-y-10 items-center lg:flex-row lg:space-y-0 lg:pt-20 lg:justify-between">
          <div className="w-full h-auto rounded-3xl bg-[#2F3557] p-5 flex flex-col items-center space-y-10 lg:w-[40%]">
            <h1 className="text-white text-lg font-bold lg:text-xl">
              Predict the match winner, based on ist inning results and current
              results of the match.
            </h1>
            <button
              onClick={handlePredictWinner}
              className="text-white text-lg font-bold border-4 border-yellow-500 hover:bg-yellow-500 rounded-lg p-2"
            >
              Predit Match Winner
            </button>
          </div>
          <div className="w-full h-auto rounded-3xl bg-[#2F3557] p-5 flex flex-col items-center space-y-10 lg:w-[40%]">
            <h1 className="text-white text-lg font-bold lg:text-xl">
              Predict the current innings score, based on last 5 overs result
              and current results of the match.
            </h1>
            <button
              onClick={handlePredictScore}
              className="text-white text-lg font-bold border-4 border-yellow-500 hover:bg-yellow-500 rounded-lg p-2"
            >
              Predit Score
            </button>
          </div>
        </div>
      </div>
      {predictWinner ? <PredictMatchWinner /> : <></>}
      {predictScore ? <PredictScore /> : <></>}
    </>
  );
}
