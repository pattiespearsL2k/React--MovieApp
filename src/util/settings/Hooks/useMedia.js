import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function useMedia(mediaQuery) {
  let [isMatched, setIsMatched] = useState(
    window.matchMedia(mediaQuery).matches
  );

  useEffect(() => {
    let media = window.matchMedia(mediaQuery);

    if (media.matches !== isMatched) {
      setIsMatched(media.matches);
    }

    let listener = () => setIsMatched(media.matches);

    // media.addListener(listener);
    if (media.addEventListener) {
      media.addEventListener("change", listener);
    } else {
      // for safari
      media.addListener(listener);
    }
    //clean up
    return () => {
      // media.removeListener(listener);
      // media.removeEventListener("change", listener);
      if (media.removeEventListener) {
        media.removeEventListener("change", listener);
      } else {
        media.removeListener(listener);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaQuery]);

  return isMatched;
}
// let small = useMedia("(max-width:400px)")
// let large = useMedia("(min-width:800px)")
useMedia.propTypes = {
  mediaQuery: PropTypes.string.isRequired,
};

export default useMedia;
