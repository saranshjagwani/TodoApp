import { useEffect, useState } from "react";
import axios from "axios";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    await axios.post("http://localhost:5000/tasks", { text: newTask });
    setNewTask("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  const updateTask = async (id, currentText) => {
    const updated = prompt("Edit task", currentText);
    if (updated) {
      await axios.put(`http://localhost:5000/tasks/${id}`, { text: updated });
      fetchTasks();
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4 bg-red-300 h-dvh">
     
      <h1 className="text-4xl font-bold text-center">Todo List</h1>
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="flex-1 p-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex justify-between items-center p-3 border rounded shadow-sm bg-white"
        >
          <span>{task.text}</span>
          <div className="flex gap-2">
            <button
              onClick={() => updateTask(task.id, task.text)}
              className="px-2 py-1 border rounded hover:bg-gray-200"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="px-2 py-1 border rounded bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
