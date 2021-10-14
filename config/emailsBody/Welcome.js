const WelcomeMail = (data) => {
  return `<body style="margin: 0;padding: 0;box-sizing: border-box;font-family:Poppins,sans-serif;text-decoration: none;background-color:#8646d4">
    <header style="width: 100vw;">
      <div style="width:100vw;height:40vh;background-image:url(https://i.postimg.cc/L2XVbY6Q/hero-Pages.png);background-position:top;background-size:cover;background-repeat:no-repeat;display:flex;justify-content:center;align-items:flex-end; ">
        <h2 style="background-color:transparent;">LUDOTECH</h2>

        <div style="width:20vw;height:10vh;background-image:url('./assets/ludotech');background-position:center;background-size:cover;background-repeat:no-repeat:
        <div style="width:10vw;height:10vh;background-image:url('./assets/rubik.png');background-position:center;background-size:cover;background-repeat:no-repeat:
      </div>
    </header>
    <main style="width:80vw;margin:0 auto;">
      <h3>Hello ${data.user.firstname + ' ' + data.user.lastname}</h3>
      <p style="font-size:1.2rem">Welcome to <span style="font-size:1.5rem">Ludotech</span> where you will find all the game you desire.</p>
      <p>We´re glad to have you in our comunu¡ity to find and share opinions about the games.</p>
      <br/>
      <p>Now you can go and search for the best games we offers for you <a href="https://lodotechgames.herokuapp.com/">here</a>
    </main>
    <footer style="">
      <span style="font-size:0.8">Ludotech</span>
    </footer>
  </body>`
}

module.exports = WelcomeMail