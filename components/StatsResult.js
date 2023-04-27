import { useState } from "react";

export default function StatsResult({ data, filter }) {
  const totalRows = data.length;
  const [limit, setLimit] = useState(20);
  const handleLimit = () => {
    if (limit + 20 < totalRows) setLimit(limit + 20);
    else setLimit(totalRows);
  };
  return (
    <div className="mt-10">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-3 py-3">
                S No.
              </th>
              <th scope="col" className="px-3 py-3">
                Player name
              </th>
              <th scope="col" className="px-3 py-3">
                Count
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              (row, index) =>
                index < limit && (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index+1}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {row[0]}
                    </th>
                    <td className="px-6 py-4">
                      {row[4]
                        ? row[4]
                        : row[3]
                        ? row[3]
                        : row[2]
                        ? row[2]
                        : row[1]}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={handleLimit}
            className={`${
              limit >= totalRows ? "hidden" : null
            } mt-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2 text-center mr-5 mb-2 `}
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  );
}
