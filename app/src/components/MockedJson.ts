// src/mockedJson.ts

/** Represents a single CSV data entry as a key-value pair where the key is the column name. */
export type CsvData = {
  [key: string]: string | number;
};

/** Represents a collection of CSV data grouped by dataset name, allowing for dynamic column names and types. */
export type MockedData = {
  [datasetName: string]: CsvData[];
};

/** Mocked CSV datasets with dynamic structures. */
export const mockedData: MockedData = {
  "dataset1.csv": [
    { id: 1, address: "123 Main St", value: 300000},
  ],
  "dataset2.csv": [
    { id: 1, address: "789 Pine St", value: 400000 },
    { id: 2, address: "200 Bronx St", value: 300000},
  ],
  "dataset3.csv": [
    { id: 1},
    { id: 2},
    { id: 3},
  ],
  "dataset4.csv": [
    { id: 1, address: " ", value: 400000 },
    { id: 2, address: " ", value: 300000},
    { id: 2, address: "240 Brook St", value: 300000},
  ]
};
