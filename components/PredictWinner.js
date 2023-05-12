import { useState } from "react";
import Loader from "./Loader";
import Error from "./Error";
import SelectBattingTeam from "./SelectBattingTeam";
import SelectBowlingTeam from "./SelectBowlingTeam";
import PredictWinnerForm from "./PredictWinnerForm";
import { WinningProbability } from "./WinnerResult";

export default function PredictMatchWinner(props) {
  const [battingTeam, setBattingTeam] = useState(null);
  const [bowlingTeam, setBowlingTeam] = useState(null);
  const [winner, setWinner] = useState(null);
  const [error, setError] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [winnerLoader, setWinnerLoader] = useState(false);

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
        <PredictWinnerForm
          battingTeam={battingTeam}
          bowlingTeam={bowlingTeam}
          setWinner={setWinner}
          setError={setError}
          setShowWinner={setShowWinner}
          setWinnerLoader={setWinnerLoader}
        />
      </div>
      <div className="w-full h-[500px] p-5 flex flex-col items-center justify-center lg:p-10">
        {winnerLoader ? (
          <Loader />
        ) : showWinner ? (
          <WinningProbability
            winner={winner}
            battingTeam={battingTeam}
            bowlingTeam={bowlingTeam}
          />
        ) : error ? (
          <Error />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
