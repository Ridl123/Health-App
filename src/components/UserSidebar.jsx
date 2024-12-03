import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../REDUX/auth/operations";
import { selectUserName, selectUserCurrent } from "../REDUX/user/selectors";
import { selectCalories, selectDate } from "../REDUX/calories/selectors";

import { fetchCurrentUser } from "../REDUX/user/operations";

const UserSidebar = () => {
  const dispatch = useDispatch();
  const name = useSelector(selectUserName);
  const user = useSelector(selectUserCurrent);
  const caloriesTotal = useSelector(selectCalories);
  const date = useSelector(selectDate);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <section className="bg-image-home w-2/5 flex flex-col pt-12 gap-24 bg-neutral-100 pl-8 tablet:w-full tablet:h-full tablet:pt-16 tablet:pb-16 tablet:pl-6 tablet:pr-6 phone:w-full phone:h-full phone:pt-16 phone:pb-16 phone:pl-3 phone:pr-3">
      <div className="flex justify-end items-center gap-3 mt-8 pr-6 tablet:hidden phone:hidden">
        <p className="text-sm font-bold text-slate-500">{name}</p>
        <div className="bg-slate-300 h-8 w-[2px] tablet:hidden phone:hidden"></div>
        <button
          onClick={() => dispatch(logout())}
          type="button"
          className="text-sm font-bold text-slate-400"
        >
          Exit
        </button>
      </div>
      <div className="flex flex-col gap-14 tablet:flex-row tablet:flex-wrap tablet:w-full">
        <div className="flex flex-col gap-6 tablet:w-72">
          <h3 className="text-base font-bold text-slate-800">
            Summary for {date}
          </h3>
          <div className="flex flex-row justify-between w-full max-w-72 tablet:w-full phone:w-full">
            <ul className="flex flex-col gap-2 pl-6">
              <li className="text-base font-thin text-slate-400">Left</li>
              <li className="text-base font-thin text-slate-400">Consumed</li>
              <li className="text-base font-thin text-slate-400">Daily rate</li>
              <li className="text-base font-thin text-slate-400">
                n% of normal
              </li>
            </ul>
            <ul className="flex flex-col gap-2 pr-3 tablet:pr-0 phone:pr-0">
              <li className="text-base font-thin text-slate-400 text-end">
                {user.calories
                  ? `${user.calories - caloriesTotal} kcal`
                  : "000 kcal"}
              </li>
              <li className="text-base font-thin text-slate-400 text-end">
                {user.calories ? `${caloriesTotal} kcal` : "000 kcal"}
              </li>
              <li className="text-base font-thin text-slate-400 text-end">
                {user.calories ? `${user.calories} kcal` : "000 kcal"}
              </li>
              <li className="text-base font-thin text-slate-400 text-end">
                {user.calories
                  ? `${((caloriesTotal / user.calories) * 100).toFixed(0)} %`
                  : "0 %"}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-base font-bold text-slate-800">
            Food not recommended
          </h3>
          <ul className="pl-4 flex flex-col gap-1">
            <li className="text-base font-thin text-slate-400">
              - Highly Processed Foods
            </li>
            <li className="text-base font-thin text-slate-400">
              - Sugary Beverages
            </li>
            <li className="text-base font-thin text-slate-400">
              - Fried and Fast Foods
            </li>
            <li className="text-base font-thin text-slate-400">
              - Refined Carbohydrates
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default UserSidebar;
