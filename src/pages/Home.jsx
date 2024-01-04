import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import CategoryCard from "../components/home/CategoryCard";

const Home = () => {
    const [inputCategory, setInputCategory] = useState("");
    const [categoryName, setCategoryName] = useState(() => {
        const storedCategories = localStorage.getItem("categoryName");

        if (storedCategories) {
            return JSON.parse(storedCategories);
        } else {
            return [];
        }
    });

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("categoryName", JSON.stringify(categoryName));
    }, [categoryName]);

    function handleInputChange(event) {
        setInputCategory(event.target.value);
    }

    function handleNewCategory(event) {
        event.preventDefault();

        if (inputCategory !== "") {
            const categoryExist = categoryName.find(
                (category) => category.name === inputCategory,
            );

            if (categoryExist) {
                toast.error("Category already exist!");
            } else {
                setCategoryName([
                    ...categoryName,
                    {
                        id: categoryName.length + 1,
                        name: inputCategory,
                    },
                ]);
                toast.success("Category added successfully.");
            }
        } else {
            toast.error("Please enter a text!");
        }

        setInputCategory("");
    }

    function handleRedirectToCategory(category) {
        navigate(`/${category.name}`);
    }

    function handleDeleteCategory(category) {
        setCategoryName((categories) =>
            categories.filter((item) => item.id !== category.id),
        );
        toast.success("Category deleted successfully.");
    }

    return (
        <>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        fontFamily: "Poppins",
                        color: "#FFFFFF",
                        background: "#2D323D",
                        border: "2px solid #323844",
                    },
                    success: {
                        iconTheme: {
                            primary: "#22C55E",
                            secondary: "#FFFFFF",
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: "#EF4444",
                            secondary: "#FFFFFF",
                        },
                    },
                }}
            />
            <header className="fixed top-0 w-full bg-gray-900 py-12 font-poppins">
                <h1 className="text-center text-2xl font-semibold text-white">
                    ToDoList App
                </h1>
            </header>
            <main className="h-dvh overflow-hidden scroll-smooth bg-gray-900 px-fluid-page pt-32 font-poppins">
                <section className="flex flex-col gap-fluid-input-field pb-8">
                    <h3 className="text-xl font-medium text-white">
                        Add new categories:
                    </h3>
                    <form onSubmit={handleNewCategory} className="flex gap-2">
                        <input
                            type="text"
                            value={inputCategory}
                            onChange={handleInputChange}
                            placeholder="Enter your category"
                            className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-1.5 text-white placeholder-gray-700 focus:border focus:border-gray-700 focus:outline-none focus:ring-0"
                        />
                        <button
                            type="submit"
                            className="rounded border border-emerald-500 bg-emerald-500 px-3.5 py-2 text-white duration-300 hover:border-emerald-600 hover:bg-emerald-600"
                        >
                            <FaPlus />
                        </button>
                    </form>
                </section>
                <section className="flex flex-col gap-fluid-main-comp pb-16">
                    <h3 className="text-xl font-medium text-white">
                        Categories:{" "}
                    </h3>
                    {categoryName.length === 0 ? (
                        <p className="text-lg text-gray-600">{`There's no category at the moment.`}</p>
                    ) : (
                        <div className="max-h-[595px] overflow-y-auto">
                            <div className="grid grid-cols-1 gap-2 transition-all md:grid-cols-1 lg:grid-cols-2 lg:gap-3 xl:grid-cols-3 xl:gap-3">
                                {categoryName.map((category) => (
                                    <CategoryCard
                                        key={category.id}
                                        category={category}
                                        onRedirectToCategory={
                                            handleRedirectToCategory
                                        }
                                        onDeleteCategory={handleDeleteCategory}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};

export default Home;
