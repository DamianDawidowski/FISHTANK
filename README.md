# FISHTANK <img alt="logo" src="./frontend/src/assets/logo.png" width="40"/>

## Instructions
1) Initiate the database:
```
docker run -d -e POSTGRES_HOST_AUTH_METHOD=trust -e POSTGRES_USER=backend -e POSTGRES_PASSWORD=backend -e POSTGRES_DB=backenddb -p 5432:5432 postgres:13
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
ng serve
```

# Features
### Login and Register Pages 
Multiple users can setup their own tanks. However the fish database is shared (may change in the future depending on user feedback)
![register](./imgReadme/register.png)
### Welcome instructions
Instructions aim to lead the user to the particular order of actions to fully use the app functionality. The order is to setup the tank first, add the desired fish, and then check the My tank tab for alerts on both left and write panels.  The alerts are blinking icons, with the blink rate and color changing with severity of parameter disparity, to catch and focus the attention of the user. 
![welcomeScreen](./imgReadme/welcome.png)
### Water parameters optimisation function 
The "Find optimal water parameters" button loads the optimal water parameters(hardness, temperature, pH) based on requirenments of all fishes picked by the user. Note that the found values are averages of all individual fish preferences, and as such will not guarantee that the found value will satisfy every fish, especially those with narrow parameter preference. Manual fine-tuning by the user may be required. Finally, some fishes have too different water parameter preferences, to which a good middle ground value cannot be found. Those fishes should not be kept together.
![optimiseParams](./imgReadme/goodParamsFind.pngg)