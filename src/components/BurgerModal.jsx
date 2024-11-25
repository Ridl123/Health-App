import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../REDUX/auth/operations";
import { selectUserName } from "../REDUX/user/selectors";

const BurgerModal = () => {
  // Retrieving the user's name from the Redux store using a selector.
  const name = useSelector(selectUserName);

  // Initializing the navigate function from react-router-dom to handle navigation.
  const navigate = useNavigate();

  // Using the dispatch function to trigger Redux actions.
  const dispatch = useDispatch();

  return (
    // Creating a modal with styling for mobile and tablet views.
    <div className="w-full h-full tablet:h-full phone:h-full bg-sky-900 absolute top-[68px] phone:top-[62px] right-0 left-0 z-20 flex flex-col items-center pt-10 gap-6">
      {/* Adding a section for displaying the user's name and a logout button, hidden on tablets. */}
      <div className="tablet:hidden flex items-center justify-end gap-3 self-end pr-2 mb-10">
        {/* Displaying the user's name in bold text. */}
        <p className="font-bold text-xl text-slate-200">{name}</p>

        {/* Adding a decorative vertical line. */}
        <div className="bg-slate-300 h-6 w-[2px]"></div>

        {/* Creating a logout button that dispatches the logout action when clicked. */}
        <button
          onClick={() => dispatch(logout())}
          type="button"
          className="font-bold text-xl text-slate-400 hover:text-slate-200"
        >
          Exit
        </button>
      </div>

      {/* Adding a navigation button to the Diary page. */}
      <button
        type="button"
        onClick={() => navigate("/diary")}
        className="font-bold text-2xl text-slate-400 hover:text-slate-200"
      >
        DIARY
      </button>

      {/* Adding a navigation button to the Calculator page. */}
      <button
        type="button"
        onClick={() => navigate("/calculator")}
        className="font-bold text-2xl text-slate-400 hover:text-slate-200"
      >
        CALCULATOR
      </button>
    </div>
  );
};

export default BurgerModal;
