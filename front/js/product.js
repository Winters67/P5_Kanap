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
  sendButton.addEventListener("click", () => {
    const productId = productCheck();
    const productColor = document.querySelector("#colors").value;
    const productQuantity = document.querySelector("#quantity").value;
    // Création d'un objet pour le locale Storage
    let productDetails = {
      id: productId,
      color: productColor,
      quantity: productQuantity,
    };
    let storageStatus = JSON.parse(localStorage.getItem("product"));
    let storagePush = () => {
      //   comparaison de la couleur
      if (productColor === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Veuillez  choisir un coloris !",
        });

        // alert("Veuillez sélectionner une couleur");
        //  comparaison de la quantitée
      } else if (productQuantity < 1 || productQuantity > 100) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Veuillez  choisir une quantité !",
        });
      } else {
        //   pousse dans le localstorage objet productDetails
        storageStatus.push(productDetails);
        localStorage.setItem("product", JSON.stringify(storageStatus));
        Swal.fire(
          "Merci!",
          "Votre sélection à été ajoutée au panier",
          "success"
        );
        // alert("Votre sélection à été ajoutée au panier");
      }
    };
    if (storageStatus) {
      storageStatus.forEach((product, index) => {
        if (
          productDetails.id === product.id &&
          productDetails.color === product.color
        ) {
          productDetails.quantity =
            parseInt(productDetails.quantity) + parseInt(product.quantity);
          storageStatus.splice(index, 1);
        }
      });
      storagePush();
    } else {
      storageStatus = [];
      storagePush();
    }
  });
})();
