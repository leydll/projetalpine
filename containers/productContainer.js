export default function ProductList() {
  return {
    products: [],
    filteredProducts: [],
    searchTerm: "",
    selectedCategory: "all",
    currentPage: 1,
    pageSize: 5,

    // la méthode pour charger les produits depuis produits.json
    async loadProducts() {
      try {
        const response = await fetch("./data/produits.json");
        if (!response.ok) {
          throw new Error("Erreur de chargement des produits");
        }
        this.products = await response.json();
        this.filteredProducts = this.products; // tous les produits sont affichés au départ
      } catch (error) {
        console.error("Erreur de chargement:", error);
      }
    },

    // la méthode pour filtrer les produits par catégorie
    filterByCategory() {
      if (this.selectedCategory === "all") {
        this.filteredProducts = this.products;
      } else {
        this.filteredProducts = this.products.filter(
          (product) => product.category === this.selectedCategory
        );
      }
    },

    // la fonction pour obtenir les catégories disponibles
    getCategories() {
      const categories = this.products.map((product) => product.category);
      return [...new Set(categories)]; // Retirer les doublons
    },

    // la fonction pour paginer les produits
    paginate(items, currentPage, pageSize) {
      if (!Array.isArray(items) || items.length === 0) {
        return []; // si il y a aucun produit n'est présent, retourne un tableau vide
      }
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, items.length);
      return items.slice(startIndex, endIndex);
    },

    // la méthode pour rechercher des produits
    searchProducts() {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },

    // la méthode pour changer la page de pagination
    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.totalPages) {
        this.currentPage = newPage;
      }
    },

    // calcul du nombre total de pages
    get totalPages() {
      return Math.ceil(this.filteredProducts.length / this.pageSize);
    },

    // initialisation des produits au chargement
    init() {
      this.loadProducts();
    },
  };
}
