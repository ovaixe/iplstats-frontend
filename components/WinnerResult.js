export function WinnerResult({ winner }) {
  return (
    <div className="w-[90%] lg:w-[40%] h-auto bg-gradient-to-r from-green-300 via-green-400 to-green-500 rounded-3xl p-5 pt-0 flex flex-col items-center justify-between space-y-5">
      <div className="w-full p-3 text-white text-xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-b-3xl flex justify-center lg:text-3xl lg:font-extrabold">
        Winning Team
      </div>
      <img
        src={`teams/${winner}.png`}
        className="w-48 h-28 lg:w-72 lg:h-48 rounded-3xl"
      ></img>
      <div className="text-white text-sm font-bold bg-[#2d8014] p-2 border-2 rounded-3xl flex justify-center lg:text-2xl">
        {winner}
      </div>
    </div>
  );
}

export function WinningProbability({ winner, battingTeam, bowlingTeam }) {
  return (
    <div className="w-full lg:w-[40%] h-auto bg-gradient-to-r from-green-300 via-green-400 to-green-500 rounded-3xl p-5 pt-0 flex flex-col items-center justify-between space-y-5">
      <div className="w-full p-3 text-white text-xl font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-b-3xl flex justify-center lg:text-3xl lg:font-extrabold">
        Results
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="space-y-3">
          <img
            src={`teams/${battingTeam}.png`}
            className="w-32 h-20 lg:w-48 lg:h-32 rounded-3xl"
          ></img>
          <div className="text-white text-sm font-bold bg-[#2d8014] p-2 border-2 rounded-3xl flex justify-center lg:text-2xl">
            {winner[`${battingTeam}`]}%
          </div>
        </div>

        <div className="space-y-3">
          <img
            src={`teams/${bowlingTeam}.png`}
            className="w-32 h-20 lg:w-48 lg:h-32 rounded-3xl"
          ></img>
          <div className="text-white text-sm font-bold bg-[#2d8014] p-2 border-2 rounded-3xl flex justify-center lg:text-2xl">
            {winner[`${bowlingTeam}`]}%
          </div>
        </div>
      </div>
    </div>
  );
}
