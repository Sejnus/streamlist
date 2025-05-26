import React from 'react';
import { useState } from 'react';
import { 
  FaTrash, 
  FaEdit, 
  FaCheck, 
  FaTimes 
} from 'react-icons/fa';

function StreamList() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);

  // Add a new task
  const handleAdd = e => {
    e.preventDefault();
    if (!input.trim()) return;
    setTasks([
      ...tasks,
      { 
        id: Date.now(), 
        text: input.trim(), 
        isCompleted: false, 
        isEditing: false 
      }
    ]);
    setInput(''); // clear input
  };

  // Delete a task
  const handleDelete = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle complete
  const handleComplete = id => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, isCompleted: !task.isCompleted }
        : task
    ));
  };

  // Toggle edit mode
  const handleEditToggle = id => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, isEditing: !task.isEditing }
        : task
    ));
  };

  // Save edited text
  const handleUpdate = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, text: newText, isEditing: false }
        : task
    ));
  };

  return (
    <div className="streamlist-container">
      <h1>StreamList</h1>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Add a movie title"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
<button type="submit">
  <span role="img" aria-label="Add">➕</span>
</button>      </form>

      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            {task.isEditing
              ? <input
                  value={task.text}
                  onChange={e => handleUpdate(task.id, e.target.value)}
                />
              : <span className={task.isCompleted ? 'completed' : ''}>
                  {task.text}
                </span>
            }

            <div className="icons">
              {task.isEditing
                ? <FaCheck onClick={() => handleUpdate(task.id, task.text)} />
                : <FaEdit onClick={() => handleEditToggle(task.id)} />
              }
              <FaTrash onClick={() => handleDelete(task.id)} />
              <FaTimes onClick={() => handleComplete(task.id)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;
