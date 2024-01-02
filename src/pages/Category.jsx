import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlus, FaHouse } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import UnfinishedTodo from "../components/category/UnfinishedTodo";
import FinishedTodo from "../components/category/FinishedTodo";

const Category = () => {
    const [dateAndTime, setDateAndTime] = useState(new Date());
    const [inputContent, setInputContent] = useState("");
    const [todoItem, setTodoItem] = useState(() => {
        const storedTodoItem = localStorage.getItem("todoItem");

        if (storedTodoItem) {
            return JSON.parse(storedTodoItem);
        } else {
            return [];
        }
    });
    const [unfinishedTodo, setUnfinishedTodo] = useState([]);
    const [finishedTodo, setFinishedTodo] = useState([]);

    const { categoryName } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => setDateAndTime(new Date(), 1000));

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        localStorage.setItem("todoItem", JSON.stringify(todoItem));
    }, [todoItem]);

    useEffect(() => {
        function filterTodo() {
            setUnfinishedTodo(
                todoItem.filter(
                    (todo) => !todo.done && todo.category === categoryName,
                ),
            );
            setFinishedTodo(
                todoItem.filter(
                    (todo) => todo.done && todo.category === categoryName,
                ),
            );
        }

        filterTodo();
    }, [todoItem, categoryName]);

    function handleBackToHome() {
        navigate("/");
    }

    function handleInputChange(event) {
        setInputContent(event.target.value);
    }

    function handleAddTodo(event) {
        event.preventDefault();

        if (inputContent !== "") {
            setTodoItem([
                ...todoItem,
                {
                    id: todoItem.length + 1,
                    content: inputContent.trim(),
                    done: false,
                    category: categoryName,
                    timestampDate: dateAndTime.toLocaleDateString(),
                    timestampTime: dateAndTime.toLocaleTimeString(),
                },
            ]);
            toast.success("Todo added successfully.");
        } else {
            toast.error("Please enter a text!");
        }

        setInputContent("");
    }

    function handleStatusTodo(todo) {
        setTodoItem((todos) =>
            todos.map((item) =>
                item.id === todo.id ? { ...item, done: true } : item,
            ),
        );
        toast.success("Todo marked as completed.");
    }

    function handleUpdateTodo(event, todo) {
        setTodoItem((todos) =>
            todos.map((item) =>
                item.id === todo.id
                    ? { ...item, content: event.target.value }
                    : item,
            ),
        );
    }

    function handleDeleteTodo(todo) {
        setTodoItem((todos) => todos.filter((item) => item.id !== todo.id));
        toast.success("Todo deleted successfully.");
    }

    return (
        <>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 3000,
                    style: {
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
            <header className="fixed top-0 flex w-full items-center justify-center bg-gray-900 px-fluid-page py-12 font-poppins lg:justify-between">
                <h1 className="hidden text-center text-2xl font-semibold text-white lg:inline">
                    ToDoList App
                </h1>
                <button
                    onClick={handleBackToHome}
                    className="flex items-center gap-3 rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white duration-300 hover:bg-blue-600"
                >
                    <FaHouse />
                    <p>Back To Home</p>
                </button>
            </header>
            <main className="flex h-dvh flex-col gap-10 bg-gray-900 px-fluid-page pt-32 font-poppins">
                <section className="flex items-center justify-between">
                    <h1 className="py-2 text-2xl font-semibold text-white">
                        {`You are in the '${categoryName}' category.`}
                    </h1>
                    <div className="hidden text-end text-white duration-300 xl:inline">
                        {dateAndTime.toLocaleDateString()}
                        <br />
                        {dateAndTime.toLocaleTimeString()}
                    </div>
                </section>
                <section className="flex flex-col gap-fluid-main-comp">
                    <h3 className="text-xl font-medium text-white">
                        Add new task:{" "}
                    </h3>
                    <form onSubmit={handleAddTodo} className="flex gap-2">
                        <input
                            type="text"
                            value={inputContent}
                            onChange={handleInputChange}
                            placeholder="Enter your task here"
                            className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-1.5 text-white placeholder-gray-700 focus:border focus:border-gray-700 focus:outline-none focus:ring-0"
                        />
                        <button
                            type="submit"
                            className="hover:border-emeral-600 rounded border border-emerald-500 bg-emerald-500 px-3.5 py-2 text-white duration-300 hover:bg-emerald-600"
                        >
                            <FaPlus />
                        </button>
                    </form>
                </section>
                <section className="flex flex-col gap-fluid-main-comp">
                    <h2 className="text-xl font-medium text-white">
                        On-going Tasks
                    </h2>
                    {unfinishedTodo.length === 0 ? (
                        <p className="text-lg font-medium text-gray-500">{`There's no task at the moment.`}</p>
                    ) : (
                        <div className="max-h-[180px] overflow-y-auto">
                            {unfinishedTodo.map((todo) => (
                                <UnfinishedTodo
                                    key={todo.id}
                                    todo={todo}
                                    onUpdateTodo={handleUpdateTodo}
                                    onEditStatus={handleStatusTodo}
                                    onDeleteTodo={handleDeleteTodo}
                                />
                            ))}
                        </div>
                    )}
                </section>
                <section className="flex flex-col gap-fluid-main-comp pb-16">
                    <h2 className="text-xl font-medium text-white">
                        Completed Tasks
                    </h2>
                    <div>
                        {finishedTodo.length === 0 ? (
                            <p className="text-lg font-medium text-gray-500">{`There's no task at the moment.`}</p>
                        ) : (
                            <div className="max-h-[180px] overflow-y-auto">
                                {finishedTodo.map((todo) => (
                                    <FinishedTodo
                                        key={todo.id}
                                        todo={todo}
                                        onUpdateTodo={handleUpdateTodo}
                                        onDeleteTodo={handleDeleteTodo}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
};

export default Category;
