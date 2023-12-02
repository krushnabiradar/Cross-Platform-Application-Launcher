# Cross-Platform-Application-Launcher

# Part - 1 ==> time spent ( 1-hour)

Steps:

1) Created a simple server app
2) installed required dependencies like express, cors, dotend, mongoose, child_process, and nodemon as devDependency.
3) first create an app route to create new apps using the post method.
4) created a db_model for saving the application


# http://localhost:2354/api/apps POST method
{ 
  "name": "Netflix",
  "path": "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "parameter": "netflix.com",
  "iconUrl": "https://www.gstatic.com/webp/youtube/img/favicon_144.png"
}

5) then create a get apps route to get all the created apps.
# http://localhost:2354/api/apps GET method

6) then created a launch route to launch an app.
# http://localhost:2354/api/apps POST method

{
  "path": "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "parameter": "netflix.com",
}


# Part II ==> Time spent ( 45 minutes )

Steps:

1) Created a react app using vite ---npm create vite@latest client
2) Installed required dependencies like Axios and react-router-dom.
3) Axios is used for making HTTP requests to the server.
4) useEffect is used to fetch the list of apps when the component mounts. The fetchData function is an asynchronous function that makes a GET request to 'http://localhost:2354/api/apps' using Axios and sets the retrieved data to the app's state.
5) useState is used to manage the component's state
6) Added event handling and error handling.


