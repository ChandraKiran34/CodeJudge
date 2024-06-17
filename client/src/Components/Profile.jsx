import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="text-gray-700"><strong>Username:</strong> {user.userId}</p>
      <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
      <p className="text-gray-700"><strong>Date of Birth:</strong> {new Date(user.dob).toLocaleDateString()}</p>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Solved Problems</h2>
        <ul>
          {user.solved_problems.map((problemId, index) => (
            <li key={index} className="text-blue-500 hover:underline">{problemId}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Notes</h2>
        {user.notes.map((note, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded mt-2">
            <p>{note.note}</p>
            <span className="text-sm text-gray-600">{new Date(note.created_at).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
