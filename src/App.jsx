import 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { ShowDetail } from './pages/ShowDetail';

function App() {
  return (
    <>
      <header>
        <h1>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Podcast Discovery App
          </Link>
        </h1>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;