import { useNavigate } from "react-router-dom";

import { IoClose } from "react-icons/io5";

const Modal = ({ values, onClose }) => {
  // Initializing useNavigate hook for redirecting to different routes.
  const navigate = useNavigate();

  // Destructuring the height, weight, and age values passed as props.
  const { height, desWeight, age } = values;

  // Calculating Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation for males.
  const BMR = 10 * desWeight + 6.25 * height - 5 * age + 5;
  // Calculating daily caloric needs with an activity multiplier of 1.55 (moderate activity).
  const caloriesCount = (BMR * 1.55).toFixed(0);

  return (
    // Modal container with a semi-transparent background.
    <div className="overflow-hidden absolute top-0 left-0 bottom-0 right-0 z-20 flex flex-col items-center justify-center bg-black/30">
      {/* Modal content container with responsive design for different screen sizes. */}
      <div className="w-4/5 bg-slate-50 max-w-2xl flex flex-col items-center gap-8 p-10 relative phone:w-full phone:h-full phone:gap-14 phone:p-4">
        {/* Close button to dismiss the modal. */}
        <IoClose
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 flex-shrink-0 hover:scale-125 transition-all duration-300 phone:right-2"
        />
        {/* Title of the modal displaying the recommended daily calorie intake. */}
        <h2 className="text-slate-800 text-2xl font-bold w-4/5 text-center tablet:text-xl tablet:w-full phone:w-full phone:mt-12">
          Your recommended daily calorie intake is
        </h2>
        {/* Displaying the calculated calorie intake in a prominent size. */}
        <p className="text-slate-600 text-4xl font-bold">
          {caloriesCount}{" "}
          <span className="text-slate-600 text-xl font-bold">cal.</span>
        </p>
        {/* Instructions and recommendations for food to avoid, with a horizontal line separator. */}
        <div className="flex flex-col gap-3 w-3/5 tablet:w-5/6 phone:w-full">
          <div className="w-full h-[1px] bg-slate-500"></div>
          <p className="text-slate-800 text-base font-semibold tablet:text-sm">
            Foods you should not eat:
          </p>
          <ul className="pl-4 flex flex-col gap-1">
            {/* List of foods to avoid */}
            <li className="text-base font-thin">- Highly Processed Foods</li>
            <li className="text-base font-thin">- Sugary Beverages</li>
            <li className="text-base font-thin">- Fried and Fast Foods</li>
            <li className="text-base font-thin">- Refined Carbohydrates</li>
          </ul>
        </div>
        {/* Button to start the journey, redirecting to the registration page. */}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="bg-orange-500 text-white px-6 py-3 rounded-full w-52 hover:bg-orange-600 hover:scale-105 transition-all duration-300 phone:w-4/5"
        >
          Start your journey
        </button>
      </div>
    </div>
  );
};

export default Modal;
