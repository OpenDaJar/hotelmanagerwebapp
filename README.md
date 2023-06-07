<a name="readme-top"></a>

<h3 align="center">Hotel Manager webapp</h3>

  <p align="center">
    A small Fullstack project
    <br />
    <a href="https://github.com/OpenDaJar/hotelmanagerwebapp"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/OpenDaJar/hotelmanagerwebapp">View Demo</a>
    ·
    <a href="https://github.com/OpenDaJar/hotelmanagerwebapp/issues">Report Bug</a>
    ·
    <a href="https://github.com/OpenDaJar/hotelmanagerwebapp/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

A small scale project build using Angular and Nodejs to manage rooms and bookings. It also provides user authentication.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

Frontend

* [Angular15][Angular-url]
* [Angular Material][Material-url]
* [Bootstrap][Bootstrap-url]
* [Ngx Bootstrap][Ngx-bootstrap-url]
* [Rxjs][Rxjs-url]
 <br/>
Backend

* [Nodejs][Nodejs-url]
* [MySQL][MySQL-url]
* [MySQL2][Mysql2-url]
* [Sequelize][Sequelize-url]
* [JWT][JWT-url]
* [Bcrypt][Bcryptjs-url]
* [Cookie Session][Cookie-session-url]
* [Express][Expressjs-url]
* [Cors][Cors-url]
* [Multer][Multer-url]
* [Docker][Docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Docker must be installed, Nodejs as well since at the moment only the backend is dockerized

### Installation

1. Clone the repo
2. In backend/server.js uncomment 
   ```sh
   
    db.sequelize
    .sync({ force: true })
    .then(()=>{
       console.log("First run");
       firstRun.firstUser()
     })
   ```
   and comment
   ```js
      .sync()
      .then(() => {
    console.log(" Resync Db!");
    })   
   ```
   this will recreate the database and create a first user after you build with Docker
   * Username: admin
   * Password: 123456
3. Compose and Build with Docker
   ```sh
   docker-compose up --build
   ```
4. Reverse changes for step 2 and run again step 3 and now Backend is running
5. Last step is to start frontend 
   ```sh
   cd frontend
   
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
Now that the app is running we can use this URL http://localhost:8081/ 
### Login
![login]
Use Username: admin and  Password: 123456 to login
### Register User
![register filled]
### Add Room
![add room filled]
### Rooms List
![rooms list]
### Edit Room
![edit room]
### Add Booking
![add booking filled]
### Bookings List
![booking list]




<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt

<!-- Frontend -->
[Angular-url]: https://angular.io/
[Material-url]: https://material.angular.io/
[Bootstrap-url]: https://getbootstrap.com
[Ngx-bootstrap-url]: https://valor-software.com/ngx-bootstrap/#/
[Rxjs-url]: https://rxjs.dev/
<!-- Backend  Packaged -->
[Nodejs-url]: https://nodejs.org/en
[Sequelize-url]: https://sequelize.org/
[JWT-url]: https://jwt.io/
[MySQL-url]: https://www.mysql.com/
[Bcryptjs-url]: https://www.npmjs.com/package/bcryptjs
[Cookie-session-url]: https://www.npmjs.com/package/cookie-session
[Cors-url]: https://www.npmjs.com/package/cors
[Expressjs-url]:https://expressjs.com/
[Multer-url]: https://www.npmjs.com/package/multer
[Mysql2-url]: https://www.npmjs.com/package/mysql2
[Docker-url]: https://www.docker.com/
<!-- Screenshots -->
[login]:https://github.com/OpenDaJar/hotelmanagerwebapp/assets/47851156/c5553a97-d98b-4294-b56b-8413a5b93b26
[register filled]:https://github.com/OpenDaJar/hotelmanagerwebapp/assets/47851156/212bb2c2-e6e0-43eb-a8af-6ab5fee567ba
[add room filled]:https://github.com/OpenDaJar/hotelmanagerwebapp/assets/47851156/566d0b2d-add4-4627-9815-251354ff9dae
[add booking filled]:https://github.com/OpenDaJar/hotelmanagerwebapp/assets/47851156/198f9378-3f28-4bd6-b564-1198b1fc3573
[rooms list]:https://github.com/OpenDaJar/hotelmanagerwebapp/assets/47851156/2f2834b7-cab0-4b85-9772-4aeb54b051ca
[booking list]:https://github.com/OpenDaJar/hotelmanagerwebapp/assets/47851156/6605d75e-582e-47fb-8adb-8f4ada63cba8
[edit room]:https://github.com/OpenDaJar/hotelmanagerwebapp/assets/47851156/2a1f7dd9-68bf-4056-b02f-0a9196d488d7

