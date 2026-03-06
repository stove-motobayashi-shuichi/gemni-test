import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById, addTask, updateTask } from '../tasks';

const TodoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<number>(3);
  const [error, setError] = useState<string | null>(null);

  const isEdit = id !== undefined;

  useEffect(() => {
    if (isEdit) {
      const task = getTaskById(parseInt(id!));
      if (task) {
        setName(task.name);
        setDueDate(task.due_date);
        setPriority(task.priority || 3);
      } else {
        setError('タスクが見つかりませんでした');
      }
    }
  }, [id, isEdit]);

  const handleConfirm = () => {
    setError(null);

    if (!name.trim()) {
      setError('タスク名を入力してください');
      return;
    }
    if (!dueDate) {
      setError('期限日を入力してください');
      return;
    }
    if (priority < 1 || priority > 5) {
      setError('優先度は1から5の間で入力してください');
      return;
    }

    if (isEdit) {
      updateTask(parseInt(id!), { name, due_date: dueDate, priority });
    } else {
      addTask(name, dueDate, priority);
    }

    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="todo-detail-page">
      <h2>{isEdit ? 'タスク編集' : 'タスク追加'}</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="form-group">
        <label htmlFor="task-name">タスク名:</label>
        <input
          id="task-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="タスク名"
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">優先度 (1-5):</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(parseInt(e.target.value))}
        >
          <option value="1">1 (低)</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5 (高)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="due-date">期限日:</label>
        <input
          id="due-date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button className="confirm-button" onClick={handleConfirm}>
          決定
        </button>
        <button className="back-button" onClick={handleBack}>
          戻る
        </button>
      </div>
    </div>
  );
};

export default TodoDetail;
