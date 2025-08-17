import { createRoot } from "react-dom/client";
import "./theme/tailwind/index.css";
import MainRouter from "./routes/main.jsx";

import { ToastProvider } from "./context/sonner.jsx";
import { GlobalAlertDialog } from "./context/global-alert.jsx";

createRoot(document.getElementById("root")).render(
  <ToastProvider>
    <MainRouter />
    <GlobalAlertDialog />
  </ToastProvider>
);
