// insertion de la desciption de tout les produits
selectItems = document.querySelector("#items");

function productHtml(canap) {
  return `
   <a href="product.html?${canap._id} ">
   <article>
   <img src="${canap.imageUrl}" alt= "image du canapé ${canap.altTxt} "/>
   <h3 class="productName">${canap.name}</h3>
   <p class="productDescription">${canap.description}</p>
   </article>
   </a>`;
}

/****
 * Récupération de tout les produits depuis l'api
 * voir fichier config.js
 *
 ****/

(function main() {
  fetch(config.api.baseUrl + config.api.getAllProduct)
    .then((reponse) => reponse.json())
    .then((promise) => {
      promise.forEach((canap) => {
        selectItems.innerHTML += productHtml(canap);
        console.log(canap);
      });
    })
    .catch((err) =>
      console.error(`Erreur récupération . Message d'erreur => : ${err}`)
    );
})();
