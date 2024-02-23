import React, { useState } from 'react';
import CommandInput from './CommandInput';
import CommandHistory from './CommandHistory';
import DisplayData from './DisplayData';
import { mockedData, CsvData } from '../components/MockedJson';

/**
 * Checks if a given key is a valid key of the current CSV data. We need this so it can work flexibly with
 * different CSVs with different keys and columns.
 * @param {string} key. The key to check!
 * @param {CsvData | undefined} sampleData A sample of the current CSV data to check against to allow for dynamic processing.
 * @returns {boolean} True if the key exists in the sample data; otherwise, false.
 */
function isKeyOfCurrentData(key: string, sampleData: CsvData | undefined): key is keyof CsvData {
    return sampleData ? key in sampleData : false;
}
/**
 * The main application component that provides a command prompt interface for interacting with CSV data.
 */
const App: React.FC = () => {
    const [command, setCommand] = useState('');
    const [history, setHistory] = useState<Array<{ command: string; result: string }>>([]);
    const [mode, setMode] = useState('brief');
    const [currentData, setCurrentData] = useState<CsvData[]>([]);
    const [searchResults, setSearchResults] = useState<CsvData[]>([]);

    /**
     * Handler for the input changes from the CommandInput component.
     * @param {string} newCommand The new command entered by the user.
     */
    const handleCommandInput = (newCommand: string) => {
        setCommand(newCommand);
    };

    /**
     * Executes the current command entered by the user.
     */
    const executeCommand = () => {
      let output = '';
      if (command.startsWith('mode ')) {
          const newMode = command.split(' ')[1];
          if (newMode === 'brief' || newMode === 'verbose') {
              setMode(newMode);
              output = `Mode set to ${newMode}`;
          }
      } else if (command.startsWith('load_file ')) {
          const filePath = command.split(' ')[1];
          const data = mockedData[filePath];
          if (data) {
              setCurrentData(data);
              // Do not clear searchResults here to allow 'view' command to control the display
              output = `Loaded data from ${filePath}`;
          } else {
              output = 'File not found';
          }
      } else if (command === 'view') {
          // Display the loaded data by setting searchResults to currentData
          setSearchResults(currentData);
          output = 'Displaying loaded data...';
      } else if (command.startsWith('search ')) {
          const regex = /^search (\w+)\s+(.+)$/;
          const match = command.match(regex);
          if (match) {
              const column = match[1];
              const value = match[2].toLowerCase();
              // Use the first item of currentData as a sample for key validation
              if (isKeyOfCurrentData(column, currentData[0])) {
                  const searchData = currentData.filter(row => {
                      const cellValue = row[column]?.toString().toLowerCase();
                      return cellValue?.includes(value);
                  });
                  if (searchData.length > 0) {
                      setSearchResults(searchData);
                      output = `Found ${searchData.length} results for "${value}" in ${column}`;
                  } else {
                      setSearchResults([]);
                      output = `No results found for "${value}" in ${column}`;
                  }
              } else {
                  output = `Invalid column name "${column}".`;
              }
          } else {
              output = "Invalid search format. Please use 'search <column> <value>'.";
          }
      }
      addToHistory(command, output);
      setCommand('');
  };  
    /**
     * Adds the executed command and its result to the history.
     * @param {string} command The command that was executed.
     * @param {string} result The result of the executed command.
     */
    const addToHistory = (command: string, result: string) => {
        setHistory(history => [...history, { command, result }]);
    };

    return (
        <div className="App">
            <h1>Command Prompt Interface</h1>
            <CommandInput command={command} onCommandChange={handleCommandInput} onExecuteCommand={executeCommand} />
            <CommandHistory history={history} mode={mode} />
            <DisplayData data={searchResults.length > 0 ? searchResults : searchResults} />
        </div>
    );
};

export default App;
