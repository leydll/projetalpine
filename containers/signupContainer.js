export default function signup() {
  return {
    fields: [],
    showPopup: false,
    popupMessage: "",

    // pour le chargement asynchrone des champs
    async loadFields() {
      const response = await fetch("./data/form-fields.json");
      const jsonFields = await response.json();

      // pour filtrer les champs nécessaires
      this.fields = jsonFields.filter((field) =>
        ["email", "password", "nom", "prénom", "nomUtilisateur"].includes(
          field.name
        )
      );

      // pour ajouter un champ vide pour chaque champ de formulaire
      this.fields = this.fields.map((field) => ({ ...field, value: "" }));
    },

    async init() {
      await this.loadFields();
    },

    // la fonction pour récupérer les utilisateurs
    async loadUsers() {
      const response = await fetch("./data/users.json");
      const users = await response.json();
      return users;
    },

    // la fonction qui gère la soumission du formulaire
    async submitHandler() {
      const values = this.fields.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
      }, {});

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

      // pour la vérification de l'email
      if (!emailPattern.test(values.email)) {
        this.popupMessage = "Email invalide.";
        this.showPopup = true;
        return;
      }

      // pour la vérification du mot de passe
      if (!passwordPattern.test(values.password)) {
        this.popupMessage = "Mot de passe trop faible.";
        this.showPopup = true;
        return;
      }

      // pour la vérification de l'existence de l'email
      const users = await this.loadUsers();
      const emailExists = users.some((user) => user.email === values.email);

      if (emailExists) {
        this.popupMessage = "Cet email est déjà utilisé.";
        this.showPopup = true;
        return;
      }

      this.popupMessage = "Inscription réussie !";
      this.showPopup = true;
    },

    // la fonction pour basculer vers la page de connexion
    switchToLogin() {
      document.getElementById("signupContainer").classList.add("hidden");
      document.getElementById("loginContainer").classList.remove("hidden");
    },
  };
}
