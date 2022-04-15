/**Paramètre des api
 * "getAllProduct" : "/", ==> Retourne un tableau de tous les éléments
    "getProduct" : "/", ==> Renvoie l'élément correspondant à {product-id}, identifiant d'un produit
    "newsOrder" : "/order", ==> retourne l'objet contact
 * 
 * 
 */
/** */
const config = {
  api: {
    baseUrl: "http://localhost:3000/api/products",
    getAllProducts: "/",
    getOneProduct: "/:id",
    orderProducts: "/order",
  },
};
