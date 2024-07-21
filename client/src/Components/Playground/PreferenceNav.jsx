import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineFullscreen, AiOutlineSetting } from "react-icons/ai";

const PreferenceNav = ({ onFontSizeChange, onThemeChange }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState("vscodeDark");


  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleFontSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setFontSize(newSize);
    onFontSizeChange(newSize);
  };

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    onThemeChange(newTheme);
  };

  return (
    <div className="flex items-center justify-between h-11 w-full">
      <div className="flex items-center text-white">
        <button className="flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2 px-2 py-1.5 font-medium">
          <div className="flex items-center px-1">
            <div className="text-s text-label-2 dark:text-dark-label-2">
              cpp
            </div>
          </div>
        </button>
      </div>
      <div className="flex items-center justify-between m-2">
        <button
          className="preferenceBtn group"
          onClick={() => setIsSettingsOpen(true)}
        >
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg mr-4">
            <AiOutlineSetting />
          </div>
          <div className="preferenceBtn-tooltip">Settings</div>
        </button>

        <button className="preferenceBtn group" onClick={handleFullScreen}>
          <div className="h-4 w-4 text-dark-gray-6 font-bold text-lg">
            <AiOutlineFullscreen />
          </div>
          <div className="preferenceBtn-tooltip">Full Screen</div>
        </button>
      </div>

      <Modal
        isOpen={isSettingsOpen}
        onRequestClose={() => setIsSettingsOpen(false)}
        contentLabel="Editor Settings"
        className="bg-dark-layer-5 p-5 rounded-lg border-white"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-white mb-4">Editor Settings</h2>
        <div className="mb-4">
          <label className="block text-white mb-2">Font Size</label>
          <input
            type="number"
            value={fontSize}
            onChange={handleFontSizeChange}
            className="p-2 rounded bg-dark-fill-3 text-white border-2 border-blue-500" // Highlighted border for changed input
          />
        </div>
        {/* <div className="mb-4">
          <label className="block text-white mb-2">Theme</label>
          <select
            value={theme}
            onChange={handleThemeChange}
            className="p-2 rounded bg-dark-fill-3 text-white border-2 border-blue-500" // Highlighted border for changed input
          >
            <option value="vscodeDark">VS Code Dark</option>
            <option value="light">Light</option> 
            // add more themes as needed
          </select>
        </div> */}
        <button
          onClick={() => setIsSettingsOpen(false)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default PreferenceNav;
