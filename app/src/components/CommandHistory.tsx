import React from 'react';
import { CommandHistoryEntry } from '../types';

/**
 * This class stores the history of commands made, which is displayed to users in the App class.
 * @param {history} The list of entries made
 * @param {mode} Controls how the command history is displayed
 */

interface CommandHistoryProps {
    history: CommandHistoryEntry[];
    mode: string;
}

/**
 * Functional component that renders the command history.
 * @param {CommandHistoryProps} history The command history entries and display mode.
 * @returns {JSX.Element} The rendered command history.
 */
const CommandHistory: React.FC<CommandHistoryProps> = ({ history, mode }) => (
    <div className="history">
        {history.map((entry, index) => (
            <p key={index}>{mode === "verbose" ? `Command: ${entry.command} Output: ${entry.result}` : entry.result}</p>
        ))}
    </div>
);

export default CommandHistory;
