import React from 'react';

/** Represents the structure of CSV data. */
interface CsvData {
  id: number;
  address: string;
  value: string;
}

/** Represents props for the DisplayData component. */
interface DisplayDataProps {
  data: CsvData[];
}

/**
 * Renders CSV data in a table format.
 * @param {DisplayDataProps} data The CSV data to be displayed.
 * @returns {JSX.Element} The rendered table containing the CSV data.
 */
const DisplayData: React.FC<DisplayDataProps> = ({ data }) => {
  if (data.length === 0) return <p>Please load and view a csv.</p>;

  // Extract column headers
  const headers = Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => (
              <td key={`${index}-${header}`}>{row[header as keyof CsvData]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayData;
