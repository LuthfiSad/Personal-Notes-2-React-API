const url = "https://notes-api.dicoding.dev/v1";

export const addNote = async (title, body, token, dispatch) => {
  return new Promise(async (resolve) => {
    await fetch(`${url}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });
    await getNotes(token, dispatch);
    resolve();
  });
};

export const getNotes = async (token, dispatch) => {
  return new Promise(async (resolve) => {
    const [response1, response2] = await Promise.all([
      fetch(`${url}/notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      fetch(`${url}/notes/archived`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    const [responseJson1, responseJson2] = await Promise.all([
      response1.json(),
      response2.json(),
    ]);
    resolve();
    const mergedData = [...responseJson1.data, ...responseJson2.data];
    mergedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    dispatch({
      type: "ADD_NOTES",
      payload: mergedData,
    });
    dispatch({ type: "CHANGE_LOADING", payload: false });
  });
};

export const UnarchiveNote = async (id, token, dispatch) => {
  return new Promise(async (resolve) => {
    await fetch(`${url}/notes/${id}/unarchive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    await getNotes(token, dispatch);
    resolve();
  });
};

export const ArchiveNote = async (id, token, dispatch) => {
  return new Promise(async (resolve) => {
    await fetch(`${url}/notes/${id}/archive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    await getNotes(token, dispatch);
    resolve();
  });
};


export const deleteNote = async (id, token, dispatch) => {
  return new Promise(async (resolve) => {
    await fetch(`${url}/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    await getNotes(token, dispatch);
    resolve();
  })
}

export const detailsNote = async (id, token) => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${url}/notes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      reject();
      return;
    }
    const responseJson = await response.json();
    resolve(responseJson.data);
  })
}