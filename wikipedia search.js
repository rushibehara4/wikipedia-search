let searchInputEl = document.getElementById("searchInput");
let searchResultContainer = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        link,
        title,
        description
    } = result;

    let listEl = document.createElement("div");
    listEl.classList.add("d-flex", "flex-column", "result-item");
    searchResultContainer.appendChild(listEl);

    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    listEl.appendChild(titleEl);

    let linkEl = document.createElement("a");
    linkEl.classList.add("result-url");
    linkEl.textContent = link;
    linkEl.href = link;
    listEl.appendChild(linkEl);

    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    listEl.appendChild(descriptionEl);

}

function displayResults(searchResults) {
    spinnerEl.classList.add("d-none");

    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function wikipediaSearch(event) {
    if (event.key === "Enter") {
        searchResultContainer.textContent = "";
        spinnerEl.classList.remove("d-none");

        let inputValue = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + inputValue;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(resposne) {
                return resposne.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", wikipediaSearch);