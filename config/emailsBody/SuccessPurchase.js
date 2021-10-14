const SuccessPurchase = (data) => {
  console.log(data)
  return `<body style="margin: 0;padding: 0;box-sizing: border-box;font-family:Poppins,sans-serif;text-decoration: none;background-color:#8646d4;width:100vw;padding-left:20px;">
    <header style="width: 100vw;">
        <div style="width:200px;height:75px;margin-top:24px;margin-left:24px;background-image:url(https://i.imgur.com/OJD9TIm.png);background-position:center;background-size:cover;background-repeat:no-repeat"></div>
    </header>
    <main style="width:80vw;padding-left:20px;">
      <h3>Hello ${data.user.firstname + ' ' + data.user.lastname}</h3>
      <p style="font-size:1.2rem">We´re glad to let you know that the purchase for:</p> 
      
      
      ${data.purchase.articles.reduce((acc, current) => acc + `<p style="color:rgba(155, 7, 93, 0.664);font-weight:bold">${current.name}</p>`, '')}
      
      <p style="font-size:1.2rem">has been successfully completed.</p>
      <br/>
      <p>Thank you for your purchase.</p>
      <p>You can see the purchase details clicking<span style="font-size:1.2rem;color:#542b86;text-decoration:underline;"><a href="https://lodotechgames.herokuapp.com/mypurchases">here</a></span>.</p>
      <br/>   
      <p>Also, you can go to our home page <span style="font-size:1.2rem;color:#542b86;text-decoration:underline;"><a href="https://lodotechgames.herokuapp.com">here</a></span>.</p>


    </main>
  </body>`
}
  
module.exports = SuccessPurchase

// <div style="width:100vw;height:40vh;background-image:url(https://i.postimg.cc/L2XVbY6Q/hero-Pages.png);background-position:top;background-size:cover;background-repeat:no-repeat;display:flex;justify-content:flex-start;align-items:flex-end; ">      </div>

// ${data.purchase.articles.map(article => `<p>${article.name}</p>` )}      
