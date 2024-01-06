import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
import ShimmerUi from "./ShimmerUi";
import { Link } from "react-router-dom";

const HomePage = () => {
  const data = useContext(NoteContext);

  if (!data || !data.collectionsList) {
    return <ShimmerUi />;
  }

  return (
    <>
      <div className="homepage">
        <div className="min-h-64 min-w-[100dvw] bg-slate-400 flex flex-wrap justify-center gap-5 py-5">
          {data.collectionsList.map((items) => (
            <Link
              key={items._id}
              to={`/product/${items.collection_id}`}
            >
              <section className="collection cursor-pointer">
                <img
                  src={items?.image?.src}
                  alt={items?.image?.alt}
                  className="w-56 h-56 object-cover rounded-lg"
                />
                <h2 className="text-center mt-2 text-wrap font-bold">
                  {items.title}
                </h2>
              </section>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
