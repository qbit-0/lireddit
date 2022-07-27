import { useState, useEffect } from "react";

const useIsHydration = () => {
  const [isHydration, setIsHydration] = useState(true);
  useEffect(() => {
    setIsHydration(false);
  });

  return isHydration;
};

export default useIsHydration;
