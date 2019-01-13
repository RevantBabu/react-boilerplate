<div align="center"><strong>Cloud computing project for COMS-M0010</strong></div>
<div align="center">A scalable cloud application</div>

Boilerplate forked from: <a href="https://github.com/react-boilerplate/react-boilerplate" target="_blank">react-boilerplate/react-boilerplate</a>
## Changes made

<dl>
  <dt>Server.js</dt>
  <dd>added following apis to server/index.js</dd>
  <dd>APIs for homepage: </dd>
    <dd>------------------------ </dd>
  <dd> GET /api/users/:username  - to search users by partial text</dd>
  <dd> POST /api/addusers/:username - to create new user</dd> <br>
   <dd>APIs for UserPage: </dd>
   <dd>------------------------ </dd>
   <dd> GET /api/stats/:username  - to get stats and trends for user</dd>
   <dd> POST /api/addsentiment/:username/:sentiment - to add sentiment to user</dd>
  
  <dt>App/Containers/HomePage</dt>
  <dd> Home Page Container was modified to allow search and create user functionality  </dd>
  
  <dt>App/Containers/UserPage</dt>
  <dd> UserPage Container was created to display user stats and send sentiments to profile</dd>

<sub><i>Keywords: React.js, Redux, Node,  Cloud computing, COMS-M0010</i></sub>

## Quick start

1.  Make sure that you have Node.js v8.10 and npm v5 or above installed.
2.  Run `npm run setup` in order to install dependencies and clean the git repo.
    _At this point you can run `npm start` to see the example app at `http://localhost:3000`._
3.  Run `npm run clean` to delete the example app.
