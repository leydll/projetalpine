export default function logoutContainer() {
  return {
    isLoggedIn: false,
    user: null,

    init() {
      this.checkUser();
    },

    checkUser() {
      fetch("./data/users.json")
        .then((response) => response.json())
        .then((users) => {
          const currentUser = users.find(
            (u) =>
              u.email === "test@example.com" && u.password === "Password.123"
          );

          if (currentUser) {
            this.user = currentUser;
            this.isLoggedIn = true;
          }
        })
        .catch((error) => {
          console.error("erreur de récupération des utilisateurs:", error);
        });
    },

    logout() {
      this.user = null;
      this.isLoggedIn = false;
      window.location.href = "login.html"; // redirection vers la page de connexion
    },
  };
}
