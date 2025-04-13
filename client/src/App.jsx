import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoApp from "./TodoApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <nav className="bg-cyan-700 text-white px-6 py-4 shadow">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">📝 My Todo App</h1>
        <div className="space-x-1">
          <a href="#" className="hover:underline text-2xl font-semibold">Home</a>
          
        </div>
      </div>
    </nav>
      <div className="bg-red-200 h-dvh">
        <TodoApp />
      </div>
    </>
  );
}

export default App;
