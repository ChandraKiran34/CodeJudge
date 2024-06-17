import React, { useState } from 'react';

const Notes = ({ problemId }) => {
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  const handleAddNote = () => {
    const newNote = { problemId, note, created_at: new Date() };
    setNotes([...notes, newNote]);
    setNote('');
  };

  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold mb-2">Notes</h3>
      <textarea value={note} onChange={e => setNote(e.target.value)} className="w-full h-32 border rounded p-2" placeholder="Add a note..."></textarea>
      <button onClick={handleAddNote} className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Add Note
      </button>
      <div className="mt-4">
        {notes.map((n, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded mt-2">
            <p>{n.note}</p>
            <span className="text-sm text-gray-600">{new Date(n.created_at).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
