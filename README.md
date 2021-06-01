# beershop-front

Dit is het front-end gedeelte (deel 2 van 2) waar je de installatie afrond van deel 1: https://github.com/rvelumos/beershop-back

Als het goed is heb je nu een werkende back-end die klaar is om data van de front-end op te vangen. Zo ja, ga dan hieronder door.

_**Front-end installatie**_

Om te beginnen open je het programma IntelliJ. Open het front-end project via 'File' > 'Open' en navigeer naar de bestandslocatie waar het front-end project is opgeslagen. 
Selecteer de map "beershop-app". Wanneer het project is geopend, zie je in het linkermenu een overzicht van allerlei bestanden.

Dit zijn de project bestanden waar alle html, css en javascript het beeld vormen en alle endpoints naar de back-end geinstalleerd zijn. 
Om de applicatie te installeren ga je naar "Terminal" en type je:

    npm install

Hierdoor worden alle bijbehorende instellingen opgehaald om het project te kunnen laten draaien. Het is dus van belang dat hierbij een actieve internet verbinding 
aanwezig is. Wanneer het project is geïnstalleerd, gebruik je het volgende commando: 
    npm start

Dit zal er voor zorgen dat jouw applicatie zal gaan draaien op poort 3000.  Wanneer je de applicatie in productie omgeving wilt draaien, 
volg dan het commando: 

    npm run build 
    
Hierbij worden de bestanden van de applicate verzameld en samengevoegd in de map build. Nadat de bestanden zijn aangemaakt draai je het volgende commando:  
    
    serve -s build 

Als de back-end applicatie ook draait ben je helemaal klaar om te starten! Je kunt nu navigeren naar: http://localhost:XXXX/ 
