import React, { useEffect, useState } from "react";
import NoteContext from "./NoteContext";
import { getApi } from "../../Utils/apiFetch";

//create component
const NoteState = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      const result = await getApi();
      setData(result);
    };
    fetchDataFromApi();
  }, []);
  return (
    <NoteContext.Provider value={data}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;
