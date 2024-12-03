import React, { useState } from "react";
import logo from "../../images/logoSlimMom.png";
import css from "./Calculator.module.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUser } from "../../REDUX/user/operations";
import { logout } from "../../REDUX/auth/operations";
import { selectUserCurrent, selectUserName } from "../../REDUX/user/selectors";

import UserSidebar from "../../components/UserSidebar";
import BurgerModal from "../../components/BurgerModal";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Calculator = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUserCurrent);
  const name = useSelector(selectUserName);

  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [selectedValue, setSelectedValue] = useState("Blood type *");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value, setFieldValue) => {
    setSelectedValue(value);
    setFieldValue("blood", value);
    setIsOpen(false);
  };

  const validationSchema = Yup.object({
    height: Yup.number().required("Height is required"),
    desWeight: Yup.number().required("Desired weight is required"),
    age: Yup.number().required("Age is required"),
    blood: Yup.string().required("Blood type is required"),
    weight: Yup.number().required("Current weight is required"),
  });

  return (
    <>
      <Formik
        initialValues={{
          height: "",
          desWeight: "",
          age: "",
          blood: "",
          weight: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const { height, desWeight, age, blood } = values;

          const BMR = 10 * desWeight + 6.25 * height - 5 * age + 5;
          const calories = parseInt((BMR * 1.55).toFixed(0));

          const submitValues = {
            calories: calories,
            height: height,
            age: age,
            bloodType: blood,
          };
          console.log(user._id, submitValues);
          dispatch(
            updateCurrentUser({ accountId: user._id, data: submitValues })
          );
          setSelectedValue("Blood type *");
          resetForm();
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <section className="screen-max-width w-full h-[100vh] overflow-auto flex tablet:flex-col phone:flex-col">
            <div className="w-3/5 flex flex-col pl-6 pr-6 tablet:pr-0 phone:pr-0 pt-12 gap-20 tablet:w-full tablet:pt-2 tablet:pl-0 tablet:gap-14 phone:w-full phone:pl-0 phone:pt-2 phone:gap-8">
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
                      className="text-slate-300 text-sm font-bold hover:text-slate-500 focus:text-slate-500 transition-all duration-300"
                    >
                      DIARY
                    </button>
                    <button
                      onClick={() => {
                        navigate("/calculator");
                      }}
                      className="text-sm font-bold text-slate-500"
                    >
                      CALCULATOR
                    </button>
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-12 tablet:pl-6 phone:pl-5 tablet:pr-6">
                <h2 className="text-slate-800 text-3xl font-bold w-4/5 tablet:w-10/12 phone:w-10/12 phone:text-lg">
                  Calculate your daily calorie intake right now
                </h2>
                <Form className="flex flex-col">
                  <div className="flex flex-wrap gap-8  w-full phone:w-full">
                    <div className="relative">
                      <Field
                        id="height"
                        name="height"
                        type="number"
                        placeholder="Height (in cm) *"
                        className="w-60 bg-transparent border-b-2 outline-none pb-2 text-slate-400 font-bold focus:text-slate-600 focus:border-slate-600 placeholder:focus:text-slate-600 hover:text-slate-600 hover:border-slate-600"
                      />
                      <ErrorMessage
                        name="height"
                        component="div"
                        className="absolute text-red-500"
                      />
                    </div>
                    <div className="relative">
                      <Field
                        id="desWeight"
                        name="desWeight"
                        type="number"
                        placeholder="Desired weight (in kg) *"
                        className="w-60 bg-transparent border-b-2 outline-none pb-2 text-slate-400 font-bold focus:text-slate-600 focus:border-slate-600 placeholder:focus:text-slate-600 hover:text-slate-600 hover:border-slate-600"
                      />
                      <ErrorMessage
                        name="desWeight"
                        component="div"
                        className="absolute text-red-500"
                      />
                    </div>
                    <div className="relative">
                      <Field
                        id="age"
                        name="age"
                        type="number"
                        placeholder="Age *"
                        className="w-60 bg-transparent border-b-2 outline-none pb-2 text-slate-400 font-bold focus:text-slate-600 focus:border-slate-600 placeholder:focus:text-slate-600 hover:text-slate-600 hover:border-slate-600"
                      />
                      <ErrorMessage
                        name="age"
                        component="div"
                        className="absolute text-red-500"
                      />
                    </div>
                    <div className="relative">
                      <div
                        className={`${css.customDropdown} w-60 bg-transparent border-b-2 outline-none pb-2 text-slate-400 font-bold focus:text-slate-600 focus:border-slate-600 hover:text-slate-600 hover:border-slate-600`}
                      >
                        <div className="w-full h-full" onClick={handleToggle}>
                          {selectedValue}
                        </div>
                        {isOpen && (
                          <ul className={css.dropdownMenu}>
                            <li
                              onClick={() => handleSelect("O", setFieldValue)}
                            >
                              O
                            </li>
                            <li
                              onClick={() => handleSelect("A", setFieldValue)}
                            >
                              A
                            </li>
                            <li
                              onClick={() => handleSelect("B", setFieldValue)}
                            >
                              B
                            </li>
                            <li
                              onClick={() => handleSelect("AB", setFieldValue)}
                            >
                              AB
                            </li>
                          </ul>
                        )}
                      </div>
                      <ErrorMessage
                        name="blood"
                        component="div"
                        className="absolute text-red-500"
                      />
                    </div>
                    <div className="relative">
                      <Field
                        id="weight"
                        name="weight"
                        type="number"
                        placeholder="Current weight (in kg) *"
                        className="w-60 bg-transparent border-b-2 outline-none pb-2 text-slate-400 font-bold focus:text-slate-600 focus:border-slate-600 placeholder:focus:text-slate-600 hover:text-slate-600 hover:border-slate-600"
                      />
                      <ErrorMessage
                        name="weight"
                        component="div"
                        className="absolute text-red-500"
                      />
                    </div>
                  </div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-orange-500 text-white px-6 py-3 rounded-full w-52 mt-10 mb-12 hover:bg-orange-600 hover:scale-105 transition-all duration-300"
                  >
                    Start losing weight
                  </button>
                </Form>
              </div>
            </div>
            <UserSidebar></UserSidebar>
          </section>
        )}
      </Formik>
      {isModalOpen && <BurgerModal />}
    </>
  );
};

export default Calculator;
