import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TodoCard from './TodoCard';

const ColumnTab = ({ status, todos, editingId, onRename, onDelete, setEditingId }) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div className="column" ref={setNodeRef}>
      <h2>{status}</h2>
      <SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        {todos.length === 0 ? (
          <div className="placeholder">Drop tasks here</div>
        ) : (
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              editingId={editingId}
              onRename={onRename}
              onDelete={onDelete}
              isEditing={editingId === todo.id}
              setEditingId={setEditingId}
            />
          ))
        )}
      </SortableContext>
    </div>
  );
};

export default ColumnTab;
