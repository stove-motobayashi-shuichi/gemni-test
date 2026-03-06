import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<TodoList />} />
            <Route path="/detail" element={<TodoDetail />} />
            <Route path="/detail/:id" element={<TodoDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
