import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TodoCard = ({ todo, editingId, onRename }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [title, setTitle] = useState(todo.todo);

  useEffect(() => {
    setTitle(todo.todo); // update local state if todo changes
  }, [todo.todo]);

  const handleBlur = () => {
    if (title.trim()) {
      onRename(todo.id, title.trim());
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 bg-gray-200 rounded shadow"
    >
      {editingId === todo.id ? (
        <input
          autoFocus
          type="text"
          className="w-full p-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.target.blur();
          }}
        />
      ) : (
        <p style={{cursor: 'pointer'}}>{todo.todo}</p>
      )}
    </div>
  );
};

export default TodoCard;
