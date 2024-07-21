import React, { useState } from "react";
import PreferenceNav from "./PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { cpp } from "@codemirror/lang-cpp";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import toast from "react-hot-toast";
import SmallLoading from "../SmallLoading.jsx";

const Playground = () => {
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState(vscodeDark);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(`#include <iostream>
  using namespace std;
  
  int main() {
      cout << "Hello World!";
      return 0;
  }
  
  
  
  
  
  
  
  `);

  const handleRun = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language: "cpp", code }),
      });
      console.log("debugg");
      const data = await response.json();
      setOutput(data.output);
      toast.success("Code executed successfully!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleSubmit = () => {
    // Logic to handle the submit button click
    console.log("Submit button clicked");
  };

  return (
    <div className="flex flex-col relative">
      <PreferenceNav
        onFontSizeChange={(size) => setFontSize(size)}
        onThemeChange={(theme) => setTheme(theme)}
      />

      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[50, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={code}
            theme={theme}
            extensions={[cpp()]}
            style={{ fontSize }}
            onChange={(value, viewUpdate) => setCode(value)}
          />
        </div>
        <div className="w-full overflow-auto">
          <Tabs>
            <TabList>
              <Tab>Input</Tab>
              <Tab>Output</Tab>
            </TabList>

            <TabPanel>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-24 p-2 bg-gray-800 text-white rounded"
                placeholder="Input"
              />
            </TabPanel>
            <TabPanel>
              <textarea
                value={output}
                readOnly
                className="w-full h-24 p-2 bg-gray-800 text-white rounded"
                placeholder="Output"
              />
            </TabPanel>
          </Tabs>
          <div className="flex justify-end space-x-2 mt-2">
            {loading ? (
              <SmallLoading />
            ) : (
              <button
                onClick={handleRun}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Run
              </button>
            )}

            <button
              onClick={handleSubmit}
              className="p-2 bg-green-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </Split>
    </div>
  );
};

export default Playground;
