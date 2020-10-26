function handleSubmit(event){
    event.preventDefault();
    const input = document.querySelector(".searchForm-input").value;

    const searchQuery = input.trim();

    fetchResults(searchQuery);
}


function fetchResults(searchQuery){
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const results = data.query.search;
            displayResults(results);
        })
        .catch(() => console.log("An error occured"));
}


function displayResults(results){
    const searchresult = document.querySelector(".searchResults");
    searchresult.innerHTML = "";

    results.forEach(result => {
        const url = encodeURI( `https://en.wikipedia.org/wiki/${result.title}`);
        searchresult.insertAdjacentHTML(
            "beforeend",
            `
            <div class="resultItem">
            <h3 class="resultItem-title">
                <a href="${url}" target" _blank">${result.title}</a>
            </h3>
            <span class="resultItem-snippet">${result.snippet}</span>
            <a href="${url}" class="resultItem-link">${url}</a>
        </div>
            `
        );
    });
}


const form = document.querySelector(".searchForm");

form.addEventListener("submit", handleSubmit);


