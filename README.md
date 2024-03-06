This app is based on MERN stack and follow a scalable folder structure. 

The app supports login via Gmail or signing up through any email address.
You can see all the posts or create your own post after logging in. You can also edit or delete your own post.


If you want to create the whole app by yourself then follow the tutorial by 'Javascript Mastery' on youtube.


Part1: https://www.youtube.com/watch?v=ngc9gnGgUdA


Part2: https://www.youtube.com/watch?v=aibtHnbeuio

Part3: https://www.youtube.com/watch?v=LKlO8vLvUao The google login mentioned in video was not working for me due to some restrictions from google API and hence, It is implemented in this project some other way.

Please note that since video is 3 years old, many elements or usage of controls have changed. This code implements all of the features with latest version of react.

To run the app, follow the below steps:
* Clone the repository
* Run npm i under both client and server folder
* .env file
  * Replace .env.example with filename .env in server folder
  * Replace 'PORT' with port where you would like to 
  * Replace 'CONNECTION_URL' with your mongodb connection. To find the sam follow below steps:
    * Create an account at https://mongodb.com/cloud/atlas and create a free cluster
    * You would get a URL like mongodb+srv://<username>:<password>@cluster0.jgauidh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    * Copy the same and paste it in .env file
* Run npm start in server folder
* Run npm start in client folder
* You should be able to see UI as below and play around

<img width="1752" alt="Screenshot 2024-02-25 at 2 25 30 PM" src="https://github.com/IshiKaur/memories_project/assets/14085873/4077bea2-579b-40b3-99ae-62957dde510e">


  
