document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("left-sidebar");
    if (!sidebar) return;
    sidebar.innerHTML = `
    <center>
        <img src="./Visual/navbar/main.PNG"><br>
        <table width="139"><tr>
        <td width="139" style="border-left: 1 solid #000000; border-bottom: 1 solid #000000; border-right: 1 solid #000000; border-top: 1 solid #000000;" background="/web/20050207184020im_/http://tohjo.mybesthost.com/mbp.png">
        <font face="tahoma" size="2">
        &nbsp;<a href="main.html">Home</a><br>
        &nbsp;<a href="network.html">Network</a><br>
        &nbsp;<a href="index.html">Splash Page</a><br>
        &nbsp;<a href="fanart.html">Fan Art</a><br>
        &nbsp;<a href="staff.html">Staff</a><br>
        &nbsp;<a href="joinstaff.html">Join the Staff</a><br>
        &nbsp;<a href="awards.html">Awards</a><br>
        &nbsp;<a href="linktf.html">Link To TF</a><br>
        &nbsp;<a href="links.html">Pokémon Links</a><br>
        &nbsp;<a href="credits.html">Credits</a><br>
        </font>
        </td></tr></table>
        <img src="./Visual/navbar/gameboy.PNG"><br>
        <table width="139"><tr>
        <td width="139" style="border-left: 1 solid #000000; border-bottom: 1 solid #000000; border-right: 1 solid #000000; border-top: 1 solid #000000;" background="/web/20050207184020im_/http://tohjo.mybesthost.com/mbp.png">
        <font face="tahoma" size="2">
        &nbsp;<a href="rb.html">Red/Blue</a><br>
        &nbsp;<a href="yellow.html">Yellow</a><br>
        &nbsp;<a href="gs.html">Gold/Silver</a><br>
        &nbsp;<a href="crystal.html">Crystal</a><br>
        &nbsp;<a href="rs.html">Ruby/Sapphire</a><br>
        &nbsp;<a href="pinballrs.html">Pinball: R&S;</a><br>
        &nbsp;<a href="frlg.html">FR/LG</a><br>
        &nbsp;<a href="emerald.html">Emerald</a><br>
        &nbsp;<a href="dp.html">Diamond/Pearl</a><br>
        &nbsp;<a href="dash.html">Dash</a><br>
        </font>
        </td></tr></table>
        <img src="./Visual/navbar/n64.PNG"><br>
        <table width="139"><tr>
        <td width="139" style="border-left: 1 solid #000000; border-bottom: 1 solid #000000; border-right: 1 solid #000000; border-top: 1 solid #000000;" background="/web/20050207184020im_/http://tohjo.mybesthost.com/mbp.png">
        <font face="tahoma" size="2">
        &nbsp;<a href="snap.html">Snap</a><br>
        &nbsp;<a href="stadium.html">Stadium</a><br>
        &nbsp;<a href="puzzleleague.html">Puzzle League</a><br>
        &nbsp;<a href="stadium2.html">Stadium 2</a><br>
        </font>
        </td></tr></table>
        <img src="./Visual/navbar/gamecube.PNG"><br>
        <table width="139"><tr>
        <td width="139" style="border-left: 1 solid #000000; border-bottom: 1 solid #000000; border-right: 1 solid #000000; border-top: 1 solid #000000;" background="/web/20050207184020im_/http://tohjo.mybesthost.com/mbp.png">
        <font face="tahoma" size="2">
        &nbsp;<a href="channel.html">Channel</a><br>
        &nbsp;<a href="box.html">Box</a><br>
        &nbsp;<a href="colosseum.html">Colosseum</a><br>
        </font>
        </td></tr></table>
        <img src="./Visual/navbar/tv.PNG"><br>
        <table width="139"><tr>
        <td width="139" style="border-left: 1 solid #000000; border-bottom: 1 solid #000000; border-right: 1 solid #000000; border-top: 1 solid #000000;" background="/web/20050207184020im_/http://tohjo.mybesthost.com/mbp.png">
        <font face="tahoma" size="2">
        &nbsp;<a href="characters.html">Characters</a><br>
        &nbsp;<a href="lyrics.html">Opening Lyrics</a><br>
        &nbsp;<a href="season1.html">Indigo League</a><br>
        &nbsp;<a href="season2.html">Orange Islands</a><br>
        &nbsp;<a href="season3.html">Johto Journeys</a><br>
        &nbsp;<a href="season4.html">Johto Champions</a><br>
        &nbsp;<a href="season5.html">Master Quest</a><br>
        &nbsp;<a href="season6.html">Advanced</a><br>
        </font>
        </td></tr></table>
        <img src="./Visual/navbar/movies.PNG"><br>
        <table width="139"><tr>
        <td width="139" style="border-left: 1 solid #000000; border-bottom: 1 solid #000000; border-right: 1 solid #000000; border-top: 1 solid #000000;" background="/web/20050207184020im_/http://tohjo.mybesthost.com/mbp.png">
        <font face="tahoma" size="2">
        &nbsp;<a href="movie1.html">Mewtwo S. B.</a><br>
        &nbsp;<a href="movie2.html">Pokémon 2000</a><br>
        &nbsp;<a href="movie3.html">Spell of the Unown</a><br>
        &nbsp;<a href="movie4.html">Pokémon 4 Ever</a><br>
        </font>
        </td></tr></table>
        <img src="./Visual/navbar/other.PNG"><br>
        <table width="139"><tr>
        <td width="139" style="border-left: 1 solid #000000; border-bottom: 1 solid #000000; border-right: 1 solid #000000; border-top: 1 solid #000000;" background="/web/20050207184020im_/http://tohjo.mybesthost.com/mbp.png">
        <font face="tahoma" size="2">
        &nbsp;<a href="hangman.html">Hangman</a><br>
        &nbsp;<a href="psyduck.html">Psyduck</a><br>
        &nbsp;<a href="pikachu.html">Virtual Pikachu</a><br>
        &nbsp;<a href="diglett.html">Diglett Bash</a><br>
        &nbsp;<a href="archivedpages.html">Archived Pages</a><br>
        </font>
        </td></tr></table>
        <img src="./Visual/navbar/webmasters.PNG"><br>
        <table width="139"><tr>
        <td width="139" style="border-left: 1 solid #000000; border-bottom: 1 solid #000000; border-right: 1 solid #000000; border-top: 1 solid #000000;" background="/web/20050207184020im_/http://tohjo.mybesthost.com/mbp.png">
        <font face="tahoma" size="2">
        &nbsp;<a href="buttonhelp.html">Buttons</a><br>
        &nbsp;<a href="bannershelp.html">Banners</a><br>
        &nbsp;<a href="layouts.html">Layouts</a><br>
        &nbsp;<a href="splashpics.html">Splash Pics</a><br>
        &nbsp;<a href="php.html">PHP Help</a><br>
        &nbsp;<a href="ssi.html">SSI Help</a><br>
        </font>
        </td></tr></table>
        <br>
    </center>
    `;
});
