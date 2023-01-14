import { useState, useEffect } from "react";
import Pagination from "./Pagination.js";

import Loading from "./Loading.js";
import Search from "./Search.js";

export default function Capsules() {
  const [stat, setStat] = useState("All");
  const [active, setActive] = useState([]);
  const [retired, setRetired] = useState([]);
  const [capsules, setCapsules] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchCapsules = async () => {
      const res = await fetch("https://api.spacexdata.com/v4/capsules");
      const data = await res.json();
      setCapsules(data);
      setActive(data.filter((capsule) => capsule.status === "active"));
      setRetired(data.filter((capsule) => capsule.status === "retired"));
    };

    fetchCapsules();
  }, [active, retired]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = capsules.slice(indexOfFirstPost, indexOfLastPost);

  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <>
      {!capsules || !active ? (
        <Loading />
      ) : (
        <section className="py-32">
          <h1 className="heading text-center mb-10">Capsules</h1>
          <div className="flex justify-center">
            <button
              style={
                stat === "active"
                  ? { backgroundColor: "cyan", color: "black" }
                  : {}
              }
              className="btn"
              onClick={() => setStat("active")}
            >
              Active
            </button>
            <button
              style={
                stat === "retired"
                  ? { backgroundColor: "cyan", color: "black" }
                  : {}
              }
              className="btn"
              onClick={() => setStat("retired")}
            >
              Retired
            </button>
            <button
              style={
                stat === "All"
                  ? { backgroundColor: "cyan", color: "black" }
                  : {}
              }
              className="btn"
              onClick={() => setStat("All")}
            >
              All
            </button>
          </div>
          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {stat === "active" &&
              active.map((prop) => {
                return <Search key={prop.id} {...prop} />;
              })}
            {stat === "retired" &&
              retired.map((prop) => {
                return <Search key={prop.id} {...prop} />;
              })}
            {stat === "All" &&
              currentPosts.map((prop) => {
                return (
                  <>
                    <Search key={prop.id} {...prop} />
                  </>
                );
              })}
          </div>
          {stat === "All" && (
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={capsules.length}
              paginateBack={paginateBack}
              paginateFront={paginateFront}
              currentPage={currentPage}
            />
          )}
        </section>
      )}
    </>
  );
}
