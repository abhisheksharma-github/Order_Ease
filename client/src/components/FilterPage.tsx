export type FilterOptionsState = {
  id: string;
  label: string;
};
const FilterOptions: FilterOptionsState[] = [
  {
    id: "burger",
    label: "burger",
  },
  {
    id: "Momo",
    label: "Momo",
  },
  {
    id: "Pizza",
    label: "Pizza",
  },
  {
    id: "Chilli Potato",
    label: "Chilli Potato",
  },
];
const FilterPage = () => {
  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by Dish's</h1>
        <button className="bg-orange-400 hover:bg-orange-500 text-black font-semibold py-2 px-4 rounded-full shadow-md transition-colors">
          Reset
        </button>
      </div>
      {FilterOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2 my-5">
          <input
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            type="checkbox"
            id={option.id}
            name={option.label}
          />
          <label htmlFor={option.id} className="ml-2">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};
export default FilterPage;
