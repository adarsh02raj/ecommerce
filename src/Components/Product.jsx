import { Link, useParams } from "react-router-dom";
import { getProductsForCollection } from "../Utils/apiFetch";
import { useEffect, useState } from "react";
import ShimmerUi from "./ShimmerUi";
import "../styles/universal.css";
import FilterItem from "./FilterItem";

const Product = () => {
  const [product, setProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState("");
  const itemsPerPage = 8;
  const { collectionId } = useParams();
  const [receivedFilters, setReceivedFilters] = useState({});

  // pagination start
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setCurrentPage(1);
    setSelectedValue(event.target.value);
  };
  //pagination end

  // received formattedFilters
  const handleReceivedFilters = (receivedFilters) => {
    setReceivedFilters(receivedFilters);
  };
  //end reciving

  //appear
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [collectionId, currentPage, selectedValue, receivedFilters]);

  //fetch Data
  const fetchData = async () => {
    const result = await getProductsForCollection(
      collectionId,
      itemsPerPage,
      currentPage,
      selectedValue,
      receivedFilters
    );

    setProduct(result);
  };

  if (!product) return <ShimmerUi />;
  else
    return (
      <div className="collection-page flex justify-start">
        <div className="w-2/12 ">
          <div className="sort min-w-full flex justify-center">
            <div className="a-z">
              <select
                className="min-w-full rounded-lg px-10 py-1 mt-5 outline-none border-t border-b "
                required
                defaultValue={""}
                onChange={handleSelectChange}
              >
                <option value="" disabled hidden className="hover:bg-none">
                  Sort By
                </option>
                <option value="A to Z" key="sort_a-z">
                  Sort By A-Z
                </option>
                <option value="Z to A" key="sort_z-a">
                  Sort By Z-A
                </option>
              </select>
            </div>
          </div>
          <div className="filter min-w-full flex justify-center">
            <FilterItem
              data={product}
              onFiltersChange={handleReceivedFilters}
            />
          </div>
        </div>
        <div className="right w-10/12 my-5 mx-5">
          <div className="product-card grid grid-cols-4 gap-4">
            {product?.docs?.map((item) => (
              <Link
                to={`/productPage/${item.id}`}
                key={item.id}
                state={{ item }}
              >
                <div
                  // key={item.id}
                  className="p-4 rounded-lg bg-white cursor-pointer hover:shadow-md flex flex-col justify-center "
                >
                  <div className="img-box w-full h-48 overflow-hidden rounded-lg flex justify-center items-center my-5">
                    <img
                      src={item?.image?.src}
                      alt={item?.image?.alt}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="detail-box text-left ml-2 my-2">
                    <p>{item.title}</p>
                    <span className="text-gray-600">
                      <span
                        style={{ fontWeight: "bold" }}
                        className="font-light"
                      >
                        ₹
                      </span>{" "}
                      {item.variants[0].price}
                    </span>
                    {item?.variants[0]?.compare_at_price ? (
                      <span className="ml-5 text-slate-70000 line-through">
                        <span
                          style={{ fontWeight: "bold" }}
                          className="font-light"
                        >
                          ₹
                        </span>{" "}
                        {`${item.variants[0].compare_at_price} `}
                      </span>
                    ) : null}
                    <p className="vendor font-semibold">{item?.vendor}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="pagination min-w-full flex justify-center align-middle my-5">
            {product.totalDocs > itemsPerPage && (
              <div className="flex justify-between">
                <button
                  style={
                    currentPage === 1
                      ? { display: "none" }
                      : { display: "block" }
                  }
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border px-6 py-1 rounded-lg text-white bg-slate-900 hover:cursor-pointer"
                >
                  Prev
                </button>
                <p className="border py-2 px-5 mx-5">{currentPage}</p>
                <button
                  style={
                    currentPage === product?.totalPages
                      ? { display: "none" }
                      : { display: "block" }
                  }
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === product.totalPages}
                  className="border px-6 py-1 rounded-lg text-white bg-slate-900 hover:cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default Product;
