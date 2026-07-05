import 'react';
import { Routes, Route } from 'react-router-dom';
import { PodcastProvider } from './context/PodcastProvider'; // Adjust path based on your folders
import { Home } from './pages/Home';
import { ShowDetail } from './pages/ShowDetail';

function App() {
  return (
    <PodcastProvider>
      <div className="app-layout">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetail />} />
        </Routes>
      </div>
    </PodcastProvider>
  );
}

export default App;