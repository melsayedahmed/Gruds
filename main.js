let title = document.querySelector(".title");
let price = document.querySelector(".price");
let texes = document.querySelector(".texes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let totlaspan = document.querySelector(".totla-span");
let count = document.querySelector(".count");
let category = document.querySelector(".category");
let creat = document.querySelector(".creat");
let pricetaxesadstotal = document.querySelectorAll(
    ".price-taxes-ads-total input"
);
let tbody = document.querySelector("tbody");
let buttonsearch = document.querySelector(".button-search");
let adddeletebutton = document.querySelector(".add-delete-button");
let search = document.querySelector(".search");
let tmpi;

// keyup
price.addEventListener("keyup", function() {
    getTotal();
});
texes.addEventListener("keyup", function() {
    getTotal();
});
ads.addEventListener("keyup", function() {
    getTotal();
});
discount.addEventListener("keyup", function() {
    getTotal();
});

// click
price.addEventListener("click", function() {
    getTotal();
});
texes.addEventListener("click", function() {
    getTotal();
});
ads.addEventListener("click", function() {
    getTotal();
});
discount.addEventListener("click", function() {
    getTotal();
});

// get total

function getTotal() {
    let priceTotal = Number(price.value);
    let texesTotal = Number(texes.value);
    let adsTotal = Number(ads.value);
    let discountTotal = Number(discount.value);

    if (price.value != "") {
        let TotalNumper = priceTotal + texesTotal + adsTotal - discountTotal;
        totlaspan.innerText = TotalNumper;
    } else {
        totlaspan.innerText = "";
    }
}

// creat product

let dataPro = [];

if (localStorage.getItem("product") != null) {
    dataPro = JSON.parse(localStorage.getItem("product"));
} else {
    dataPro = [];
}

creat.addEventListener("click", function() {
    getData();
    ShowData();
});

function getData() {
    let titleget = title.value;
    let priceget = price.value;
    let texesget = texes.value;
    let adsget = ads.value;
    let discountget = discount.value;
    let totlaspanget = totlaspan.innerText;
    let countget = count.value;
    let categoryget = category.value;

    let newPro = {
        title: titleget,
        price: priceget,
        texes: texesget,
        ads: adsget,
        discount: discountget,
        totlaspan: totlaspanget,
        count: countget,
        category: categoryget,
    };

    if (title.value != "" && price.value != "" && category.value != "") {
        if (creat.innerText === "CREATE") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmpi] = newPro;
            creat.innerText = "create";
            count.style.display = "block";
        }
        clearinputs();
    } else {}

    localStorage.setItem("product", JSON.stringify(dataPro));
}

// save localstorge

// clear inputs

function clearinputs() {
    title.value = "";
    price.value = "";
    texes.value = "";
    ads.value = "";
    discount.value = "";
    totlaspan.innerText = "";
    count.value = "";
    category.value = "";
    // title.focus();
}

// read

function ShowData() {
    let table = ``;

    for (let i = 0; i < dataPro.length; i++) {
        table += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataPro[i].title}</td>
    <td>${dataPro[i].price}</td>
    <td>${dataPro[i].texes}</td>
    <td>${dataPro[i].ads}</td>
    <td>${dataPro[i].category}</td>
    <td>${dataPro[i].totlaspan}</td>
    <td><button onclick="updatedata(${i})" class="update">update</button></td>
    <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
  </tr>`;
    }
    tbody.innerHTML = table;

    showdelet();
}

function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    ShowData();
}

// count
// delete

function showdelet() {
    // let deletallbutton = document.createElement("button");
    // deletallbutton.classList.add("delet-all");
    // deletallbutton.innerText = `Delete All ( ${dataPro.length} ) `;
    // buttonsearch.after(deletallbutton);
    if (dataPro.length > 0) {
        // deletallbutton.classList.add("active");
        adddeletebutton.innerHTML = `
    <button  onclick="deletall()" class="delet-all">Delete All ( ${dataPro.length} ) </button>
    `;
        // deletall()
    } else {
        // deletallbutton.remove();
        adddeletebutton.innerHTML = "";
    }
    // deletallbutton.addEventListener("click", function () {
    //   deletall();
    //   this.remove();
    // });
}

function deletall() {
    localStorage.clear();
    dataPro.splice(0);
    ShowData();
}

ShowData();
// update

function updatedata(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    texes.value = dataPro[i].texes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    // totlaspan.innerText = dataPro[i].totlaspan;
    count.style.display = "none";
    category.value = dataPro[i].category;

    creat.innerText = `update`;
    getTotal();
    tmpi = i;
}

// search

let searchmood = "title";

function getsearchmood(id) {
    if (id == `search-title`) {
        searchmood = "title";
        search.placeholder = `search by title`;
    } else {
        searchmood = "catogeryMood";
        search.placeholder = `search by category`;
    }
    search.focus();
}

search.addEventListener("keyup", function() {
    searchdata(this.value);
});

function searchdata(value) {
    let table = ``;
    if (searchmood == "title") {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].texes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].category}</td>
        <td>${dataPro[i].totlaspan}</td>
        <td><button onclick="updatedata(${i})" class="update">update</button></td>
        <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
      </tr>`;
            }
        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].texes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].category}</td>
        <td>${dataPro[i].totlaspan}</td>
        <td><button onclick="updatedata(${i})" class="update">update</button></td>
        <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
      </tr>`;
            }
        }
    }
    tbody.innerHTML = table;
}

// clean date