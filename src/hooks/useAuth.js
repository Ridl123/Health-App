import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../REDUX/auth/selectors";

// Custom hook for authentication, which returns the user's authentication details.
export const useAuth = () => {
  // Getting the authentication state from Redux (whether the user is logged in or not).
  const isLoggedIn = useSelector(selectIsLoggedIn);

  // Getting the logged-in user's details from Redux.
  const user = useSelector(selectUser);

  // Returning the authentication status and user information.
  return { isLoggedIn, user };
};
