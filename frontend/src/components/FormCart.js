const FormCart = ({
   user: { photo, firstname, lastname, email, phone, _id, directions },
   formik,
}) => {
   return (
      <div className="d-flex flex-column">
         <input
            name="receiver"
            value={formik.values.receiver}
            onChange={formik.handleChange("receiver")}
            onBlur={formik.handleBlur("receiver")}
            placeholder="Receiver"
         />
         {formik.touched.receiver && formik.errors.receiver ? (
            <small className="signErrors">{formik.errors.receiver}</small>
         ) : (
            <small className="signNoErrors">NoErrors</small>
         )}
         <input
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange("street")}
            onBlur={formik.handleBlur("street")}
            placeholder="Street"
         />
         {formik.touched.street && formik.errors.street ? (
            <small className="signErrors">{formik.errors.street}</small>
         ) : (
            <small className="signNoErrors">NoErrors</small>
         )}
         <input
            name="number"
            value={formik.values.number}
            onChange={formik.handleChange("number")}
            onBlur={formik.handleBlur("number")}
            placeholder="Number"
         />
         {formik.touched.number && formik.errors.number ? (
            <small className="signErrors">{formik.errors.number}</small>
         ) : (
            <small className="signNoErrors">NoErrors</small>
         )}
         <input
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange("department")}
            onBlur={formik.handleBlur("department")}
            placeholder="Department"
         />
         {formik.touched.department && formik.errors.department ? (
            <small className="signErrors">{formik.errors.department}</small>
         ) : (
            <small className="signNoErrors">NoErrors</small>
         )}
         <input
            name="zipCode"
            value={formik.values.zipCode}
            onChange={formik.handleChange("zipCode")}
            onBlur={formik.handleBlur("zipCode")}
            placeholder="Zip Code"
         />
         {formik.touched.zipCode && formik.errors.zipCode ? (
            <small className="signErrors">{formik.errors.zipCode}</small>
         ) : (
            <small className="signNoErrors">NoErrors</small>
         )}
         <input
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange("city")}
            onBlur={formik.handleBlur("city")}
            placeholder="City"
         />
         {formik.touched.city && formik.errors.city ? (
            <small className="signErrors">{formik.errors.city}</small>
         ) : (
            <small className="signNoErrors">NoErrors</small>
         )}
         <input
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange("state")}
            onBlur={formik.handleBlur("state")}
            placeholder="State"
         />
         {formik.touched.state && formik.errors.state ? (
            <small className="signErrors">{formik.errors.state}</small>
         ) : (
            <small className="signNoErrors">NoErrors</small>
         )}
      </div>
   )
}

export default FormCart