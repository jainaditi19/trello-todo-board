import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import useTodos from '../hooks/useTodos';
import ColumnTab from './ColumnTab';

const Board = () => {
  const { columns, setColumns } = useTodos();
  const [editingId, setEditingId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now(),
      todo: '',
      completed: false,
    };
  
    setColumns((prev) => ({
      ...prev,
      Pending: [newTodo, ...prev.Pending],
    }));
    setEditingId(newTodo.id); // Enable editing mode for the new task
  };
  
  const handleRenameTodo = (id, newTitle) => {
    setColumns((prev) => {
      const updated = { ...prev };
      for (const col in updated) {
        updated[col] = updated[col].map((todo) =>
          todo.id === id ? { ...todo, todo: newTitle } : todo
        );
      }
      return updated;
    });
    setEditingId(null);
  };
  

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    let activeItem, activeCol, overCol;

    for (const col in columns) {
      const found = columns[col].find((t) => t.id === active.id);
      if (found) {
        activeItem = found;
        activeCol = col;
      }
      if (columns[col].find((t) => t.id === over.id)) {
        overCol = col;
      }
    }

    if (!activeItem || !activeCol || !overCol) return;

    const sourceItems = [...columns[activeCol]];
    const destinationItems = [...columns[overCol]];

    const oldIndex = sourceItems.findIndex((t) => t.id === active.id);
    const newIndex = destinationItems.findIndex((t) => t.id === over.id);

    sourceItems.splice(oldIndex, 1);

    if (activeCol === overCol) {
      destinationItems.splice(newIndex, 0, activeItem);
    } else {
      destinationItems.splice(newIndex, 0, activeItem);
    }

    setColumns({
      ...columns,
      [activeCol]: sourceItems,
      [overCol]: destinationItems,
    });
  };

  return (
    <div>
      <button className="add-button" onClick={handleAddTodo}>
        Add Todo
      </button>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div className="board">
          {Object.entries(columns).map(([status, todos]) => (
            <SortableContext
              key={status}
              items={todos.map((t) => t.id)}
              strategy={rectSortingStrategy}
            >
              <ColumnTab
                status={status}
                todos={todos}
                editingId={editingId}
                onRename={handleRenameTodo}
              />
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default Board;
