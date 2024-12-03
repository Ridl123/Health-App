import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../REDUX/auth/operations";
import { selectUserName } from "../REDUX/user/selectors";

const BurgerModal = () => {
  const name = useSelector(selectUserName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="w-full h-full tablet:h-full phone:h-full bg-sky-900 absolute top-[68px] phone:top-[62px] right-0 left-0 z-20 flex flex-col items-center pt-10 gap-6">
      <div className="tablet:hidden flex items-center justify-end gap-3 self-end pr-2 mb-10">
        <p className="font-bold text-xl text-slate-200">{name}</p>
        <div className="bg-slate-300 h-6 w-[2px]"></div>
        <button
          onClick={() => dispatch(logout())}
          type="button"
          className="font-bold text-xl text-slate-400 hover:text-slate-200"
        >
          Exit
        </button>
      </div>
      <button
        type="button"
        onClick={() => navigate("/diary")}
        className="font-bold text-2xl text-slate-400 hover:text-slate-200"
      >
        DIARY
      </button>
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
