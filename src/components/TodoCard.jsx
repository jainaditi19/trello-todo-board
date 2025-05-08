import React, { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TodoCard = ({ todo, onRename, onDelete, isEditing, setEditingId }) => {
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
    setTitle(todo.todo);
  }, [todo.todo]);

  const handleSave = () => {
    if (title.trim()) {
      onRename(todo.id, title.trim());
      setEditingId(null);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="todo-card"
    >
      <div className="drag-handle" {...listeners}>☰</div> {/* Only this is draggable */}

      {isEditing ? (
        <input
          autoFocus
          type="text"
          className="edit-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
          }}
        />
      ) : (
        <>
          <p>{todo.todo}</p>
          <div className="actions">
            <button onClick={() => setEditingId(todo.id)}>Edit</button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoCard;
