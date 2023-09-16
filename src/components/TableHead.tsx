import { ArrowIcon } from "./Icons";
import { Data } from "../App";

interface TableHeadProps {
  data: Data[];
  selectedColumn: string | null;
  setSelectedColumn: React.Dispatch<React.SetStateAction<string | null>>;
  asc: boolean;
  setAsc: React.Dispatch<React.SetStateAction<boolean>>;
  handleSort: (key: keyof Data, asc: boolean) => void;
}

const TableHead: React.FC<TableHeadProps> = (props) => {
  const { data } = props;

  const columnClickHandler = (key: string) => {
    // selected column is null upon 1st load
    if (props.selectedColumn === null) {
      props.setSelectedColumn(key);
      props.setAsc((prevAsc) => !prevAsc);
      props.handleSort(key as keyof Data, props.asc);
    }
    // sorting by new column
    else if (props.selectedColumn !== key) {
      props.setSelectedColumn(key);
      props.setAsc(false);
      props.handleSort(key as keyof Data, true);
    }
    // changing sort direction
    else {
      props.setAsc((prevAsc) => !prevAsc);
      props.handleSort(key as keyof Data, props.asc);
    }
  };

  return (
    <thead className="w-full">
      <tr>
        {Object.keys(data[0]).map((key, index) => (
          <th
            className={`px-2 sm:px-4 py-2 whitespace-nowrap cursor-pointer hover:scale-110 text-center ${
              props.selectedColumn === key ? "text-primary" : "text-white"
            }`}
            key={index}
            onClick={() => columnClickHandler(key)}
          >
            <div className="flex items-center justify-center">
              <span className="text-sm sm:text-base md:text-lg xl:text-xl">
                {key.toUpperCase()}
              </span>
              <ArrowIcon
                id={`${key}`}
                className={`text-sm sm:text-base md:text-lg xl:text-xl transition-all ${
                  ((props.selectedColumn === key) && props.asc) ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
