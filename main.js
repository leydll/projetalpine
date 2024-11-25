import Alpine from "./node_modules/alpinejs/dist/module.esm.js";
import login from "./containers/loginContainer.js";
import signup from "./containers/signupContainer.js";
import logoutContainer from "./containers/logoutContainer.js";
import ProductList from "./containers/productContainer.js";

document.addEventListener("alpine:init", () => {
  Alpine.data("login", login);
  Alpine.data("signup", signup);
  Alpine.data("logoutApp", logoutContainer);
  Alpine.data("ProductList", ProductList);
});

Alpine.start();
