// links and images.
function updateAffiliates() {
    const affiliatesHTML = `
        <a href="https://tohjo-falls.neocities.org/">
            <img src="./Visual/header/tfaffiliate.png" alt="The Tohjo Falls">
        </a><br>
        <a href="http://angelfire.com/anime4/animefanime">
            <img src="./Visual/header/animefanime.gif" border="0">
        </a>
        <a href="https://angelfire.com/pokemon2/pkmnjourney/linktous.html">
            <img src="./Visual/header/pokejourneyani.gif" border="0">
        </a>
    `;

    // inject into html
    const affiliatesSection = document.querySelector('#affiliates-section');
    if (affiliatesSection) {
        affiliatesSection.innerHTML = affiliatesHTML;
    }
}

// call function pageload
document.addEventListener('DOMContentLoaded', updateAffiliates);
