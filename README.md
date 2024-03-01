
# Project Details

Project name: Mock

Team members: mkim104 and elhong

Total estimate time: -- hours

Github repo link: https://github.com/cs0320-s24/mock-mkim104-elhong.git

# Design Choices

## Relationship between classes and interfaces:

The App class is the main application component of our project. It serves as the entry point for users to interact with CSV data through a command-line interface within a React environment. Indeed, after being prompted to login, users can input commands to perform various operations on CSV data. A history of executed commands and their results is maintained for reference and a display area is provided to view CSV data or search results.

App utilizes the CommandHandler class to manage and execute user commands effectively, which registers commands and handles their execution based on user input. Moreover, the CommandInput constant, which accepts input of type interface CommandInputProps, is integrated into the App class, allowing users to input commands. Through the CommandHistory constant, which accepts input of type interface CommandHistoryProps, previously executed commands and their results are stored and displayed to the users within the App. In addition, the App class interacts with the DisplayData constant, which accepts input of type interface DisplayDataProps, to render CSV data or search results into a table format for user visualization. Finally, MockedJson contains Mocked CSV datasets with dynamic structures that can be accessed in the load_file command in App.

## Data structures used:
In this program, we made several data structures choices to facilitate command handling and application functionality. 

First, the CommandHandler component employs a Map data structure to associate command names with their corresponding functions (CommandFunction). By storing commands in a separate class, we ensure a personalizable and extensible architecture. As such, other web developers can easily register and modify commands by calling the registerCommand method, providing a command name and its associated function. This separation allows for future customization and extension of command functionalities without directly changing the main application logic.

In addition, we have structured our Mocked JSON files to support dynamic CSV datasets with varying structures. By defining TypeScript types for CsvData and MockedData, we enable flexibility in representing datasets with different column names and types. This approach allows us to simulate diverse real-world scenarios, allowing for robust testing and adaptability to varying data structures.

... [add anything?]


# Errors/Bugs
We currently have not identified any errors or bugs related to our code. However, the extent of the edge cases we considered ins limited. For instance, we considered the case where a CSV file data entry is an empty string, but we did not consider the scenario where the CSV file itself is malformed with inconsistent row or column sizes. Therefore, there risks to be errors for these types of extreme cases. But, for the purposes of this sprint, we have rigorously tested our functionality and found no major errors. 

# Tests
We implemented six testing files for our program. To begin, "command_history" tests the visible output for changing modes when executing commands, ensuring that command history results are properly displayed in both verbose and brief mode. Next, in "expected_user_flow", we test for the anticipated regular usage of our program, being that the user logs in, loads a csv file, views the csv file, and searches the file. The "login" file tests the login button display and functionality, ensuring that users can only perform commands when logged in. Finally, the files "load", "view", and "search" test for any edge cases of these commands, such as calling commands with invalid inputs, searching on malformed files, and viewing or searching without first loading a file. As such, we test for different shapes of command and result, as well as the different rechable states of our program.

# How to

To run the tests, navigate to the "tests/e2e" folder in your terminal and run "npx playwright test".

To build and run our program, end users of our web application must first login by clicking the login button. This will bring them to the second page, where they can enter the following commands into the command prompt:

1. load_file <csv-file-path>
2. view
3. search <column> <value>

Users can also change the formatting of the command history output by entering "mode brief" or "mode verbose" into the command line.

For web developers using our command-prompt library, they can begin our program by running `npm start` or `yarn start` in the terminal. If they wish to do so, they can personalize commands within the App class.

# Collaboration
n/a
