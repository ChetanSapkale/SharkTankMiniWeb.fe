let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Task 1. List of pitches on page load

let newArr = [];

function getData() {
  fetch(`https://sharktankminiweb-db.onrender.com/pitches`)
    .then((res) => res.json())
    .then((data) => {
      newArr = data;
      cardList(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
getData();

function createCard(id, image, title, founder, category, price) {
  let div = `
        <div class="card">
            <div class="card-img">
                <a href="Description.html?image=${image}&title=${title}&founder=${founder}&category=${category}&price=${price}">
                <img style="height: 300px; width: 280px; margin-top: 10px;" src="${image}" alt="" /></a>
            </div>
            
            <div class="card-body">
                <h3 class="card-title">${title}</h3>
                <h4 class="card-founder">Founder:-${founder}</h4>
                <h4 class="card-category">${category}</h4>
                <h4 class="card-price">$${parseFloat(price).toFixed(2)}</h4>
                <button class="card-update" id=${id}>Update</button>
                <button class="card-delete" id=${id}>Delete</button>
            </div>
        </div>
    `;
  return div;
}

function cardList(data) {
  let container = data
    .map((el) => {
      return createCard(
        el.id,
        el.image,
        el.title,
        el.founder,
        el.category,
        el.price
      );
    })
    .join("");
  mainSection.innerHTML = container;
}

// Task 2. Create a new pitch

pitchCreateBtn.addEventListener("click", () => {
  const title = pitchTitleInput.value;
  const image = pitchImageInput.value;
  const category = pitchCategoryInput.value;
  const founder = pitchfounderInput.value;
  const price = pitchPriceInput.value;

  const newPitch = {
    title,
    image,
    category,
    founder,
    price,
  };

  fetch("https://sharktankminiweb-db.onrender.com/pitches", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPitch),
  })
    .then((res) => {
      console.log(res);
      alert("Pitch created successfully");
      getData();
    })
    .catch((err) => {
      console.log(err);
    });
});

// Task 3. Sort

sortAtoZBtn.addEventListener("click", () => {
  const sortedData = newArr.sort((a, b) => a.price - b.price);
  cardList(sortedData);
});

sortZtoABtn.addEventListener("click", () => {
  const sortedData = newArr.sort((a, b) => b.price - a.price);
  cardList(sortedData);
});

// Task 4. Filter

filterFood.addEventListener("click", () => {
  const filterData = newArr.filter((el) => el.category === "Food");
  cardList(filterData);
});

filterElectronics.addEventListener("click", () => {
  const filterData = newArr.filter((el) => el.category === "Electronics");
  cardList(filterData);
});

filterPersonalCare.addEventListener("click", () => {
  const filterData = newArr.filter((el) => el.category === "Personal Care");
  cardList(filterData);
});

// Task 5. Edit/Update Pitch

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-update")) {
    getsingledata(e.target.id);
  }
});

function getsingledata(currentid) {
  fetch(`https://sharktankminiweb-db.onrender.com/pitches/${currentid}`)
    .then((res) => res.json())
    .then((data) => {
      updatePitchIdInput.value = data.id;
      updatePitchTitleInput.value = data.title;
      updatePitchImageInput.value = data.image;
      updatePitchfounderInput.value = data.founder;
      updatePitchCategoryInput.value = data.category;
      updatePitchPriceInput.value = data.price;
    })
    .catch((err) => {
      console.log(err);
    });
}

updatePitchBtn.addEventListener("click", () => {
  let updateProductData = {
    id: updatePitchIdInput.value,
    title: updatePitchTitleInput.value,
    image: updatePitchImageInput.value,
    founder: updatePitchfounderInput.value,
    category: updatePitchCategoryInput.value,
    price: updatePitchPriceInput.value,
  };

  fetch(`https://sharktankminiweb-db.onrender.com/pitches/${updateProductData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateProductData),
  })
    .then((res) => {
      alert("Pitch updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Task 6. Edit/Update by Price

updatePricePitchPriceButton.addEventListener("click", () => {
  let updateProductPrice = {
    id: updatePricePitchId.value,
    price: updatePricePitchPrice.value,
  };

  fetch(`https://sharktankminiweb-db.onrender.com/pitches/${updateProductPrice.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateProductPrice),
  })
    .then((res) => {
      alert("Pitch updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Task 7. Delete Pitch

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("card-delete")) {
    DeleteProduct(e.target.id);
  }
});

function DeleteProduct(id) {
  fetch(`https://sharktankminiweb-db.onrender.com/pitches/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      console.log(res);
      alert("Product Deleted");
    })
    .catch((err) => {
      console.log(err);
    });
}

// Task 8. Search by title/founder

searchByButton.addEventListener("click", () => {
  const searchBySelectValue = searchBySelect.value;
  const searchByInputValue = searchByInput.value;

  const SearchData = newArr.filter((el, i) => {
    if (searchBySelectValue == "title") {
      return el.title.toLowerCase().includes(searchByInputValue.toLowerCase());
    } else if (searchBySelectValue == "founder") {
      return el.founder
        .toLowerCase()
        .includes(searchByInputValue.toLowerCase());
    } else {
      return el;
    }
  });

  cardList(SearchData);
});
