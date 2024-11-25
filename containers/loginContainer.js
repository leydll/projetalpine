export default function login() {
  return {
    fields: [
      {
        name: "email",
        type: "email",
        placeholder: "Email",
        value: "",
      },
      {
        name: "password",
        type: "password",
        placeholder: "Mot de passe",
        value: "",
      },
    ],
    showPopup: false,
    popupMessage: "",

    // la fonction pour chharger les utilisateurs depuis users.json
    async loadUsers() {
      try {
        const response = await fetch("./data/users.json");
        const users = await response.json();
        return users;
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs:", error);
      }
    },

    async submitHandler() {
      const { email, password } = this.fields.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
      }, {});

      if (!email || !password) {
        this.popupMessage = "Veuillez remplir tous les champs.";
        this.showPopup = true;
        return;
      }

      const users = await this.loadUsers();
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        window.location.href = "index.html";
      } else {
        this.popupMessage = "Identifiants incorrects.";
        this.showPopup = true;
      }
    },

    switchToSignup() {
      document.getElementById("loginContainer").hidden = true;
      document.getElementById("signupContainer").hidden = false;
    },
  };
}
