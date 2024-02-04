import { Header } from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Hero } from "./components/Hero";
import { Home } from "./components/Home";

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
        <Route exact path="/channels" element={<Home />} />
        <Route exact path="/channels/:id" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
