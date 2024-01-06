import React, { useState } from "react";

const FilterItem = (props) => {
  const apiResponse = props?.data?.filter || {};
  const filterArray = Object.entries(apiResponse);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const handleCheckboxChange = (filterType, value) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: {
        ...selectedFilters[filterType],
        [value]: !selectedFilters[filterType]?.[value],
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedFilters = {};
    Object.keys(selectedFilters).forEach((filterType) => {
      formattedFilters[filterType] = Object.keys(selectedFilters[filterType])
        .filter((value) => selectedFilters[filterType][value])
        .join(",");
    });
    props.onFiltersChange(formattedFilters);
  };
  //toggle view
  const toggleView = () => {showFilters?setShowFilters(false):setShowFilters(true)};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {filterArray.map((item, key) => {
          const title = item[0];
          return (
            <div
              className=" min-w-full rounded-lg px-10 py-1 mt-5 outline-none border-t border-b"
              key={key}
            >
              <div className="flex justify-between hover:cursor-pointer" onClick={toggleView}>
                <h1 className="font-extrabold text-gray-600">{title}</h1>
                <h1 className="font-extrabold">{showFilters ? "↓" : "↑"}</h1>
              </div>
              {showFilters &&
                item[1].map((child, index) => {
                  return (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={child}
                        name={title}
                        value={child}
                        checked={selectedFilters[title]?.[child] || false}
                        onChange={() => handleCheckboxChange(title, child)}
                      />
                      <label htmlFor={child}>{child}</label>
                    </div>
                  );
                })}
            </div>
          );
        })}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-black text-white px-2 py-1 rounded-lg my-5"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterItem;