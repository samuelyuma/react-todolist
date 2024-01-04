/* eslint-disable react/prop-types */
import { FaTrash } from "react-icons/fa6";

const CategoryCard = ({ category, onRedirectToCategory, onDeleteCategory }) => {
    return (
        <main
            key={category.id}
            className="flex items-center rounded bg-blue-500 pr-5 font-poppins"
        >
            <p
                onClick={() => onRedirectToCategory(category)}
                className="w-full cursor-pointer rounded bg-blue-500 py-4 pl-5 text-lg font-medium text-white"
            >
                {category.name}
            </p>
            <button
                onClick={() => onDeleteCategory(category)}
                type="button"
                aria-label="Delete category"
                className="rounded bg-white px-2 py-2 font-semibold text-blue-500 duration-300 hover:bg-slate-200"
            >
                <FaTrash />
            </button>
        </main>
    );
};

export default CategoryCard;
