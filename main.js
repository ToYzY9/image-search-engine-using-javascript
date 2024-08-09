window.addEventListener("DOMContentLoaded", main);
const accessKey = "";

function main() {
    const searchForm = document.querySelector("#search-form");
    const searchBox = document.querySelector("#search-box");
    const searchResult = document.querySelector("#search-result");
    const showMoreBtn = document.querySelector("#show-more-btn");
    let keyword = "";
    let offset = 1;

    const searchImage = async () => {
        keyword = searchBox.value;
        const url = `https://api.unsplash.com/search/photos?page=${offset}&query=${keyword}&client_id=${accessKey}&per_page=12`;
        const options = { method: "GET" };
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            const results = data.results;

            if (offset === 1) {
                searchResult.innerHTML = "";
            }

            results.map((result) => {
                const image = document.createElement("img");
                image.setAttribute("src", `${result.urls["small"]}`);
                const imageLink = document.createElement("a");
                imageLink.setAttribute("href", `${result}`);
                imageLink.setAttribute("target", "_blank");

                imageLink.appendChild(image);
                searchResult.appendChild(imageLink);
            });
            showMoreBtn.style.display = "block";
        } catch (error) {
            console.error(error);
        }
    };

    searchForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        offset = 1;
        searchImage();
    });

    showMoreBtn.addEventListener("click", () => {
        offset++;
        searchImage();
    });
}
