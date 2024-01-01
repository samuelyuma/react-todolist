/* eslint-disable react/prop-types */
import { FaTrash } from "react-icons/fa6";

const FinishedTodo = ({ todo, onUpdateTodo, onDeleteTodo }) => {
    return (
        <main
            key={todo.id}
            className="font-poppins mb-2 flex items-center gap-2"
        >
            <p className="hidden w-1/4 rounded border-2 border-[#323844] bg-[#2D323D] px-3 py-1.5 text-center text-white xl:inline">
                {todo.timestampDate}
            </p>
            <p className="hidden w-1/2 rounded border-2 border-[#323844] bg-[#2D323D] px-3 py-1.5 text-center text-white xl:inline 2xl:w-1/3">
                {todo.timestampTime}
            </p>
            <input
                type="text"
                value={todo.content}
                onChange={(event) => onUpdateTodo(event, todo)}
                className="w-full rounded border-2 border-[#323844] bg-[#2D323D] px-3 py-1.5 text-white focus:border-2 focus:border-[#323844] focus:outline-none focus:ring-0"
            />
            <button
                onClick={() => onDeleteTodo(todo)}
                className="rounded border-2 border-red-500 bg-red-500 px-3 py-2.5 text-white duration-300 hover:border-red-600 hover:bg-red-600"
            >
                <FaTrash />
            </button>
        </main>
    );
};

export default FinishedTodo;
