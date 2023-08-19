import "./spinner.css";

const Spinner = ({ styles }) => {
  return (
    <div style={styles ? styles : null} className="spinner-container">
      <div className="spinner"></div>
      <h2>Loading...</h2>
    </div>
  );
};

export default Spinner;
