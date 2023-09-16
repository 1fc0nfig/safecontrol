import React, { useEffect } from "react";
import TableHead from "./TableHead";
import { Data, colorIdents } from "../App";
import { useState } from "react";

interface TableProps {
  inputData: Data[];
}

const Table: React.FC<TableProps> = (props) => {
  const { inputData } = props;
  
  const [sortedData, setSortedData] = useState<Data[]>(inputData);
  const [asc, setAsc] = useState<boolean>(true);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [coloredCells, setColoredCells] = useState<string[]>([]);
  const [coloredRows, setColoredRows] = useState<string[]>([]);

  // Sort data by key in ascending or descending order, passed to TableHead as prop
  const sortData = (key: keyof Data, asc: boolean, data: Data[]) => {
    console.time("sortData");
    const newData: Data[] = [...data].sort((a, b) => {
      if (a[key] > b[key]) {
        return asc ? 1 : -1;
      }
      if (a[key] < b[key]) {
        return asc ? -1 : 1;
      }
      return 0;
    });

    console.timeEnd("sortData");
    return newData;
  };

  // Sorting handler for child components: used in TableHead
  const handleSort = (key: keyof Data, asc: boolean) => {
    const newData = sortData(key, asc, sortedData);
    setSortedData(newData);
  }

  // Search for containing searchTerm in data values
  const searchData = (searchTerm: string, data: Data[]) => {
    console.time("search");
    const newData = [...data].filter((item) => {
      return Object.values(item).some((value) => {
        return value
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase().trim());
      });
    });

    console.timeEnd("search");
    return newData;
  }

  // search handler for the searchbar: filters data by search input
  const handleSearch = (searchTerm: string) => {
    // reset data if search is empty
    if (searchTerm === "") {
      // TODO Sort filtered data
      const sortedData = sortData(selectedColumn as keyof Data, !asc, inputData);
      setSortedData(sortedData);
      return;
    }

    // search for searchTerm in data
    const newData = searchData(searchTerm, inputData);

    // No results found
    if (newData.length === 0) {
      setSortedData([
        {
          id: " ",
          name: " ",
          description: " ",
          colorIdent: " ",
        },
      ] as Data[]);
    } else {
      // sort data by selected column and set it as sortedData
      const sortedData = sortData(selectedColumn as keyof Data, !asc, newData);
      setSortedData(sortedData);
    }
    return;
  };

  // selects color for cell: helper function for colorCells()
  const selectColor = (id: string) => {
    // get id from cell id
    const parsedId = id.split("-")[0];
    // get colorIdent from data, return color
    const colorIdent = inputData.find((item) => item.id === parsedId)?.colorIdent;
    const color = colorIdents.find((item) => item.ident === colorIdent)?.props
      .color;

    // letting TS know that color is string
    return color!;
  };

  // recolor cells: helper function for useEffect
  const colorCells = () => {
    const cells = document.querySelectorAll("td");
    cells.forEach((cell) => {
      // get color for each cell
      const color: string = selectColor(cell.id);
      if (coloredCells.includes(cell.id)) {
        cell.style.backgroundColor = color!;
      } else {
        cell.style.backgroundColor = "";
      }
    });
  };

  // recolor cells on data change / cell click
  useEffect(() => {
    // recolor the cells
    colorCells();
    // calculate selected rows from colored cells
    const selectedRows: string[] = [];
    coloredCells.forEach((cell) => {
      const row = cell.split("-")[0];
      if (!selectedRows.includes(row)) {
        selectedRows.push(row);
      }
    });

    // set colored rows
    setColoredRows(selectedRows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedData, coloredCells]);

  return (
    <div className="w-full overflow-x-none lg:w-1/2">
      {/* Searchbar wrapper */}
      <div className="flex items-center justify-center m-4">
        <div className="flex items-center justify-center w-1/2">
          <input
            className="w-full px-2 py-1 text-white bg-secondary-100 rounded-md outline-none ring-1 ring-white focus:ring-2 focus:ring-primary"
            type="text"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      {/* Colored cells list */}
      <div className="flex items-center justify-center m-4 overflow-y-scroll overflow-x-hidden">
        <div className="flex items-center justify-center w-1/2">
          <span className="text-white">
            {coloredRows.length === 0
              ? "No colored cells"
              : coloredRows
                  .filter((cell) => cell !== "")
                  .map((cell) => cell + ", ")
                  .join("")
                  .slice(0, -2)
                  .toString()}
          </span>
        </div>
      </div>
      <table className="m-auto w-full ring-1 ring-white rounded-md bg-secondary-100">
        {/* THead */}
        <TableHead data={sortedData} selectedColumn={selectedColumn} setSelectedColumn={setSelectedColumn} asc={asc} setAsc={setAsc} handleSort={handleSort} />
        <tbody className="w-full">
          {/* Mapping sortedData to DOM, every cell gets an id based on its row and column (IDXXX and index) */}
          {/* Cell click handler adds/removes its id to coloredCells array */}
          {sortedData.map((item, index) => (
            <tr className="odd:bg-secondary-200" key={item.id}>
              {Object.values(item).map((value, index) => (
                <td
                  className="px-2 sm:px-4 py-2 text-white border-t-2 border-spacing-y-1 border-white text-center text-xs sm:text-sm md:text-base xl:text-lg cursor-pointer"
                  key={(item.id + "-" + index).toString()}
                  id={(item.id + "-" + index).toString()}
                  onClick={() => {
                    if (
                      coloredCells.includes((item.id + "-" + index).toString())
                    ) {
                      setColoredCells(
                        coloredCells.filter(
                          (cell) => cell !== (item.id + "-" + index).toString()
                        )
                      );
                    } else {
                      setColoredCells([
                        ...coloredCells,
                        (item.id + "-" + index).toString(),
                      ]);
                    }
                  }}
                >
                  {/* Display the value */}
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
