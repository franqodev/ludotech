import Footer from "../components/Footer"
import Header from "../components/Header"
import HeroPages from "../components/HeroPages"
import usersActions from "../redux/actions/usersActions"
import { useDispatch } from "react-redux"

const Checkout = (props) => {
   const dispatch = useDispatch()

   const { purchase } = props.location.state.response
   const { articles, direction, status, timestamp, paymentDetails } = purchase
   console.log(purchase)
   return (
      <div
         className="body"
         style={{
            backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
         }}
      >
         <HeroPages />
         <Header />
         <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="checkoutContainer">
               <h6 className="text-end">
                  Date: {timestamp.slice(0, 10).replace(/-/g, " / ")}
               </h6>
               <h1>Purchase Summary</h1>
               <hr style={{ height: "5px" }}></hr>
               <div>
                  {articles.map((article) => {
                     return (
                        <div
                           key={article._id}
                           className="d-flex justify-content-between"
                        >
                           <div className="leftCheckout">
                              <h4>{article.name}</h4>
                              <p>{article.brand}</p>
                           </div>
                           <div className="rightCheckout d-flex">
                              <h4 className="pe-5">
                                 x{" "}
                                 <span className="textQuantity">
                                    {article.quantity}
                                 </span>
                                 u
                              </h4>
                              {article.hasDiscount === false ? (
                                 <h4>${article.price.toFixed(2)} USD</h4>
                              ) : (
                                 <div className="d-flex">
                                    <h4
                                       style={{
                                          textDecoration: "line-through",
                                          paddingRight: "1.2rem",
                                       }}
                                    >
                                       ${article.price.toFixed(2)}
                                    </h4>
                                    <h4>
                                       <span
                                          style={{
                                             color: "green",
                                          }}
                                       >
                                          ${article.discountPrice.toFixed(2)}
                                       </span>{" "}
                                       USD
                                    </h4>
                                 </div>
                              )}
                           </div>
                        </div>
                     )
                  })}
                  <hr style={{ height: "2px" }}></hr>
                  <div className="d-flex justify-content-between">
                     <h4>Total: </h4>
                     <h4>${purchase.total.toFixed(2)} USD</h4>
                  </div>
                  <hr style={{ height: "5px" }}></hr>
                  <h3>Send to:</h3>
                  <div>
                     <p>
                        <span>Street:</span>{" "}
                        <span style={{ color: "gray", marginRight: "10px" }}>
                           {direction.street}
                        </span>{" "}
                        NÂ°{" "}
                        <span style={{ color: "gray", marginRight: "10px" }}>
                           {direction.number}
                        </span>{" "}
                        Department:{" "}
                        <span style={{ color: "gray", marginRight: "10px" }}>
                           {direction.department}
                        </span>
                     </p>
                     <p>
                        City:{" "}
                        <span style={{ color: "gray", marginRight: "10px" }}>
                           {direction.city}
                        </span>{" "}
                        State:{" "}
                        <span style={{ color: "gray", marginRight: "10px" }}>
                           {direction.state}
                        </span>{" "}
                        Zip Code:{" "}
                        <span style={{ color: "gray", marginRight: "10px" }}>
                           {direction.zipCode}
                        </span>
                     </p>
                     <p>
                        Receiver:{" "}
                        <span style={{ color: "gray", marginRight: "10px" }}>
                           {direction.receiver}
                        </span>
                     </p>
                  </div>
                  <hr style={{ height: "5px" }}></hr>
                  <div className="d-flex justify-content-between">
                     <h4>Status: </h4>
                     <h4 style={{ color: "orange" }}>{status}</h4>
                  </div>
                  <hr style={{ height: "5px" }}></hr>
                  <p>
                     Selected payment method:{" "}
                     <span style={{ color: "darkgreen" }}>
                        {paymentDetails.method}
                     </span>
                  </p>
                  <div className="d-flex justify-content-center flex-column align-items-center">
                     <img
                        src="https://i.postimg.cc/xC3sq7tJ/pngkey-com-bar-code-png-131088.png"
                        alt="codeBar"
                        style={{ width: "12vw" }}
                     />
                     <p>{paymentDetails.orderId}</p>
                  </div>
                  <button
               type="button"
               className="text-center bold"
               onClick={() => {
                  dispatch(usersActions.getReceipt(purchase._id))
               }}
               >
               Download PDF
            </button>
               </div>
            </div>
            <button
               type="button"
               className="addProduct mt-5"
               onClick={() => props.history.push("Home")}
               style={{
                  backgroundImage: `url("https://i.postimg.cc/mD7r09R8/button-Back.png")`,
               }}
            >
               BACK TO HOME
            </button>
         </div>
         <Footer />
      </div>
   )
}

export default Checkout