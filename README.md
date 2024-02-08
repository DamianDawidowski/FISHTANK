# FISHTANK <img alt="logo" src="./frontend/src/assets/logo.png" width="40"/>
## TECHSTACK


### Frontend  
<div align="center">  
<a href="https://getbootstrap.com/docs/3.4/javascript/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/bootstrap-plain.svg" alt="Bootstrap" height="50" /></a>  
<a href="https://www.w3schools.com/css/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" height="50" /></a>  
<a href="https://en.wikipedia.org/wiki/HTML5" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/html5-original-wordmark.svg" alt="HTML5" height="50" /></a>  
<a href="https://www.typescriptlang.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/typescript-original.svg" alt="TypeScript" height="50" /></a>  
<a href="https://angular.io/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/angularjs-original.svg" alt="Angular" height="50" /></a>  
<a href="https://github.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg" alt="Git" height="50" /></a>  
<a href="https://mui.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/mui.png" alt="Material UI" height="50" /></a>  
<a href="https://www.docker.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/docker-original-wordmark.svg" alt="Docker" height="50" /></a>  
</div>

</td><td valign="top" width="33%">



### Backend  
<div align="center">  
<a href="https://github.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/git-scm-icon.svg" alt="Git" height="50" /></a>  
<a href="https://docs.spring.io/spring-framework/docs/3.0.x/reference/expressions.html#:~:text=The%20Spring%20Expression%20Language%20(SpEL,and%20basic%20string%20templating%20functionality." target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/springio-icon.svg" alt="Spring" height="50" /></a>  
<a href="https://www.java.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/java-original-wordmark.svg" alt="Java" height="50" /></a>  
<a href="https://www.postgresql.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/postgresql-original-wordmark.svg" alt="PostgreSQL" height="50" /></a>  
<a href="https://www.docker.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/docker-original-wordmark.svg" alt="Docker" height="50" /></a>  
</div>

</td><td valign="top" width="33%">

### Recommended/Required Program Versions
LTS version of Node.js [Available here](https://nodejs.org/en/)

Oracle Java 17 JDK [Available here](https://www.oracle.com/java/technologies/downloads/#java17)

## Instructions

You can start the entire app by simply running the Docker Compose file:
```
docker-compose up
```
Alternatevily, you can initiate the three services separately:

1) Initiate the database:
```
docker run -d -e POSTGRES_HOST_AUTH_METHOD=trust -e POSTGRES_USER=backend -e POSTGRES_PASSWORD=backend -e POSTGRES_DB=fishtankdb -p 5434:5432 postgres:13
```
2) Start the backend server 
```
cd backend
mvn spring-boot:run
```
3) Start the frontend angular FISHTANK app:
```
cd frontend
npm install
ng serve (do: 'npm run ng serve' instead if Node is not added to PATH on your PC)
```

# Features
### Login and Register Pages 
Multiple users can setup their own tanks. However the fish database is shared (may change in the future depending on user feedback)

![register](./imgReadme/register.png)
### Fish selection
Initially I envisioned simply hooking up the app to external REST API service to obtain a suitably large set of aquarium fish data. However it appears no suitable service exists, therefore I included a small fish database within the app, with the obvious and necessary option to add more fishes to this database by the user. The user will need to supply accurate details for each new fish, to allow the FISHTANK to give back reliable feedback.

![register](./imgReadme/fishToChoose.png)
### Welcome instructions
Instructions aim to lead the user to the particular order of actions to fully use the app functionality. The order is to setup the tank first, add the desired fish, and then check the My tank tab for alerts on both left and right panels.  The alerts are blinking icons, with the blink rate and color changing with severity of parameter disparity, to catch and focus the attention of the user. 

![welcomeScreen](./imgReadme/welcome.png)
### Water parameters optimization function 
The "Find optimal water parameters" button loads the optimal water parameters(hardness, temperature, pH) based on requirements of all fishes picked by the user. Note that the found values are averages of all individual fish preferences, and as such will not guarantee that the found value will satisfy every fish, especially those with narrow parameter preference. Manual fine-tuning by the user may be required. Finally, some fishes have too different water parameter preferences, to which a good middle ground value cannot be found. Those fishes should not be kept together.

![optimiseParams](./imgReadme/goodParamsFind.png)
### Program feedback as visual icons and dialog messages 
The program automatically compares setup fishtank parameters, as well as other fish tankmates, against the preferences of each individual fish, and gives blinking icon alerts if problems are detected. The potential alerts are concerning: water parameter (temperature, water hardness or pH) outside of tolerable range, too small a tank volume, less then 5 fish of one type (if fish prefers to live in a group = schooling), presence of a predator thats at least 3x bigger, presence of an active tankmate that may excessively dominate the shy or delicate fish (common problem with Discus), and finally too small a dimension, either length, depth or height compared to the adult fish length (preferred values are 4x, 1.5x, 1.5x). Clicking the alerts will display dialog windows clarifying what the problem is, ie "the tank pH is 1 unit below the minimum tolerated by the fish".

![errorIcons](./imgReadme/errorIcons.png)

### Tank visualisation and animation
Tank layout in the middle of My Tank page allows to visualise fish inside the tank that was setup by the user. In particular, it should quickly present to the user if the tank is too small against a particularly large fish (try adding the Redtail Catfish to an average size tank) or particularly overcrowded. There's also an option (turned off by default) to animate each fish in this tank. The animation makes the fish icons move around the swimmable area of the tank, and it's purely cosmetic. It may lead to considerable slowdowns if large number of fishes are added.

![visualisation](./imgReadme/animate.png)