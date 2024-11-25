import React, { useState, useEffect } from "react";
import logo from "../../images/logoSlimMom.png";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../REDUX/auth/operations";
import { fetchIngredients } from "../../REDUX/ingredients/operations";
import {
  fetchMeals,
  addMeals,
  deleteMeals,
} from "../../REDUX/meals/operations";

import { selectMealsList } from "../../REDUX/meals/selectors";
import { selectUserName } from "../../REDUX/user/selectors";
import { selectIngredientsList } from "../../REDUX/ingredients/selectors";
import { setTotalCalories, setDate } from "../../REDUX/calories/calories.Slice";

import UserSidebar from "../../components/UserSidebar";
import BurgerModal from "../../components/BurgerModal";
import MobileModal from "../../components/MobileModal";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Diary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPhone, setIsPhone] = useState(window.innerWidth <= 425);
  const [query, setQuery] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const mealsList = useSelector(selectMealsList);
  const name = useSelector(selectUserName);
  const ingredients = useSelector(selectIngredientsList);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    grams: Yup.number().required("Weight is required"),
  });

  const formatDate = (date) => {
    if (!date) return null;

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = ingredients.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredIngredients(filtered.slice(0, 10));
  };

  const formattedSelectedDate = formatDate(selectedDate);

  const filteredMeals = mealsList.filter(
    (elem) => elem.date === formattedSelectedDate
  );

  useEffect(() => {
    const totalCalories = filteredMeals.reduce(
      (acc, meal) => acc + meal.calories,
      0
    );
    dispatch(setTotalCalories(totalCalories));
  }, [filteredMeals, dispatch]);

  useEffect(() => {
    dispatch(setDate(formattedSelectedDate));
  }, [dispatch, formattedSelectedDate]);

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth <= 425);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          grams: "",
          calories: "",
          date: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const formattedDate = selectedDate ? formatDate(selectedDate) : null;
          const filteredCalories = ingredients.filter(
            (item) => item.title === values.name
          );
          const calories = (filteredCalories[0].calories * values.grams) / 100;
          const submitValues = {
            product: values.name,
            weight: values.grams,
            calories: calories.toFixed(0),
            date: formattedDate,
          };

          dispatch(addMeals(submitValues));
          setQuery("");
          resetForm();
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <section className="screen-max-width w-full h-[100vh] overflow-auto flex tablet:flex-col phone:flex-col">
            <div className="w-3/5 flex flex-col pl-6 pt-12 gap-20 tablet:w-full tablet:pt-2 tablet:pl-0 tablet:gap-14 phone:w-full phone:pl-0 phone:pt-2 phone:gap-8">
              <nav className="flex items-baseline gap-4 tablet:justify-between tablet:pb-2 tablet:items-center tablet:border-b-2 tablet:border-slate-300 phone:justify-between phone:pb-2 phone:items-center phone:border-b-2 phone:border-slate-300">
                <img
                  src={logo}
                  alt="Website Logo"
                  width={167}
                  height={66}
                  className="tablet:h-[50px] tablet:w-auto tablet:pl-6 phone:h-[44px] phone:w-auto phone:pl-4"
                />
                <div className="flex gap-6">
                  <div className="hidden tablet:flex items-center gap-3">
                    <p className="text-sm font-semibold text-slate-500">
                      {name}
                    </p>
                    <div className="bg-slate-300 h-6 w-[2px]"></div>
                    <button
                      onClick={() => dispatch(logout())}
                      type="button"
                      className="text-sm font-semibold text-slate-400"
                    >
                      Exit
                    </button>
                  </div>
                  {isModalOpen ? (
                    <IoClose
                      onClick={() => setModalOpen(false)}
                      className="hidden tablet:flex phone:flex w-6 h-6 flex-shrink-0 tablet:mr-6 phone:mr-4 text-slate-600"
                    />
                  ) : (
                    <RxHamburgerMenu
                      onClick={() => setModalOpen(true)}
                      className="hidden tablet:flex phone:flex w-6 h-6 flex-shrink-0 tablet:mr-6 phone:mr-4 text-slate-600"
                    />
                  )}
                </div>
                <div className="flex items-center gap-7 tablet:hidden phone:hidden">
                  <span className="bg-slate-300 h-8 w-[2px] tablet:hidden phone:hidden"></span>
                  <div className="flex flex-row gap-6 h-[17px] tablet:pr-6 phone:pr-4 tablet:hidden phone:hidden pt-1">
                    <button
                      onClick={() => {
                        navigate("/diary");
                      }}
                      className=" text-sm font-bold text-slate-500"
                    >
                      DIARY
                    </button>
                    <button
                      onClick={() => {
                        navigate("/calculator");
                      }}
                      className="text-slate-300 text-sm font-bold hover:text-slate-500 focus:text-slate-500 transition-all duration-300"
                    >
                      CALCULATOR
                    </button>
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-12 tablet:pl-6 pb-14 phone:gap-8 phone:pl-4">
                <div className="w-[270px] phone:w-[180px]">
                  <DatePicker
                    className="w-full text-slate-800 text-3xl phone:text-xl font-bold placeholder:text-2xl placeholder:text-slate-800 text-center flex justify-center items-center"
                    showIcon
                    icon={
                      <FaCalendarAlt
                        style={{
                          width: isPhone ? "20px" : "30px",
                          height: isPhone ? "20px" : "30px",
                          top: isPhone ? "2px" : "none",
                        }}
                      />
                    }
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd.MM.yyyy"
                    placeholderText="Select a date!"
                  />
                </div>
                <Form className="flex flex-col phone:hidden">
                  <div className="flex flex-wrap items-center justify-between w-full max-w-[435px] tablet:pr-2 phone:w-full">
                    <div className="relative">
                      <Field
                        value={query}
                        onChange={(e) => {
                          handleInputChange(e);
                        }}
                        id="name"
                        name="name"
                        type="string"
                        placeholder="Enter product name"
                        className="w-60 bg-transparent border-b-2 outline-none pb-2 text-slate-400 font-bold focus:text-slate-600 focus:border-slate-600 placeholder:focus:text-slate-600 hover:text-slate-600 hover:border-slate-600"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="absolute text-red-500"
                      />
                      {filteredIngredients.length > 0 && (
                        <ul className="absolute bg-white shadow-md rounded-lg mt-2 w-60 max-h-40 overflow-y-auto z-10">
                          {filteredIngredients.map((item) => (
                            <li
                              key={item._id}
                              className="px-4 py-2 hover:bg-slate-100 cursor-pointer"
                              onClick={() => {
                                setQuery(item.title);
                                setFieldValue("name", item.title);
                                setFilteredIngredients([]);
                              }}
                            >
                              {item.title}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="relative">
                      <Field
                        id="grams"
                        name="grams"
                        type="number"
                        placeholder="Grams"
                        className="text-center w-20 bg-transparent border-b-2 outline-none pb-2 text-slate-400 font-bold focus:text-slate-600 focus:border-slate-600 placeholder:focus:text-slate-600 hover:text-slate-600 hover:border-slate-600"
                      />
                      <ErrorMessage
                        name="grams"
                        component="div"
                        className="absolute text-red-500"
                      />
                    </div>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="bg-orange-500 text-white px-2 py-2 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 flex justify-center items-center"
                    >
                      <GoPlus className="w-8 h-8" />
                    </button>
                  </div>
                </Form>
                <div className="flex flex-col h-72 w-full max-w-[570px] overflow-auto pr-4 tablet:pr-0 phone:pr-0">
                  <ul className="flex flex-col gap-4">
                    {filteredMeals.length > 0 ? (
                      filteredMeals.map((elem) => (
                        <li
                          key={elem._id}
                          className="flex flex-row gap-4 tablet:gap-2 phone:gap-2 items-end hover:border-slate-600 group h-[45px]"
                        >
                          <p className="overflow-auto whitespace-nowrap w-full max-w-66 bg-transparent border-b-2 pb-2 text-slate-400 text-sm font-semibold tablet:text-xs phone:text-[10px] group-hover:text-slate-600 group-hover:border-slate-600">
                            {elem.product}
                          </p>
                          <p className="w-14 min-w-14 tablet:w-12 tablet:min-w-12 phone:w-10 phone:min-w-10 bg-transparent border-b-2 pb-2 text-slate-400 text-sm font-semibold tablet:text-xs phone:text-[10px] group-hover:text-slate-600 group-hover:border-slate-600 text-center">
                            {elem.weight} <span>g</span>
                          </p>
                          <p className="w-20 min-w-20 tablet:w-[70px] tablet:min-w-[70px] phone:w-[55px] phone:min-w-[55px] bg-transparent border-b-2 pb-2 text-slate-400 text-sm font-semibold tablet:text-xs phone:text-[10px] group-hover:text-slate-600 group-hover:border-slate-600 text-end">
                            {elem.calories} <span>kcal</span>
                          </p>
                          <button
                            type="button"
                            className="group-hover:scale-125 transition-all duration-200 self-center"
                          >
                            {
                              <IoClose
                                onClick={() => dispatch(deleteMeals(elem._id))}
                                className="w-6 h-6 text-slate-400 phone:w-4 phone:h-4"
                              />
                            }
                          </button>
                        </li>
                      ))
                    ) : (
                      <p className="text-slate-400 text-sm font-semibold">
                        No meals available yet.
                      </p>
                    )}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  className="phoneMin:hidden self-center w-12 h-12 bg-orange-500 text-white px-2 py-2 rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 flex justify-center items-center"
                >
                  <GoPlus className="w-8 h-8" />
                </button>
              </div>
            </div>
            <UserSidebar></UserSidebar>
          </section>
        )}
      </Formik>
      {isModalOpen && <BurgerModal />}
      {isMobileOpen && (
        <MobileModal date={selectedDate} onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
};

export default Diary;
