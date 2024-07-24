import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

// document.getElementById("root")! is a non-null assertion operator
ReactDOM.createRoot(document.getElementById("root")!).render(
  // BrowserRouter controls the routing of the entire app
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
