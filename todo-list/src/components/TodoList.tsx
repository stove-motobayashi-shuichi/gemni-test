import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, toggleTaskCompleted, deleteTask, type Task } from '../tasks';

const ITEMS_PER_PAGE = 10;

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    const loadedTasks = getTasks();
    // Sort by due date ascending
    loadedTasks.sort((a, b) => a.due_date.localeCompare(b.due_date));
    setTasks(loadedTasks);
  };

  const handleToggle = (id: number) => {
    toggleTaskCompleted(id);
    loadTasks();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('このタスクを削除しますか？')) {
      deleteTask(id);
      loadTasks();
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/detail/${id}`);
  };

  const handleAdd = () => {
    navigate('/detail');
  };

  // Pagination logic
  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentTasks = tasks.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="todo-list-page">
      <div className="list-header">
        <h2>タスク一覧</h2>
        <button className="add-button" onClick={handleAdd}>
          追加
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="no-tasks">タスクがありません</p>
      ) : (
        <>
          <table className="task-table">
            <thead>
              <tr>
                <th>完了</th>
                <th>タスク名</th>
                <th>優先度</th>
                <th>期限日</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task) => (
                <tr key={task.id} className={task.completed ? 'completed' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggle(task.id)}
                    />
                  </td>
                  <td>{task.name}</td>
                  <td>
                    <span className={`priority-badge priority-${task.priority}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td>{task.due_date}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(task.id)}>
                      編集
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(task.id)}>
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                前へ
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                次へ
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TodoList;
