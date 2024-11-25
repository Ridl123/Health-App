import React, { useState } from "react";
import logo from "../../images/logoSlimMom.png";
import css from "./HomePage.module.css";

import { useNavigate } from "react-router-dom";

import Modal from "../../components/Modal";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const HomePage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Blood type *");
  const [submittedValues, setSubmittedValues] = useState(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleModal = () => {
    setModalOpen(false);
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
          setSubmittedValues(values);
          setModalOpen(true);
          setSelectedValue("Blood type *");
          resetForm();
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <section className="bg-image w-full h-[100vh] overflow-auto">
            <div className="screen-max-width flex flex-col pl-6 pt-12 gap-20 tablet:pt-2 tablet:pl-0 tablet:gap-14 phone:pl-0 phone:pt-2 phone:gap-8">
              <nav
                className="flex items-baseline gap-4 tablet:justify-between tablet:pb-2 tablet:items-center 
        tablet:border-b-2 tablet:border-slate-300 phone:justify-between phone:pb-2 phone:items-center 
        phone:border-b-2 phone:border-slate-300"
              >
                <img
                  src={logo}
                  alt="Website Logo"
                  width={167}
                  height={66}
                  className="tablet:h-[50px] tablet:w-auto tablet:pl-6 phone:h-[44px] phone:w-auto phone:pl-4"
                />
                <div className="flex items-center gap-4">
                  <span className="bg-slate-300 h-8 w-px tablet:hidden phone:hidden"></span>
                  <div className="flex flex-row gap-6 h-[17px] tablet:pr-6 phone:pr-4 pt-1">
                    <button
                      onClick={() => {
                        navigate("/login");
                      }}
                      className="text-slate-300 text-sm font-bold hover:text-slate-500 focus:text-slate-500 transition-all duration-300"
                    >
                      LOGIN
                    </button>
                    <button
                      onClick={() => {
                        navigate("/register");
                      }}
                      className="text-slate-300 text-sm font-bold hover:text-slate-500 focus:text-slate-500 transition-all duration-300"
                    >
                      REGISTER
                    </button>
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-12 tablet:pl-6 phone:pl-5">
                <h2 className="text-slate-800 text-3xl font-bold w-3/6 tablet:w-10/12 phone:w-10/12 phone:text-lg">
                  Calculate your daily calorie intake right now
                </h2>
                <Form className="flex flex-col phone:items-center">
                  <div className="flex flex-wrap gap-8 w-[600px] tablet:w-9/12 phone:w-full">
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
                    className="bg-orange-500 text-white px-6 py-3 rounded-full w-52 mt-10 mb-12 hover:bg-orange-600 hover:scale-105 transition-all duration-300 phone:-translate-x-5"
                  >
                    Start losing weight
                  </button>
                </Form>
              </div>
            </div>
          </section>
        )}
      </Formik>
      {isModalOpen && <Modal values={submittedValues} onClose={handleModal} />}
    </>
  );
};

export default HomePage;
