import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home/index";
import Posts from "./pages/Posts/Posts";
import CreatePost from "./pages/CreatePost/CreatePost";
import Post from "./components/Post/Post";
import SinglePostPage from "./pages/SinglePostPage/SinglePostPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="posts" >
            <Route index element={<Posts />}  />
            <Route path="create" element={<CreatePost />} />
            <Route path=":postId" element={<SinglePostPage/>} />
          </Route>
          {/* <Route path="categories">
            <Route index element={<Categories />} />
            <Route path ="create" element={<CreateCategory />} />
            <Route path =":categoryId" element={<SingleCategoryPage />} />
          </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
