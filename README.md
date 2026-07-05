This project focuses on handling dynamic routing (`react-router-dom`), managing asynchronous API data, and preserving the user's search/filter state when navigating between pages.

---

## ⚡ Features

* **Dynamic Routing:** Every podcast has a unique, shareable URL path based on its API ID (`/show/:id`).
* **Smart Navigation & State Retention:** Uses React Context to remember your search queries, genre filters, and pagination page. If you look at a show's details and click "Back", you land exactly where you left off.
* **Interactive Season Selector:** A simple dropdown menu that lets users jump between seasons instantly without endless scrolling. It displays episode counts, numbers, titles, thumbnails, and clean description snippets.
* **Genre Mapping:** Converts raw API numbers (e.g., `1`, `4`) into readable genre tags (e.g., *Personal Growth*, *Comedy*) using a built-in dictionary map.
* **Clean & ESLint-Compliant Code:** Decoupled the context definition (`PodcastContext.jsx`) from the state provider (`PodcastProvider.jsx`). This prevents Vite Fast Refresh warnings and keeps the development server running smoothly.

---

## 🛠️ How to Run the Project Locally (Through Terminal)

* git clone https://github.com/Muizz-CS/ABDKIE25146_pto2508-class_Abdul_Kiewitz_DJS05.git
* cd ABDKIE25146_pto2508-class_Abdul_Kiewitz_DJS05
* npm install
* npm run dev

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── LoadingState.jsx    # Spinner/loading UI
│   ├── ErrorState.jsx      # User-friendly error messages
│   └── PodcastCard.jsx     # Individual podcast item for the home grid
├── context/
│   ├── PodcastContext.jsx  # Holds the React Context and usePodcast hook
│   └── PodcastProvider.jsx # Handles the global state logic and API fetching
├── pages/
│   ├── Home.jsx            # Homepage with search, filter tools, and pagination
│   └── ShowDetail.jsx      # Show detail page with season and episode browsing
├── utils/
│   └── podcastHelpers.js   # Clean helper logic for filtering and sorting arrays
├── App.jsx                 # App shell containing page routes
└── main.jsx                # App entry point

