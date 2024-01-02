/* eslint-disable react/prop-types */
import { FaCheck, FaTrash } from "react-icons/fa6";

const UnfinishedTodo = ({ todo, onUpdateTodo, onEditStatus, onDeleteTodo }) => {
    return (
        <main
            key={todo.id}
            className="mb-2 flex items-center gap-2 font-poppins"
        >
            <p className="hidden w-1/4 rounded border border-gray-700 bg-gray-800 px-3 py-1.5 text-center text-white xl:inline">
                {todo.timestampDate}
            </p>
            <p className="hidden w-1/4 rounded border border-gray-700 bg-gray-800 px-3 py-1.5 text-center text-white xl:inline 2xl:w-1/3">
                {todo.timestampTime}
            </p>
            <input
                type="text"
                value={todo.content}
                onChange={(event) => onUpdateTodo(event, todo)}
                className="w-full rounded border border-gray-700 bg-gray-800 px-3 py-1.5 text-white focus:border focus:border-gray-700 focus:outline-none focus:ring-0"
            />
            <button
                onClick={() => onEditStatus(todo)}
                className="rounded border border-emerald-500 bg-emerald-500 px-3 py-2.5 font-medium text-white duration-300 hover:border-emerald-600 hover:bg-emerald-600"
            >
                <FaCheck />
            </button>
            <button
                onClick={() => onDeleteTodo(todo)}
                className="rounded border border-red-500 bg-red-500 px-3 py-2.5 text-white duration-300 hover:border-red-600 hover:bg-red-600"
            >
                <FaTrash />
            </button>
        </main>
    );
};

export default UnfinishedTodo;
