import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="app-title">
        <h1>Todo アプリ</h1>
      </Link>
    </header>
  );
};

export default Header;
