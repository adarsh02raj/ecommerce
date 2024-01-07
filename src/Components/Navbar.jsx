import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDataForSearch } from "../Utils/apiFetch";
import { useSelector } from "react-redux";
import "../styles/popup.css";

const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [close, setClose] = useState(false);
  const [page, setPage] = useState(0);
  const quantityState = useSelector((state) => state.cart.cartQuantity);
  // console.log(data);
  // console.log(quantityState);
  const uniqueProductCount = useSelector((state) => state.cart.uniqueProductCount);
  useEffect(() => {
    const fetchDataFromApi = async () => {
      const result = await fetchDataForSearch(searchText, page, 10);
      setData(result);
    };
    setTimeout(() => {
      fetchDataFromApi();
    }, 500);
    if (searchText === "") setClose(false);
    else setClose(true);
  }, [searchText, page, uniqueProductCount]);
  useEffect(() => {
    setPage(0);
  }, [searchText]);
  const handleClose = () => {
    setClose(!close);
  };
  const handleMore = () => {
    setPage((page) => (page = page + 1));
  };
  return (
    <>
      <nav className="bg-gray-800 p-4 flex justify-between items-center sticky top-0 shadow-md shadow-gray-700 px-10 translate-x-0">
        {/* Left Nav */}
        <div className="flex items-center">
          <Link to={"/"}>
            <h1 className="text-white text-lg font-bold">Ecommerce</h1>
          </Link>
        </div>

        {/* Right Nav */}
        <div className="flex">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search product..."
              className="px-3 py-1 rounded-l-md focus:outline-none"
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-r-md">
              Search
            </button>
            {close && (
              <div className="serach-box w-72">
                <div className="item">
                  {data?.docs?.length === 0
                    ? "No Results Found!"
                    : data?.docs?.map((product, index) => {
                        return (
                          <div key={index} className="flex">
                            <div className="image">
                              <img
                                src={product?.image?.src}
                                alt="auto-search"
                                style={{
                                  width: "30px",
                                  aspectRatio: "auto 70 / 99",
                                  height: "49px",
                                }}
                                className="rounded-lg p-1 m-1"
                              />
                            </div>
                            <div className="details">
                              <h4>{product?.title}</h4>
                            </div>
                          </div>
                        );
                      })}
                </div>
                <div className="bg-gray-300 flex justify-between px-10">
                  <div
                    className="text-red-600 hover:cursor-pointer"
                    onClick={handleClose}
                  >
                    close
                  </div>
                  <div
                    className="text-green-500 hover:cursor-pointer"
                    onClick={handleMore}
                  >
                    more...
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="ml-5 focus:cursor-pointer bg-white rounded-lg px-5 items-center">
            <Link to={"/cart"}>
              Cart
              {uniqueProductCount > 0 && (
                <span className="text-white font-semibold ml-2 fixed top-1 bg-yellow-800 rounded-full px-2">
                  {uniqueProductCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
