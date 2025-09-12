var answer = ""
function AskRufus () {
if (document.querey.reply.value == answer) answer="Psy-yi-yi... that wasn't a question!";
 else {
  var status=parseInt((Math.random())*10);
  if (status == 0) answer="\"Psy..?\"";
  if (status == 1) answer="\"Psy! Psy! Never!\"";
  if (status == 2) answer="\"Psy.. of course!\"";
  if (status == 3) answer="\"Psy! I doubt it!\"";
  if (status == 4) answer="\"Psy? Ask again later!\"";
  if (status == 5) answer="\"For sure!\"";
  if (status == 6) answer="\"Psy! What a dumb question!\"";
  if (status == 7) answer="\"Quack.. chances are good!\"";
  if (status == 8) answer="\"Psy-yi-yi.. it's possible!\"";
  if (status == 9) answer="\"Quack!\"";
  if (document.querey.reply.value == "") answer="Psy-yi-yi..... you didn't enter a question!";
 }
document.querey.reply.value = "Translating for Psyduck.........";
timerID=setTimeout("document.querey.reply.value = answer",500);
}
