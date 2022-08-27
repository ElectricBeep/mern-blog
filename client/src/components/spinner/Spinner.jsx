import Loader from "react-loader-spinner";

import "./spinner.css";

const Spinner = ({ message }) => {
  return (
    <div className="spinnerContainer">
      <Loader
        type="Circles"
        color="black"
        height={50}
        width={200}
        className="spinner"
      />
      <p className="spinnerText">
        {message}
      </p>
    </div>
  )
}

export default Spinner