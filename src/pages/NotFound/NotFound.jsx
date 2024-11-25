import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full h-[100vh] overflow-auto flex justify-center items-center">
      <div className="w-3/5 border-2 border-orange-500 tablet:w-9/12 phone:w-11/12 flex flex-col gap-10 items-center justify-center px-4 py-12 phone:px-2">
        <p className="text-orange-500 text-6xl font-bold text-center">
          Page not found!
        </p>
        <p className="text-slate-400 font-bold text-center">
          Please go back to the website!
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-orange-500 text-white px-6 py-3 rounded-full w-60 hover:bg-orange-600 hover:scale-105 transition-all duration-300"
        >
          Go back to the website
        </button>
      </div>
    </section>
  );
};

export default NotFound;
