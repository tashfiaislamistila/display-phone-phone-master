const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = "";

    // load data 
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data));
}
const displaySearchResult = (phones) => {
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    // console.log(searchResult);
    // const first20Data = phones.slice(0, 20);
    // console.log(first20Data);
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
          <div class="card h-100">
             <img src="${phone.image}" class="card-img-top" alt="...">
             <div class="card-body">
                 <h5 class="card-title">${phone.brand}</h5>
                 <h5 class="card-title">${phone.phone_name}</h5>
                 <div class="d-grid gap-2 col-6 mx-auto">
               <button onclick="mobileDetails('phone.slug')"class="btn btn-primary" type="button">Details</button>
                </div>
               </div>
            </div>
                 `;
        searchResult.appendChild(div);
    })
}
