import React from 'react';

interface CommandInputProps {
    command: string;
    onCommandChange: (command: string) => void;
    onExecuteCommand: () => void;
}

const CommandInput: React.FC<CommandInputProps> = ({ command, onCommandChange, onExecuteCommand }) => (
    <form onSubmit={(e) => { e.preventDefault(); onExecuteCommand(); }}>
        <input type="text" value={command} onChange={(e) => onCommandChange(e.target.value)} />
        <button type="submit">Execute</button>
    </form>
);

export default CommandInput;
