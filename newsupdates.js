document.addEventListener("DOMContentLoaded", function () {
    const newsUpdatesSection = document.getElementById("news-updates-section");
    if (newsUpdatesSection) {
        newsUpdatesSection.innerHTML = `
            <marquee behavior="scroll" direction="up" scrollamount="2" style="height: 100px;">
                <a href="main.html">News & Updates</a><br>
                Welcome to Tohjo Falls!
            </marquee>
        `;
    }
});
