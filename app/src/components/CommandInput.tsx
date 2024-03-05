import React from 'react';

/**
 * Represents an input component for entering commands.
 * Allows users to input commands and execute them.
 */

interface CommandInputProps {
    command: string;
    onCommandChange: (command: string) => void;
    onExecuteCommand: () => void;
}

/**
 * Functional component that renders an input field for entering commands.
 * @param {CommandInputProps} command The current command entered by the user.
 * @param {CommandInputProps} onCommandChange A function to be called when the command input changes.
 * @param {CommandInputProps} onExecuteCommand A function to be called when the user submits the command for execution.
 * @returns {JSX.Element} The rendered input field and execute button.
 */
const CommandInput: React.FC<CommandInputProps> = ({ command, onCommandChange, onExecuteCommand }) => (
    <form onSubmit={(e) => { e.preventDefault(); onExecuteCommand(); }}>
        <input type="text" value={command} onChange={(e) => onCommandChange(e.target.value)} />
        <button type="submit">Execute</button>
    </form>
);

export default CommandInput;
