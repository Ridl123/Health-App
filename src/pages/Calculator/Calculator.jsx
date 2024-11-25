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
  const navigate = useNavigate(); // Hook to navigate between routes
  const dispatch = useDispatch(); // Redux hook to dispatch actions

  const user = useSelector(selectUserCurrent); // Select current user data from Redux store
  const name = useSelector(selectUserName); // Select the user's name from Redux store

  const [isOpen, setIsOpen] = useState(false); // State for controlling the visibility of the dropdown menu
  const [isModalOpen, setModalOpen] = useState(false); // State for controlling the visibility of the burger menu modal

  const [selectedValue, setSelectedValue] = useState("Blood type *"); // State for storing the selected blood type

  // Toggle function for opening and closing the blood type dropdown
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Handle the blood type selection and update the form field value
  const handleSelect = (value, setFieldValue) => {
    setSelectedValue(value);
    setFieldValue("blood", value); // Set the selected blood type in the form state
    setIsOpen(false); // Close the dropdown menu
  };

  // Validation schema for the form fields using Yup
  const validationSchema = Yup.object({
    height: Yup.number().required("Height is required"),
    desWeight: Yup.number().required("Desired weight is required"),
    age: Yup.number().required("Age is required"),
    blood: Yup.string().required("Blood type is required"),
    weight: Yup.number().required("Current weight is required"),
  });

  return (
    <>
      {/* Formik form for handling user inputs */}
      <Formik
        initialValues={{
          height: "",
          desWeight: "",
          age: "",
          blood: "",
          weight: "",
        }}
        validationSchema={validationSchema} // Attach validation schema
        onSubmit={(values, { resetForm }) => {
          // Handle form submission
          const { height, desWeight, age, blood } = values;

          // Calculate BMR using the given formula
          const BMR = 10 * desWeight + 6.25 * height - 5 * age + 5;
          // Calculate daily calorie intake by multiplying BMR with an activity factor (1.55)
          const calories = parseInt((BMR * 1.55).toFixed(0));

          // Prepare the data to be sent to the Redux store
          const submitValues = {
            calories: calories,
            height: height,
            age: age,
            bloodType: blood,
          };

          // Dispatch action to update user data in Redux store
          console.log(user._id, submitValues);
          dispatch(
            updateCurrentUser({ accountId: user._id, data: submitValues })
          );
          setSelectedValue("Blood type *"); // Reset the blood type dropdown
          resetForm(); // Reset the form after submission
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <section className="screen-max-width w-full h-[100vh] overflow-auto flex tablet:flex-col phone:flex-col">
            <div className="w-3/5 flex flex-col pl-6 pr-6 tablet:pr-0 phone:pr-0 pt-12 gap-20 tablet:w-full tablet:pt-2 tablet:pl-0 tablet:gap-14 phone:w-full phone:pl-0 phone:pt-2 phone:gap-8">
              {/* Navigation Bar with logo and logout option */}
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
                      {name} {/* Display the user's name */}
                    </p>
                    <div className="bg-slate-300 h-6 w-[2px]"></div>
                    <button
                      onClick={() => dispatch(logout())} // Logout button dispatching the logout action
                      type="button"
                      className="text-sm font-semibold text-slate-400"
                    >
                      Exit
                    </button>
                  </div>
                  {/* Hamburger menu or close icon depending on the modal state */}
                  {isModalOpen ? (
                    <IoClose
                      onClick={() => setModalOpen(false)} // Close modal on click
                      className="hidden tablet:flex phone:flex w-6 h-6 flex-shrink-0 tablet:mr-6 phone:mr-4 text-slate-600"
                    />
                  ) : (
                    <RxHamburgerMenu
                      onClick={() => setModalOpen(true)} // Open modal on click
                      className="hidden tablet:flex phone:flex w-6 h-6 flex-shrink-0 tablet:mr-6 phone:mr-4 text-slate-600"
                    />
                  )}
                </div>
              </nav>

              {/* Form for calculating calorie intake */}
              <div className="flex flex-col gap-12 tablet:pl-6 phone:pl-5 tablet:pr-6">
                <h2 className="text-slate-800 text-3xl font-bold w-4/5 tablet:w-10/12 phone:w-10/12 phone:text-lg">
                  Calculate your daily calorie intake right now
                </h2>
                <Form className="flex flex-col">
                  <div className="flex flex-wrap gap-8  w-full phone:w-full">
                    {/* Form fields for height, weight, age, and blood type */}
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
                        className="absolute text-red-500" // Error message for invalid input
                      />
                    </div>
                    {/* Other form fields similar to the height field */}
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
                    {/* Blood type dropdown */}
                    <div className="relative">
                      <div
                        className={`${css.customDropdown} w-60 bg-transparent border-b-2 outline-none pb-2 text-slate-400 font-bold focus:text-slate-600 focus:border-slate-600 hover:text-slate-600 hover:border-slate-600`}
                      >
                        <div className="w-full h-full" onClick={handleToggle}>
                          {selectedValue} {/* Display selected blood type */}
                        </div>
                        {isOpen && (
                          <ul className={css.dropdownMenu}>
                            {/* Options for selecting blood type */}
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
                  </div>
                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-700 text-white py-2 rounded-md hover:bg-slate-800"
                  >
                    Calculate
                  </button>
                </Form>
              </div>
            </div>

            {/* Sidebar with user statistics */}
            <div className="tablet:w-[30%] phone:w-[30%]">
              <UserSidebar />
            </div>
          </section>
        )}
      </Formik>
    </>
  );
};

export default Calculator;
