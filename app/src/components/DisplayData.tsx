import React from 'react';

interface CsvData {
  id: number;
  address: string;
  value: string;
}

interface DisplayDataProps {
  data: CsvData[];
}

const DisplayData: React.FC<DisplayDataProps> = ({ data }) => {
  if (data.length === 0) return <p>No data to display.</p>;

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
