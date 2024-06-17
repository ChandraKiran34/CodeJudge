import React from 'react';

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Rank</th>
            <th className="py-2">User</th>
            <th className="py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index} className="text-center">
              <td className="py-2">{entry.rank}</td>
              <td className="py-2">{entry.user}</td>
              <td className="py-2">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
