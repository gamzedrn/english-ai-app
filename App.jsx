import React from "react";
import Home from "./pages/Home"; // Ana sayfa bileşenini içe aktarıyoruz

function App() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Home bileşeni, uygulamanın ana içeriğini temsil eder */}
      <Home />
    </div>
  );
}

export default App;
