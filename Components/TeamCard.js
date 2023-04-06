export default function TeamCard({ team }) {
  let winningSeasons = team.winning_seasons.split("-");
  winningSeasons = winningSeasons.filter((season) => season !== "#");
  return (
    <div className="w-96 h-96 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
      <img
        className="w-full h-48"
        src={team.logo}
        alt="Sunset in the mountains"
      />
      <div className="flex flex-col items-center">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{team.name}</div>
        </div>
        <div className="px-6 pt-4 pb-2">
          {winningSeasons.map((season, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{season}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
