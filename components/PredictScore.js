import { useState } from "react";
import Loader from "./Loader";
import Error from "./Error";
import SelectBattingTeam from "./SelectBattingTeam";
import SelectBowlingTeam from "./SelectBowlingTeam";
import PredictScoreForm from "./PredictScoreForm";
import ScoreResult from "./ScoreResult";

export default function PredictScore(props) {
  const [battingTeam, setBattingTeam] = useState(null);
  const [bowlingTeam, setBowlingTeam] = useState(null);
  const [score, setScore] = useState(null);
  const [error, setError] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [scoreLoader, setScoreLoader] = useState(false);

  return (
    <div className="w-full h-auto">
      <div className="text-[#BDAE55] text-xl font-bold flex justify-center pt-10 lg:text-3xl lg:font-extrabold">
        Predict The Score
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
        <PredictScoreForm battingTeam={battingTeam} bowlingTeam={bowlingTeam} setScore={setScore} setError={setError} setShowScore={setShowScore} setScoreLoader={setScoreLoader} />
      </div>
      <div className="w-full h-96 p-5 lg:p-10 flex flex-col items-center justify-center">
        {scoreLoader ? (
          <Loader />
        ) : showScore ? (
          <ScoreResult score={score} />
        ) : error ? (
          <Error />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
