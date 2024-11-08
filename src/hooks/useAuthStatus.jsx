import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const useAuthStatus = () => {
  const { user } = useSelector((state) => state.auth);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [checkedIn, setCheckedIn] = useState(true);
  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckedIn(false);
  }, [user]);

  return { isLoggedIn, checkedIn };
};
export default useAuthStatus;
