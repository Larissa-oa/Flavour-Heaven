import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // More forceful scroll to top with a slight delay to ensure DOM is ready
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

      // As a fallback, also try to scroll the document element and body
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
