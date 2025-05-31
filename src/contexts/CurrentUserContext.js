import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefaults";

// Create context
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Custom hooks
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  // Get the current user on app load
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get("/api/dj-rest-auth/user/");
        setCurrentUser(data);
      } catch (err) {
        // Not logged in or session expired
        setCurrentUser(null);
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
        if (error.response?.status === 401) {
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
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};