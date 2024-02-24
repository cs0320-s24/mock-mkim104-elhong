// src/mockedJson.ts
export interface CsvData {
  id: number;
  address: string;
  value: string;
}

export interface MockedData {
  [key: string]: CsvData[];
}

export const mockedData: MockedData = {
  "dataset1.csv": [
    { id: 1, address: "123 Main St", value: "$300,000" },
  ],
  "dataset2.csv": [
    { id: 1, address: "789 Pine St", value: "$400,000" },
    { id: 2, address: "200 Bronx St", value: "$300,000" },
    { id: 3, address: "434 Providence St", value: "$200,000" },
    { id: 4, address: "42 Jern St", value: "$100,000" },
    { id: 5, address: "432 Elmer St", value: "$400,000" },
  ],
};
