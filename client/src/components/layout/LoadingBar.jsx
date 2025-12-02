import { useLoading } from '../../context/LoadingContext';
import '../../styles/LoadingBar.css';

const LoadingBar = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loading-bar-container">
      <div className="loading-bar">
        <div className="loading-bar-progress"></div>
      </div>
    </div>
  );
};

export default LoadingBar;
