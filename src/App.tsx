/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import Table from "./components/Table";

export interface ColorIdent {
  ident: string;
  props: {
    color: string;
  };
}

export interface Data {
  id: string;
  name: string;
  description: string;
  colorIdent: string;
}

export const colorIdents: ColorIdent[] = [
  {
    ident: "un",
    props: {
      color: "red",
    },
  },
  {
    ident: "deux",
    props: {
      color: "green",
    },
  },
  {
    ident: "trois",
    props: {
      color: "blue",
    },
  },
];

// Pics random color ident from the input list
const generateRandomColorIdent = (colorIdents: ColorIdent[]) => {
  const randomIndex = Math.floor(Math.random() * colorIdents.length);
  return colorIdents[randomIndex].ident;
};

// Generate random data for the table, length is the number of rows
const generateData = (length: number, colorIdents: ColorIdent[]) => {
  

  const data: Data[] = [];
  for (let i = 0; i <= length - 1; i++) {
    const id = `ID${i.toString().padStart(length.toString().length, "0")}`
    const name = Math.random().toString(36).substring(7);
    const description = Math.random().toString(36).substring(7);
    const colorIdent = generateRandomColorIdent(colorIdents);
    data.push({ id, name, description, colorIdent });
  }
  return data;
};

const App = () => {
  const [data, setData] = useState<Data[]>(generateData(1000, colorIdents));

  return (
    <div className="container mx-auto flex flex-col justify-center items-center m-5">
      {/* <h1 className="text-white text-5xl mb-4">Hello world!</h1> */}
      <Table inputData={data}/>
    </div>
  );
}

export default App;
