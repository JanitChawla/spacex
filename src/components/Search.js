import React, { useState } from "react";

const Search = (prop) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  const handleClick = () => {
    setShowModal(true);
    fetch(`https://api.spacexdata.com/v4/capsules/${prop.id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  };
  return (
    <>
      <article key={prop.id} className="articles">
        <h2 className="text-xl font-bold mb-5">
          {prop.type},{" "}
          <span className="text-base opacity-75 font-light">{prop.serial}</span>
        </h2>
        <ul>
          <li className="mb-1">{prop.launches.length} launches</li>
          <button
            className="bg-amber-50 text-black active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={handleClick}
          >
            More Info
          </button>
          {prop.status === "active" ? (
            <li className="text-emerald-500">Active</li>
          ) : (
            <li className="text-rose-500">Retired</li>
          )}
        </ul>
      </article>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {data.type}
                    {", " + data.serial}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <ul>
                    {/* <li className="mb-1">{data.launches.length} launches</li> */}
                    <li className="mb-1">{data.land_landings} land landings</li>

                    <li className="mb-1">
                      {data.water_landings} water landings
                    </li>
                    <li className="mb-1">Reused {data.reuse_count} times</li>
                    <li className="mb-1">Id: {data.id}</li>
                  </ul>
                </div>
                {/*footer*/}
                <p className="mt-5 opacity-75">
                  Last location : {prop.last_update}
                </p>
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Search;
