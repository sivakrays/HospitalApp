import React from "react";
import ReactLoading from 'react-loading';
import '../../Utility/Utility.css'

const Loader = () => {
  return (
    <>
      <div className="loader-center">
        <ReactLoading
          type={"spokes"}
          color={"#3ea9c7"}
          height={100}
          width={100}
        />
      </div>
    </>
  );
};

export default Loader;
