/*************************************************************
 Récupération de la liste des produits et de leurs détails,
 adresse de l'api dans le fichier config.js
 ************************************************************/

async function getItems() {
  try {
    res = await fetch(config.api.baseUrl);
    items = await res.json();
    return items;
  } catch (error) {
    console.log("Erreur: " + error);
  }
}

/************************************************************
 * Modification du DOM pour faire apparaitre les produits ***
 ************************************************************/

function showItem(item) {
  document.querySelector("#items").innerHTML += `
        <a href="./product.html?id=${item._id}">
            <article>
                <img src="${item.imageUrl}" alt="${item.altTxt}">
                <h3 class="productName">${item.name}</h3>
                <p class="productDescription">${item.description}</p>
            </article>
        </a>`;
}

/************************************************************
 ***** Boucle affichage des produits de la page accueil ******
 ************************************************************/

(async function renderProducts() {
  items = await getItems();
  items.forEach((item) => {
    showItem(item);
  });
})();
