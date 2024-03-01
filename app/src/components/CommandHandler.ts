/**
 * A utility class for handling the registration and execution of commands.
 * Commands are registered with this class along with their corresponding functionality.
 */

type CommandFunction = (args: string[]) => string | Promise<string>;

export class CommandHandler {

    private commands: Map<string, CommandFunction> = new Map();

    /**
     * Registers a new command with the provided name and function.
     * @param {string} name The name of the command.
     * @param {CommandFunction} fn The command's function.
     */
    registerCommand(name: string, fn: CommandFunction) {
        this.commands.set(name, fn);
    }

    /**
     * Executes the command associated with the given name.
     * @param {string} name The name of the command to execute.
     * @param {string[]} args The arguments to pass to the command function.
     * @returns {Promise<string>} A promise resolving to the result of the command execution.
     * If the command is not found, an error message is returned.
     */
    async executeCommand(name: string, args: string[]): Promise<string> {
        const command = this.commands.get(name);
        if (command) {
            return await command(args);
        }
        return `Error: Command "${name}" not found.`;
    }

}
