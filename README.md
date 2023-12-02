# Cross-Platform-Application-Launcher

# Part - 1

Steps:

1) Creted a simple server app
2) installed required dependencies like express, cors, dotend, mongoose, child_process and nodemon as devDependency.
3) first created a app route to create new apps using post method.
4) created a db_model for saving the application


# http://localhost:2354/api/apps POST method
{ 
  "name": "Netflix",
  "path": "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "parameter": "netflix.com",
  "iconUrl": "https://www.gstatic.com/webp/youtube/img/favicon_144.png"
}

5) then created get apps route to get all the created apps.
# http://localhost:2354/api/apps GET method
{
  "name": "Netflix",
  "path": "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "parameter": "netflix.com",
  "iconUrl": "https://www.gstatic.com/webp/youtube/img/favicon_144.png"
}


6) then created launch route to launch app.
# http://localhost:2354/api/apps POST method

{
  "path": "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "parameter": "netflix.com",
}


