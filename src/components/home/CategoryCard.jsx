/* eslint-disable react/prop-types */
import { FaArrowRightToBracket, FaTrash } from "react-icons/fa6";

const CategoryCard = ({
    category,
    onRedirectToCategory,
    onUpdateCategory,
    onDeleteCategory,
}) => {
    return (
        <main
            key={category.id}
            className="font-poppins flex justify-between rounded bg-dark-blue px-5 py-3 shadow-xl"
        >
            <input
                value={category.name}
                onChange={(event) => onUpdateCategory(event, category)}
                className="mr-2 w-full bg-dark-blue text-lg font-medium text-white focus:outline-none"
            />
            <section className="flex gap-2">
                <button
                    onClick={() => onRedirectToCategory(category)}
                    type="button"
                    className="rounded bg-white px-2 py-1 font-semibold text-dark-blue duration-300 hover:bg-slate-200"
                >
                    <FaArrowRightToBracket />
                </button>
                <button
                    onClick={() => onDeleteCategory(category)}
                    type="button"
                    className="rounded bg-white px-2 py-1 font-semibold text-dark-blue duration-300 hover:bg-slate-200"
                >
                    <FaTrash />
                </button>
            </section>
        </main>
    );
};

export default CategoryCard;
