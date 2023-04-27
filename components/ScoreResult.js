export default function ScoreResult({ score }) {
  return (
    <div className="w-[70%] lg:w-[30%] h-[50%] lg:h-48 bg-gradient-to-r from-green-300 via-green-400 to-green-500 rounded-3xl p-5 pt-0 flex flex-col items-center justify-between">
      <div className="w-full p-2 text-white text-xl font-bold rounded-b-3xl bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 flex items-center justify-center lg:text-3xl lg:font-extrabold">
        Predicted Score
      </div>
      <div className="text-white text-xl font-bold bg-[#2d8014] py-2 px-5 border-2 rounded-xl lg:text-2xl">
        {score}
      </div>
    </div>
  );
}
