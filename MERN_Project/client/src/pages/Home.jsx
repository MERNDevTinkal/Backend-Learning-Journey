import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import toast from "react-hot-toast";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axiosInstance.get("/todo");
      setTodos(res.data.todos);
    } catch (error) {
      toast.error("Failed to fetch todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      return toast.error("Fields cannot be empty or spaces only");
    }
    try {
      const res = await axiosInstance.post("/todo", { title, description });
      toast.success(res.data.message);
      setTitle("");
      setDescription("");
      fetchTodos();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create todo");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/todo/${id}`);
      toast.success("Todo deleted");
      fetchTodos();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleEdit = (todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const handleUpdate = async () => {
    if (!editTitle.trim() || !editDescription.trim()) {
      return toast.error("Fields cannot be empty or spaces only");
    }
    try {
      const res = await axiosInstance.put(`/todo/${editId}`, {
        title: editTitle,
        description: editDescription,
      });
      toast.success(res.data.message);
      setEditId(null);
      setEditTitle("");
      setEditDescription("");
      fetchTodos();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4 text-white">
      <h1 className="text-4xl font-extrabold text-center text-purple-400 mb-6">📋 My Todos</h1>

      <form onSubmit={handleAddTodo} className="bg-[#1e1e2e] p-4 rounded-2xl shadow-xl mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-3 rounded-xl bg-[#2e2e3e] text-white border border-gray-600 focus:outline-purple-500"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 p-3 rounded-xl bg-[#2e2e3e] text-white border border-gray-600 focus:outline-purple-500"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 transition-all duration-200 px-4 py-2 rounded-xl text-white font-semibold w-full"
        >
          ➕ Add Todo
        </button>
      </form>

      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="bg-[#2e2e3e] p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md"
          >
            {editId === todo._id ? (
              <div className="flex-1">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 mb-2 rounded bg-[#1e1e2e] text-white border border-gray-600"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full p-2 rounded bg-[#1e1e2e] text-white border border-gray-600"
                />
              </div>
            ) : (
              <div>
                <h3 className="font-bold text-lg">{todo.title}</h3>
                <p className="text-gray-300 text-sm">{todo.description}</p>
              </div>
            )}

            <div className="flex gap-2">
              {editId === todo._id ? (
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-xl"
                >
                   Save
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-xl"
                >
                   Edit
                </button>
              )}
              <button
                onClick={() => handleDelete(todo._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-xl"
              >
                 Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
