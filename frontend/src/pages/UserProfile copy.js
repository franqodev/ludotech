import { useState } from "react"
import { useSelector } from "react-redux"
import DirectionsForm from "../components/DirectionsForm"
import Footer from "../components/Footer"
import Header from "../components/Header"
import HeroPages from "../components/HeroPages"
import usersActions from "../redux/actions/usersActions"
import { useDispatch } from "react-redux"
import Address from "../components/Address"
import { useFormik } from "formik"
import * as Yup from "yup"

const UserProfile = () => {
   const user = useSelector((state) => state.users.user)
   const { directions, email, firstname, lastname, photo, phone } = user
   const [visibleDirectionForm, setVisibleDirectionForm] = useState(false)
   const [visiblePhone, setVisiblePhone] = useState(false)
   const dispatch = useDispatch()
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

   const addDirectionHandler = async (values) => {
      setLoading(true)
      const res = await dispatch(usersActions.addDirection(values))
      console.log(res)
      if (!res.success) setError(res.error)
      setLoading(false)
      setVisibleDirectionForm(false)
   }

   const addPhone = async (values) => {
      setLoading(true)
      const res = await dispatch(usersActions.updateAccount(values))
      console.log(res)
      if (!res.success) setError(res.error)
      setLoading(false)
   }

   let formik = useFormik({
      initialValues: { phone: "" },
      onSubmit: (values) => {
         addPhone(values)
      },
      validationSchema: Yup.object({
         phone: Yup.number("Only numbers").required("Required"),
      }),
   })

   const initialValues = {
      alias: "",
      receiver: "",
      street: "",
      number: "",
      department: "",
      zipCode: "",
      city: "",
      state: "",
   }

   console.log(user)

   return (
      <div
            className="signInBody"
            style={{
               backgroundImage: `url("https://i.postimg.cc/3wVXYt59/back-Ludo3.png")`,
            }}
         >
            <HeroPages />
            <Header />

            <div className="containerProfile">
               <div className="flex">
                  <div
                     className="logoUserProfile"
                     style={{
                        backgroundImage: `url('${photo}')`,
                     }}
                  ></div>
               </div>
               <div>
                  <div>
                     <h2>
                        {firstname} {lastname}
                     </h2>
                     <p>{email}</p>
                     <div className="d-flex">
                        <p>{phone ? phone : "No phone number added"}</p>
                        <input
                           placeholder="+234 455 5353"
                           name="phone"
                           type="number"
                           value={formik.values.phone}
                           onChange={formik.handleChange("phone")}
                           onBlur={formik.handleBlur("phone")}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                           <small className="signErrors">
                              {formik.errors.phone}
                           </small>
                        ) : (
                           <small className="signNoErrors">NoErrors</small>
                        )}{" "}
                        <button type="button" onClick={formik.handleSubmit}>
                           Add phone number
                        </button>
                     </div>
                  </div>
                  <div>
                     <h3>Addresses</h3>
                     <div>
                        {!directions || directions.length === 0 ? (
                           <p>There are no addresses added</p>
                        ) : (
                           directions.map((direction) => {
                              return (
                                 <Address
                                    direction={direction}
                                    key={direction._id}
                                 />
                              )
                           })
                        )}
                     </div>
                     <div className="d-flex">
                        <button
                           type="button"
                           onClick={() =>
                              setVisibleDirectionForm(!visibleDirectionForm)
                           }
                        >
                           Add Address
                        </button>
                     </div>
                     {visibleDirectionForm && (
                        <DirectionsForm
                           submitCallback={addDirectionHandler}
                           initialValues={initialValues}
                           buttonText="ADD"
                        />
                     )}
                  </div>
               </div>
            </div>
            <Footer />
         
         
      </div>
   )
}

export default UserProfile