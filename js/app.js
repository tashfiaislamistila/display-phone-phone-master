// ---------------------------------search field call -------------------------
const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = "";
    //<--------------------------------spinner show------------------------>
    document.getElementById('spinner').style.display = "block";
    //<---------------error handle ------------------------------------------------------------------------------>
    if (searchText == "") {
        document.getElementById('error').style.display = "block";
    }
    else {
        //<----------------load search data -------------------------------------------------------------------------->
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(loadsearchdata => displaySearchResult(loadsearchdata.data));
        document.getElementById('error').style.display = "none";
    }
}
//<-------------show result in search bar -------------------------------------------------------------------------------------->

const displaySearchResult = (phones) => {
    const searchResult = document.getElementById('search-result');

    searchResult.textContent = "";
    const first20Data = phones.slice(0, 20);
    const singlePhoneDetails = document.getElementById('singlephone-details')
    singlePhoneDetails.textContent = "";
    //<-------------------------error handle with alert function -------------------------------------------------------------------------------------->
    if (phones == 0) {
        alert("Sorry!! no phone found");
    }
    else {

        first20Data.forEach(phone => {
            // <-----------------Phone picture show with bootstrap crad --------------------------------------------------------------------------------->
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
              <div class="card h-100 mb-3 w-75 mx-auto">
                 <img src="${phone.image}" class="card-img-top " alt="...">
             <div class="card-body">
                 <h5 class="card-title">${phone.brand}</h5>
                 <h5 class="card-title">${phone.phone_name}</h5>
                 <div class="d-grid gap-2 col-6 mx-auto">
               <button onclick="loadPhoneData('${phone.slug}')"class="btn btn-primary"      type="button">Details</button>
                </div>
               </div>
            </div>
                 `;
            searchResult.appendChild(div);
        });
        //<--------------------------------spinner closed------------------------>
        document.getElementById('spinner').style.display = "none";
    }
}
//<-------------------------------load phone data ------------------------------------------------------------------------------------------->
const loadPhoneData = (mobileId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${mobileId}`;
    fetch(url)
        .then(res => res.json())
        .then(loadPhoneData => displayMobileDetails(loadPhoneData.data));
}
//<---------------------display single mobile details ------------------------------------------------------------------------------------------->
const displayMobileDetails = (mobiledetails) => {
    const phoneDetails = document.getElementById('singlephone-details')
    const div = document.createElement('div');
    div.classList.add('card');
    phoneDetails.innerHTML = "";
    //< ---------dinamically display single mobile feature details and also releaseDate --------------------------------------------------------------------------------------->
    div.innerHTML = `
    <div class="card h-100 mb-3 mx-auto">
    <img src="${mobiledetails.image}" class="w-25 card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title"><span class="fw-bold">Mobile Name:</span> ${mobiledetails.name}</h5>
        <h5 class="card-title"><span class="fw-bold">Brand Name:</span> ${mobiledetails.brand}</h5>
            <ul class="list-group">
            <li class="list-group-item text-center"><span class="fw-bolder ">Main Features </span></li>
     <li class="list-group-item"><span class="fw-bold">Storage:</span> ${mobiledetails.mainFeatures.storage}</li>
     <li class="list-group-item list-group-item-primary"><span class="fw-bold">DisplaySize:</span> ${mobiledetails.mainFeatures.displaySize}</li>
     <li class="list-group-item list-group-item-secondary"><span class="fw-bold">ChipSet:</span> ${mobiledetails.mainFeatures.chipSet}</li>
     <li class="list-group-item list-group-item-success"><span class="fw-bold">Memory:</span> ${mobiledetails.mainFeatures.memory}</li>
     <li class="list-group-item text-center"><span class="fw-bolder">Sensors </span></li>
     <li class="list-group-item list-group-item-danger"><span class="fw-bold"></span>${mobiledetails.mainFeatures.sensors[0]}</li>
      <li class="list-group-item list-group-item-warning"><span class="fw-bold"></span>${mobiledetails.mainFeatures.sensors[1]}</li>
      <li class="list-group-item list-group-item-info"><span class="fw-bold"></span>${mobiledetails.mainFeatures.sensors[2]}</li>
      <li class="list-group-item list-group-item-success"><span class="fw-bold"></span>${mobiledetails.mainFeatures.sensors[3]}</li>
     <li class="list-group-item list-group-item-danger"><span class="fw-bold"></span>${mobiledetails.mainFeatures.sensors[4]}</li>
      <li class="list-group-item list-group-item-warning"><span class="fw-bold"></span>${mobiledetails.mainFeatures.sensors[5]}</li>
      <li class="list-group-item text-center"><span class="fw-bolder">Others </span></li>
    <li class="list-group-item list-group-item-warning"><span class="fw-bold">WLAN:</span>${mobiledetails.others?.WLAN ? mobiledetails.others.WLAN : " No WLAN found "}</li>
      <li class="list-group-item list-group-item-info"><span class="fw-bold">Bluetooth:</span>${mobiledetails.others?.Bluetooth ? mobiledetails.others.Bluetooth : " No Bluetooth found "}</li>
         <li class="list-group-item list-group-item-light"><span class="fw-bold">GPS:</span>${mobiledetails.others?.GPS ? mobiledetails.others.GPS : " No GPS found "}</li>
          <li class="list-group-item list-group-item-dark"><span class="fw-bold">NFC:</span>${mobiledetails.others?.NFC ? mobiledetails.others.NFC : " No NFC found "}</li>
         <li class="list-group-item list-group-item-primary"><span class="fw-bold">Radio:</span> ${mobiledetails.others?.Radio ? mobiledetails.others.Radio : " No Radio found "}</li>
          <li class="list-group-item list-group-item-success"><span class="fw-bold">USB:</span>
          ${mobiledetails.others?.USB ? mobiledetails.others.USB : " No USB found "}</li>
        <li class="list-group-item text-center"><span class="fw-bolder">Release Date </span></li>
        <li class="list-group-item list-group-item-danger"><span class="fw-bold">ReleaseDate:</span> ${mobiledetails.releaseDate ? mobiledetails.releaseDate : " No release date found "}</li>
</ul>
    </div>
</div>
    `;
    phoneDetails.appendChild(div);
}