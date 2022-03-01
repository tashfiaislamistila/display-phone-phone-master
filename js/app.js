// const displayspinner = spinner => {
//     document.getElementById('spinner').style.display = spinner;
// }
const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // displayspinner('block');
    searchField.value = "";
    //<----------------error handle--------------->
    if (searchText == "") {
        document.getElementById('error').style.display = "block";
    }

    else {
        //<----------------load  search data ------------>
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(loadsearchdata => displaySearchResult(loadsearchdata.data));
        document.getElementById('error').style.display = "none";
    }
}
//<----------------show result in search bar--------------->

const displaySearchResult = (phones) => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = "";
    //     alert("Sorry!! no phone found");
    // console.log(searchResult);
    // const first20Data = phones.slice(0, 20);
    // console.log(first20Data);
    //<--------------------------error handle--------------------->
    if (phones == 0) {
        alert("Sorry!! no phone found");
    }
    else {
        phones.forEach(phone => {
            // console.log(phone);
            // <--------------Phone picture show with bootstrap crad--------->
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
          <div class="card h-100 mb-3 w-75 mx-auto">
             <img src="${phone.image}" class="card-img-top" alt="...">
             <div class="card-body">
                 <h5 class="card-title">${phone.brand}</h5>
                 <h5 class="card-title">${phone.phone_name}</h5>
                 <div class="d-grid gap-2 col-6 mx-auto">
               <button onclick="loadPhoneData('${phone.slug}')"class="btn btn-primary" type="button">Details</button>
                </div>
               </div>
            </div>
                 `;
            searchResult.appendChild(div);
        });
        // displayspinner('none');
    }
}
//<--------------------load phone data---------------->
const loadPhoneData = (mobileId) => {
    // console.log(mobileId);
    const url = `https://openapi.programming-hero.com/api/phone/${mobileId}`;
    fetch(url)
        .then(res => res.json())
        .then(loadPhoneData => displayMobileDetails(loadPhoneData.data));
}

//<------------display single mobile details ----------------->
const displayMobileDetails = (mobiledetails) => {
    // console.log(mobiledetails);
    const phoneDetails = document.getElementById('singlephone-details')
    const div = document.createElement('div');
    div.classList.add('card');
    phoneDetails.innerHTML = "";
    //< -------------dinamically display single mobile feature details --------->
    div.innerHTML = `
    <div class="card h-100 mb-3 w-50 mx-auto">
    <img src="${mobiledetails.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title"><span class="fw-bold">Mobile Name:</span> ${mobiledetails.name}</h5>
        <h5 class="card-title"><span class="fw-bold">Brand Name:</span> ${mobiledetails.brand}</h5>
            <ul class="list-group">
  <li class="list-group-item"><span class="fw-bold">Storage:</span> ${mobiledetails.mainFeatures.storage}</li>
  <li class="list-group-item list-group-item-primary"><span class="fw-bold">DisplaySize:</span> ${mobiledetails.mainFeatures.displaySize}</li>
  <li class="list-group-item list-group-item-secondary"><span class="fw-bold">ChipSet:</span> ${mobiledetails.mainFeatures.chipSet}</li>
  <li class="list-group-item list-group-item-success"><span class="fw-bold">Memory:</span> ${mobiledetails.mainFeatures.memory}</li>
  <li class="list-group-item list-group-item-danger"><span class="fw-bold">Sensors:</span>${mobiledetails.mainFeatures.sensors}</li>
  <li class="list-group-item list-group-item-warning"><span class="fw-bold">WLAN:</span>${mobiledetails.others.WLAN}</li>
  <li class="list-group-item list-group-item-info"><span class="fw-bold">Bluetooth:</span>${mobiledetails.others.Bluetooth}</li>
  <li class="list-group-item list-group-item-light"><span class="fw-bold">GPS:</span>${mobiledetails.others.GPS}</li>
  <li class="list-group-item list-group-item-dark"><span class="fw-bold">NFC:</span>${mobiledetails.others.NFC}</li>
  <li class="list-group-item list-group-item-primary"><span class="fw-bold">Radio:</span> ${mobiledetails.others.Radio}</li>
  <li class="list-group-item list-group-item-success"><span class="fw-bold">USB:</span> ${mobiledetails.others.USB}</li>
</ul>
    </div>
</div>
    `;
    phoneDetails.appendChild(div);

}