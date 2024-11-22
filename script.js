const API_KEY = "556e5cb9f84d4a3f98dff06720bfde55";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Technology"));

document.getElementById("search-button").addEventListener("click", () => {
    const query = document.getElementById("search-input").value;
    if (query) {
        fetchNews(query);
    }
});

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch news: ${res.status}`);
        }
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cardscontainer");
    const newsCardTemplate = document.getElementById("template-news-card");

    // Clear existing content
    cardsContainer.innerHTML = "";

    // Iterate through articles
    articles.forEach((article) => {
        if (!article.urlToImage) return;

        // Clone the template content
        const cardClone = newsCardTemplate.content.cloneNode(true);

        // Populate the card with article data
        const newsImage = cardClone.querySelector(".news-image");
        const newsTitle = cardClone.querySelector(".news-title");
        const newsDescription = cardClone.querySelector(".news-description");
        const newsLink = cardClone.querySelector(".read-more");

        newsImage.src = article.urlToImage;
        newsImage.alt = article.title || "News Image";
        newsTitle.textContent = article.title || "No Title Available";
        newsDescription.textContent = article.description || "No Description Available";
        newsLink.href = article.url;
        newsLink.target = "_blank";

        // Append the card to the container
        cardsContainer.appendChild(cardClone);
    });
}
