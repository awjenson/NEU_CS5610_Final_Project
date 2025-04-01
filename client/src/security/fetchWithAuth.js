// This function is used to fetch data from the server with the credentials option set to include.

export async function fetchWithAuth(url, options = {}) {
  try {
    // fetch() is used to make a server request to retrieve some JSON data from it. 
    // The fetch() function takes a URL and an options object as arguments.
    // The options object is optional and can be used to specify the method, headers, and body of the request.
    // The credentials option is used to include the credentials (username and password) in the request.
    const res = await fetch(url, { ...options, credentials: "include" });

    if (res.status === 401) {
      // If the user is not authenticated, redirect to the login page.
      window.location.href = "/login";
      return;
    }

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return res;
  } catch (error) {
    console.error("Error during fetchWithAuth:", error);
    throw error;
  }
}

export async function fetchGetWithAuth(url) {
  try {
    const res = await fetchWithAuth(url);
    return res.json();
  } catch (error) {
    console.error("Error during fetchGetWithAuth:", error);
    throw error;
  }
}

export async function fetchPostWithAuth(url, data) {
  return fetchWithAuth(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function fetchPutWithAuth(url, data) {
  return fetchWithAuth(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function fetchDeleteWithAuth(url) {
  return fetchWithAuth(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}