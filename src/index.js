import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import PostScreen from "./pages/PostScreen";
import SinglePostPage from "./pages/SinglePostPage.js";
import EditPostForm from "./pages/EditPostForm.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/post" element={<PostScreen />} />
      <Route exact path="/posts/:postId" element={<SinglePostPage />} />
      <Route exact path="/editPost/:postId" element={<EditPostForm />} />
    </Route>
  )
);

async function deferRender() {
  const { worker } = await import("./mocks/browser.js");
  return worker.start();
}

deferRender().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>
  );
});
