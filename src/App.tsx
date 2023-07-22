import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootPages/RootLayout";
import AboutPage from "./pages/AboutPage";
import RecentEventsPage from "./pages/RecentEventsPage";
import AlbumPage from "./pages/AlbumPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { useAppDispatch } from "./utils/redux";
import { userAutoSignIn } from "./store/slices/user-slice";
import AccDetailsPage from "./pages/AccDetailsPage";
import ChatPage from "./pages/ChatPage";
import CalendarPage from "./pages/CalendarPage";
import SelectChat from "./components/Chats/Chat/ChatComponents/SelectChat/SelectChat";
import HomeIntroPage from "./pages/HomeIntroPage";
import HomeMainPage from "./pages/HomeMainPage";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/events",
        element: <RootLayout />,
        children: [
          { index: true, element: <HomeIntroPage /> },
          { path: "main", element: <HomeMainPage /> },
          { path: "about", element: <AboutPage /> },
          { path: "recent", element: <RecentEventsPage /> },
          { path: "album/:albumName", element: <AlbumPage /> },
          {
            path: "auth",
            children: [
              { path: "sign-in", element: <SignInPage /> },
              { path: "sign-up", element: <SignUpPage /> },
            ],
          },
          { path: "acc-details", element: <AccDetailsPage /> },
          {
            path: "calendar",
            element: <CalendarPage />,
          },
          {
            path: "chats",
            children: [
              { index: true, element: <SelectChat /> },
              { path: ":chatID", element: <ChatPage /> },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(userAutoSignIn());
  }, [dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
