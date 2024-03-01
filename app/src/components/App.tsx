import React, { useEffect, useState } from "react";
import { CommandHandler } from "./CommandHandler";
import CommandInput from "./CommandInput";
import CommandHistory from "./CommandHistory";
import DisplayData from "./DisplayData";
import { mockedData, CsvData } from "../components/MockedJson";

// Other imports and utility functions...
/**
 * Checks if a given key is a valid key of the current CSV data. We need this so it can work flexibly with
 * different CSVs with different keys and columns.
 * @param {string} key The key to check!
 * @param {CsvData | undefined} sampleData A sample of the current CSV data to check against to allow for dynamic processing.
 * @returns {boolean} True if the key exists in the sample data; otherwise, false.
 */
function isKeyOfCurrentData(
  key: string,
  sampleData: CsvData | undefined
): key is keyof CsvData {
  return sampleData ? key in sampleData : false;
}

/**
 * The main application component that provides a command prompt interface for interacting with CSV data.
 */
const App: React.FC = () => {
    const [command, setCommand] = useState("");
    const [history, setHistory] = useState<
      Array<{ command: string; result: string, verboseResult?: string }>
    >([]);
    const [mode, setMode] = useState("brief");
    const [currentData, setCurrentData] = useState<CsvData[]>([]);
    const [searchResults, setSearchResults] = useState<CsvData[]>([]);
    const [isLoggedin, setIsLoggedIn] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false); // Add state to track if data has been loaded
    const commandHandler = new CommandHandler();

  
  /**
   * Handler for the login button.
   */
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  /**
   * Handler for the input changes from the CommandInput component.
   * @param {string} newCommand The new command entered by the user.
   */
  const handleCommandInput = (newCommand: string) => {
    setCommand(newCommand);
  };

  /**
   * Registers the commands. Commands can be added or modified by web developers here.
   */
  useEffect(() => {
    commandHandler.registerCommand("mode", (args: Array<string>) => {
      const newMode = args[0];
      if (newMode === "brief" || newMode === "verbose") {
        setMode(newMode);
        return `Mode set to ${newMode}`;
      } else {
        return "Invalid mode";
      }
    });

    // Registering the load file command
    commandHandler.registerCommand("load_file", (args: Array<string>) => {
        const filePath = args[0];
        const data = mockedData[filePath];
        if (data) {
          setCurrentData(data);
          setDataLoaded(true); // Set dataLoaded to true when data is successfully loaded
          return `Loaded data from ${filePath}`;
        } else {
          setDataLoaded(false); // Optionally set to false if load fails, depending on desired behavior
          return "File not found";
        }
      });
      // Registering the view  command
      commandHandler.registerCommand("view", () => {
          if (!dataLoaded) { // Check if data has been loaded instead of checking currentData's length
            return "No file has been loaded yet.";
          } else {
            setSearchResults(currentData);
            return "Displaying loaded data...";
          }
      });
    
    // Registering the search command
    commandHandler.registerCommand("search", (args: Array<string>) => {
      const regex = /^search (\w+)\s+(.+)$/;
      const match = command.match(regex);
      if (match) {
        const column = match[1];
        const value = match[2].toLowerCase();
        // Use the first item of currentData as a sample for key validation
        if (isKeyOfCurrentData(column, currentData[0])) {
          const searchData = currentData.filter((row) => {
            const cellValue = row[column]?.toString().toLowerCase();
            return cellValue?.includes(value);
          });
          if (searchData.length > 0) {
            setSearchResults(searchData);
            return `Found ${searchData.length} results for "${value}" in ${column}`;
          } else {
            setSearchResults([]);
            return `No results found for "${value}" in ${column}`;
          }
        } else {
          return `Invalid column name "${column}".`;
        }
      } else {
        return "Invalid search format. Please use 'search <column> <value>'.";
      }
    });
  });

  /**
   * Executes the current command entered by the user.
   */
  const executeCommand = async () => { 
    const parts = command.split(' '); 
    const commandName = parts.shift() || '';
    const args = parts; 
  
    // Check if the command is registered
    if (commandHandler.isCommandRegistered(commandName)) {
      const outputPromise = commandHandler.executeCommand(commandName, args);
      const output = await outputPromise; // Adjust based on the actual implementation
  
      if (mode === "verbose") {
        // In verbose mode, add both command and output to history, displayed on separate lines
        addToHistory(command, output, `Command: ${command}\nOutput: ${output}`);
      } else {
        // In brief mode, just add the output
        addToHistory(command, output);
      }
    } else {
      // Handle unregistered commands by adding a specific message to the history
      const errorMessage = "Unrecognized command";
      addToHistory(command, errorMessage, `Command: ${command}\nOutput: ${errorMessage}`);
    }
    setCommand(''); 
  };
  

  /**
   * Adds the executed command and its result to the history, with optional verbose formatting.
   * @param {string} command The command that was executed.
   * @param {string} result The result of the executed command.
   * @param {string} [verboseResult] Optional formatted result for verbose mode.
   */
  const addToHistory = (command: string, result: string, verboseResult?: string) => {
    setHistory((history) => [...history, { command, result, verboseResult: verboseResult || result }]);
  };

  return (
    <div className="App">
      {!isLoggedin ? (
        <div>
          <h1>Welcome, please log in.</h1>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h1>Command Prompt Interface</h1>
          <h2>You are logged in</h2>
          <CommandInput
            command={command}
            onCommandChange={handleCommandInput}
            onExecuteCommand={executeCommand}
          />
          <CommandHistory history={history} mode={mode} />
          <DisplayData
            data={searchResults.length > 0 ? searchResults : searchResults}
          />
        </div>
      )}
    </div>
  );
};

export default App;
