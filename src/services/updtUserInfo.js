function updtUserInfo(id, payload) {
  const apiURL = `http://localhost:3001/users/${id}`;

  return fetch(apiURL, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
}

export default updtUserInfo;
