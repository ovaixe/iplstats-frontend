export default function SelectBattingTeam({
  battingTeam,
  bowlingTeam,
  setBattingTeam,
}) {
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

  return (
    <div className="w-[90%] h-[50%] p-3 lg:mx-10 pt-0 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 rounded-3xl flex flex-col items-center lg:w-[40%]">
      <div className="w-[70%] h-10 lg:w-[50%] lg:h-16 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 rounded-b-3xl flex items-center justify-center">
        <h1 className="text-sm text-white font-bold lg:text-lg lg:font-extrabold">
          Batting Team
        </h1>
      </div>
      {battingTeam && battingTeam !== "Choose a team" ? (
        <img
          src={`teams/${battingTeam}.png`}
          className="w-48 h-28 lg:w-72 lg:h-48 rounded-3xl mt-5"
        ></img>
      ) : (
        <></>
      )}
      <div className="text-sm font-black text-[#f9de84] py-3 px-0 lg:text-3xl lg:font-bold">
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
            <option key={index} disabled={bowlingTeam === team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
