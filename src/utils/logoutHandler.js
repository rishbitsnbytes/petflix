const logoutHandler = async (currentAuthState, authDispatch) => {
  await authDispatch({
    action: {
      type: "RESET_AUTH",
    },
  });

  removeAuthStateFromLocalStorage();
};

const removeAuthStateFromLocalStorage = () => {
  localStorage.removeItem("petflix-token");
  localStorage.removeItem("petflix-user");
  sessionStorage.removeItem("petflix-token");
  sessionStorage.removeItem("petflix-user");
};

export { logoutHandler };
