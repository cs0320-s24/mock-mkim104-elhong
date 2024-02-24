import React from 'react';
import { CommandHistoryEntry } from '../types';

interface CommandHistoryProps {
    history: CommandHistoryEntry[];
    mode: string;
}

const CommandHistory: React.FC<CommandHistoryProps> = ({ history, mode }) => (
    <div className="history">
        {history.map((entry, index) => (
            <p key={index}>{mode === "verbose" ? `Command: ${entry.command} Output: ${entry.result}` : entry.result}</p>
        ))}
    </div>
);

export default CommandHistory;
