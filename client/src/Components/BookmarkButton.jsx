import React, { useState } from 'react';

const BookmarkButton = ({ problemId }) => {
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <button onClick={handleBookmark} className={`py-2 px-4 rounded ${bookmarked ? 'bg-red-500' : 'bg-gray-500'} text-white`}>
      {bookmarked ? 'Unbookmark' : 'Bookmark'}
    </button>
  );
};

export default BookmarkButton;
