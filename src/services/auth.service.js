const url = "https://notes-api.dicoding.dev/v1";

export const login = async (email, password, dispatch) => {
  dispatch({ type: "CHANGE_LOADING", payload: true });
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      dispatch({ type: "CHANGE_LOADING", payload: false });
      reject()
      return;
    }
    const responseJson = await response.json();
    localStorage.setItem("token", responseJson.data.accessToken);
    resolve()
    return;
  });
};

export const register = async (name, email, password, dispatch) => {
  dispatch({ type: "CHANGE_LOADING", payload: true });
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${url}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch({ type: "CHANGE_LOADING", payload: false });
      reject(error.message)
      return;
    }
    dispatch({ type: "CHANGE_LOADING", payload: false });
    resolve()
    return;
  });
};

export const logout = (dispatch) => {
  return new Promise((resolve) => {
    resolve();
    localStorage.removeItem("token");
    dispatch({ type: "CHANGE_USERNAME", payload: "" });
  })
}

export const getUsername = async (token, dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(`${url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "fail") {
          reject(false);
          return;
        }
        dispatch({ type: "CHANGE_USERNAME", payload: responseJson.data.name });
        resolve(responseJson.data.name);
      })
  });
}