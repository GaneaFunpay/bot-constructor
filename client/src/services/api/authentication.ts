import axios from "axios";

const BASE_URL = "http://0.0.0.0:8000";
const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

const tokenRequest = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

const signInUser = (email: string, password: string) => {
  const signinBody = { email: email, password: password };

  return tokenRequest
    .post("/api/v1/authentication/token/", signinBody)
    .then((response) => {
      window.localStorage.setItem(ACCESS_TOKEN, response.data.access);
      window.localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
};

const refreshToken = () => {
  const refreshBody = { refresh: window.localStorage.getItem(REFRESH_TOKEN) };

  return tokenRequest
    .post("/api/v1/authentication/token/refresh", refreshBody)
    .then((response) => {
      window.localStorage.setItem(ACCESS_TOKEN, response.data.access);
      return Promise.resolve(response.data);
    })
    .catch((error) => Promise.reject(error));
};

const isCorrectRefreshError = (status: Number) => status === 401;

/*
 * authRequest
 *
 * This refreshes the request and retries the token if it is invalid.
 * This is what you use to create any requests that need the Tokens.
 * Reference: https://hackernoon.com/110percent-complete-jwt-authentication-with-django-and-react-2020-iejq34ta
 *
 * Example:
 *     authRequest.get('/path/to/endpoint/',extraParameters)
 *        .then(response=>{
 *          // do something with successful request
 *        }).catch((error)=> {
 *          // handle any errors.
 *        });
 */
const authRequest = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem(ACCESS_TOKEN)}`,
    "Content-Type": "application/json",
  },
});

const signOutUser = () => {
  window.localStorage.removeItem(ACCESS_TOKEN);
  window.localStorage.removeItem(REFRESH_TOKEN);
  authRequest.defaults.headers.Authorization = "";
};

const errorInterceptor = (error: any) => {
  const originalRequest = error.config;
  const { status } = error.response;

  if (isCorrectRefreshError(status)) {
    return refreshToken()
      .then(() => {
        const headerAuthorization = `Bearer ${window.localStorage.getItem(
          ACCESS_TOKEN
        )}`;
        authRequest.defaults.headers.Authorization = headerAuthorization;
        originalRequest.headers.Authorization = headerAuthorization;
        return authRequest(originalRequest);
      })
      .catch((tokenRefreshError) => {
        signOutUser();
        return Promise.reject(tokenRefreshError);
      });
  }
  return Promise.reject(error);
};

authRequest.interceptors.response.use(
  (response) => response, // all successful requests
  (error) => errorInterceptor(error) // handle the request
);

export {
  tokenRequest,
  signInUser,
  signOutUser,
  refreshToken,
  authRequest,
  errorInterceptor,
  BASE_URL,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
};
