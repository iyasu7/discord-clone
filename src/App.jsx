import { Header } from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Hero } from "./components/Hero";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Header />
              <Hero />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
