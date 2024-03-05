import React from 'react';
import { CommandHistoryEntry } from '../types';

interface CommandHistoryProps {
    history: CommandHistoryEntry[];
    mode: string;
}

const CommandHistory: React.FC<CommandHistoryProps> = ({ history, mode }) => (
    <div className="history">
        {history.map((entry, index) => (
            mode === "verbose" ? (
                <div key={index}>
                    <p><strong>Command:</strong> {entry.command}</p>
                    <p><strong>Output:</strong> {entry.result}</p>
                </div>
            ) : (
                <p key={index}>{entry.result}</p>
            )
        ))}
    </div>
);

export default CommandHistory;
