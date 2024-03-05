import React from 'react';

/** Represents props for the DisplayData component. */
interface DisplayDataProps {
  data: any[]; // Use 'any[]' to accept a wide range of data structures
}

/**
 * Type guard to check if a value is a Record.
 */
function isRecord(value: any): value is Record<string, any> {
  return typeof value === 'object' && value !== null;
}

/**
 * Renders CSV data in a table format.
 */
const DisplayData: React.FC<DisplayDataProps> = ({ data }) => {
  if (data.length === 0) return <p>Please load and view a csv.</p>;

  // Dynamically determine headers from the first item, if available
  const headers = data.length > 0 && isRecord(data[0]) ? Object.keys(data[0]) : [];

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
              <td key={`${index}-${header}`}>{isRecord(row) ? row[header] : ''}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayData;
