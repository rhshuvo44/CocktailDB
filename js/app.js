// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita 
const getApi=()=>{
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
        .then(res=>res.json())
        .then(data =>searchResult(data));
    }
getApi();

// input search 

const search=()=>{
    const searchInput =document.getElementById('search-flid').value;
    const url=`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;

    if (searchInput === '') {
        const searchResultCard = document.getElementById('search-result');
    searchResultCard.innerHTML = '';
        document.getElementById('error1').style.display='block';
    document.getElementById('error2').style.display='none';
    }else{
        fetch(url)
        .then(res=>res.json())
        .then(data =>searchResult(data));
        const searchResultCard = document.getElementById('search-result');
        searchResultCard.innerHTML = '';
        document.getElementById('error2').style.display='block';
        document.getElementById('error1').style.display='none';
    }
}
const searchResult =(data)=>{
    const searchResultCard = document.getElementById('search-result');
    searchResultCard.innerHTML = ''
    const drinks = data.drinks;
    drinks.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
        <div class="card h-100">
            <img src="${element.strDrinkThumb}" class="card-img-top" alt="..." />
                <div class="card-body">
                <h5 class="card-title">${element.strDrink}</h5>
                <p class="card-text">${element.strInstructions}</p>
                </div>
                <button onclick="singleData('${element.idDrink}')"
                    type="button"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop" >
                    Details
                </button>
        </div>
        `;
        searchResultCard.appendChild(div);

    });
    document.getElementById('error2').style.display='none';

}

const singleData =(idDrink)=>{
    const url =`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`
    fetch(url)
    .then(res => res.json())
    .then(data=>loadData(data))
}
const loadData =(data)=>{
    const drink=data.drinks[0];
    const single= document.getElementById('staticBackdrop');
    single.innerHTML ='';
    const div = document.createElement('div');
    div.classList.add('modal-dialog');
    div.innerHTML=`
    <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">${drink.strDrink}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">${drink.strInstructions}</div>
          </div>
    `;
    single.appendChild(div)

}
