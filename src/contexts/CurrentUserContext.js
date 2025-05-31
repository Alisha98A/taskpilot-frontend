import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefaults";

// Create context
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();
export const UserLoadedContext = createContext();

// Custom hooks
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);
export const useUserLoaded = () => useContext(UserLoadedContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const history = useHistory();

  // Get the current user on app load
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/api/dj-rest-auth/user/");
        setCurrentUser(data);
      } catch (err) {
        setCurrentUser(null);
      } finally {
        setUserLoaded(true);
      }
    };

    handleMount();
  }, []);

  // Interceptors
  useEffect(() => {
    const requestInterceptor = axiosReq.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response?.status === 401 &&
          history.location.pathname !== "/signin"
        ) {
          setCurrentUser(null);
          history.push("/signin");
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptors on unmount
    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        <UserLoadedContext.Provider value={userLoaded}>
          {children}
        </UserLoadedContext.Provider>
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};