/*************************************************************
 Récupération de l'ID du produit depuis l'URL de la page
 ************************************************************/

function productCheck() {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  return id;
}

/*************************************************************
 // Récupération des informations du produit grâce à son ID,
  depuis l'API.
 ************************************************************/

async function productInfos() {
  const productId = productCheck();
  try {
    res = await fetch(config.api.baseUrl + `/${productId}`);
    item = await res.json();
    return item;
  } catch (error) {
    console.log("Erreur: " + error);
  }
}

/*************************************************************
 Modification du DOM pour faire apparaitre les
  détails du produit.
 ************************************************************/

(async function fillProduct() {
  const item = await productInfos();
  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${item.imageUrl}" alt="${item.altTxt}">`;
  document.querySelector("#title").innerHTML = item.name;
  document.querySelector("#price").innerHTML = item.price;
  document.querySelector("#description").innerHTML = item.description;
  item.colors.forEach((color) => {
    document.querySelector(
      "#colors"
    ).innerHTML += `<option value="${color}">${color}</option>`;
  });
})();

/*************************************************************
 Envoi de la sélection de l'utilisateur,dans le localStorage.
 ************************************************************/

(function productStorage() {
  const sendButton = document.querySelector("#addToCart");
  // Ecoute l'évennement du bouton (click)
  sendButton.addEventListener("click", () => {
    const productId = productCheck();
    const productColor = document.querySelector("#colors").value;
    const productQuantity = document.querySelector("#quantity").value;
    console.log(productId);
    // Création d'un objet pour le locale Storage
    let productDetails = {
      id: productId,
      color: productColor,
      quantity: productQuantity,
    };
    console.log(productDetails);

    let storageStatus = JSON.parse(localStorage.getItem("product"));
    let storagePush = () => {
      console.log(storageStatus);
      //   comparaison de la couleur
      if (productColor === "") {
        // Popup d'alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Veuillez  choisir un coloris !",
        });

        //  comparaison de la quantitée
      } else if (productQuantity < 1 || productQuantity > 100) {
        //   Popup d'alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Veuillez  choisir une quantité !",
        });
      } else {
        // pousse dans le localstorage objet ==> let productDetails
        /* = {
          id: productId,
          color: productColor,
          quantity: productQuantity,*/

        storageStatus.push(productDetails);
        localStorage.setItem("product", JSON.stringify(storageStatus));
        //  Popup d'alert
        Swal.fire(
          "Merci!",
          "Votre sélection à été ajoutée au panier",
          "success"
        );
      }
    };
    // compare dans le localStorage id + color + quantity
    if (storageStatus) {
      storageStatus.forEach((product, index) => {
        if (
          productDetails.id === product.id &&
          productDetails.color === product.color
        ) {
          productDetails.quantity =
            //prend le nombre de quantité saisie et ajoute dans le localstorage
            parseInt(productDetails.quantity) + parseInt(product.quantity);
          storageStatus.splice(index, 1);
        }
        console.log(productDetails.quantity);
        console.log(productQuantity);
      });
      storagePush();
    } else {
      storageStatus = [];
      storagePush();
    }
  });
})();
