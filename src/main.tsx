import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import AuthProvider from "./context/AuthContext";
import { QueryProvider } from "./lib/react-query/QueryProvider";

// document.getElementById("root")! is a non-null assertion operator
ReactDOM.createRoot(document.getElementById("root")!).render(
  // BrowserRouter controls the routing of the entire app
  <BrowserRouter>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </BrowserRouter>
);
