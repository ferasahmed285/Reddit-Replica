import '../../styles/LoadingSpinner.css';

export const LoadingSpinner = ({ text }) => (
  <div className="loading-spinner">
    <div className="loading-spinner__circle" />
    {text && <p className="loading-text">{text}</p>}
  </div>
);
