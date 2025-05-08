import { useEffect, useState } from 'react';
import { fetchTodos } from '../services/api';

const useTodos = () => {
  const [columns, setColumns] = useState({
    Pending: [],
    'In Progress': [],
    Completed: [],
  });

  useEffect(() => {
    fetchTodos().then((data) => {
      const pending = data.todos.filter((t) => !t.completed);
      const completed = data.todos.filter((t) => t.completed);

      // Add a couple of dummy "In Progress" tasks to ensure droppability
      const inProgress = [
        {
          id: Date.now() + 1,
          todo: 'Initial Task 1',
          completed: false,
        },
        {
          id: Date.now() + 2,
          todo: 'Initial Task 2',
          completed: false,
        },
      ];

      setColumns({
        Pending: pending,
        'In Progress': inProgress,
        Completed: completed,
      });
    });
  }, []);

  const addTodo = () => {
    const newTodo = {
      id: Date.now(),
      todo: 'New Task',
      completed: false,
    };
    setColumns((prev) => ({
      ...prev,
      Pending: [newTodo, ...prev.Pending],
    }));
  };

  const handleRenameTodo = (id, newTitle) => {
    setColumns((prev) => {
      const updated = {};
      for (const col in prev) {
        updated[col] = prev[col].map((todo) =>
          todo.id === id ? { ...todo, todo: newTitle } : todo
        );
      }
      return updated;
    });
  };


  const handleDeleteTodo = (id) => {
    setColumns((prev) => {
      const updated = {};
      for (const col in prev) {
        updated[col] = prev[col].filter((todo) => todo.id !== id);
      }
      return updated;
    });
  };

  return {
    columns,
    setColumns,
    addTodo,
    handleRenameTodo,
    handleDeleteTodo,
  };

};

export default useTodos;
