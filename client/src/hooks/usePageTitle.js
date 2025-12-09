import { useEffect } from 'react';

// Used for setting the browser tab title dynamically 
// based on the current page.
const usePageTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} - Reddit` : 'Reddit';
    
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export default usePageTitle;
