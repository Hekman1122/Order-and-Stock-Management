type Props = {
  dataArray: string[];
  title: string;
  typeForData: string;
};

export default function Select({ dataArray, title, typeForData }: Props) {
  return (
    <div className="flex items-center gap-4">
      <label htmlFor="user" className="font-bold text-neutral-500">
        {title}
      </label>
      <select
        name={typeForData}
        id={typeForData}
        className="border-2 w-40 px-4 py-2 border-neutral-700 rounded-xl text-sm font-semibold text-neutral-500"
      >
        {dataArray.map((value) => {
          return (
            <option defaultValue={value} key={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
}
