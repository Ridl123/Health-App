import logo from "../../images/logoSlimMom.png";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../REDUX/auth/operations";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password weight is required"),
  });

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(login(values));
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <section className="bg-image w-full h-[100vh] overflow-auto">
            <div className="screen-max-width flex flex-col pl-6 pt-12 gap-24 tablet:pt-2 tablet:pl-0 tablet:gap-14 phone:pl-0 phone:pt-2 phone:gap-8">
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
                      className=" text-sm font-bold text-slate-500"
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
              <div className="flex flex-col gap-10 tablet:pl-6 phone:pl-5">
                <h2 className="text-orange-500 text-2xl font-bold w-3/6 tablet:w-10/12 phone:w-10/12 phone:text-lg">
                  LOG IN
                </h2>
                <Form className="flex flex-col phone:items-center gap-20">
                  <div className="flex flex-col gap-8 w-[600px] tablet:w-9/12 phone:w-full">
                    <div className="relative">
                      <Field
                        id="email"
                        name="email"
                        type="string"
                        placeholder="Email *"
                        className="w-60 bg-transparent border-b-2 outline-none pb-2 text-slate-400 font-bold focus:text-slate-600 focus:border-slate-600 placeholder:focus:text-slate-600 hover:text-slate-600 hover:border-slate-600"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="absolute text-red-500"
                      />
                    </div>
                    <div className="relative">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password *"
                        className="w-60 bg-transparent border-b-2 outline-none pb-2 text-slate-400 font-bold focus:text-slate-600 focus:border-slate-600 placeholder:focus:text-slate-600 hover:text-slate-600 hover:border-slate-600"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="absolute text-red-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-6 pr-6">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="bg-orange-500 text-white px-6 py-3 rounded-full w-52 hover:bg-orange-600 hover:scale-105 transition-all duration-300"
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => navigate("/register")}
                      type="button"
                      className="bg-white border-orange-500 border-2 text-orange-500 px-6 py-3 rounded-full w-52 hover:scale-105 transition-all duration-300"
                    >
                      Register
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </section>
        )}
      </Formik>
    </>
  );
};

export default Login;
