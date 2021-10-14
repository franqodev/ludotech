const FormCart = ({ formik }) => {
   return (
      <div style={{ width: "35%" }}>
         <input
            name="receiver"
            value={formik.values.receiver}
            onChange={formik.handleChange("receiver")}
            onBlur={formik.handleBlur("receiver")}
            placeholder="Receiver"
         />
         {formik.touched.receiver && formik.errors.receiver ? (
            <small className="signErrorsDir">{formik.errors.receiver}</small>
         ) : (
            <small className="signNoErrorsDir">NoErrors</small>
         )}
         <input
            name="street"
            value={formik.values.street}
            onChange={formik.handleChange("street")}
            onBlur={formik.handleBlur("street")}
            placeholder="Street"
         />
         {formik.touched.street && formik.errors.street ? (
            <small className="signErrorsDir">{formik.errors.street}</small>
         ) : (
            <small className="signNoErrorsDir">NoErrors</small>
         )}
         <input
            name="number"
            value={formik.values.number}
            onChange={formik.handleChange("number")}
            onBlur={formik.handleBlur("number")}
            placeholder="Number"
         />
         {formik.touched.number && formik.errors.number ? (
            <small className="signErrorsDir">{formik.errors.number}</small>
         ) : (
            <small className="signNoErrorsDir">NoErrors</small>
         )}
         <input
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange("department")}
            onBlur={formik.handleBlur("department")}
            placeholder="Department"
         />
         {formik.touched.department && formik.errors.department ? (
            <small className="signErrorsDir">{formik.errors.department}</small>
         ) : (
            <small className="signNoErrorsDir">NoErrors</small>
         )}
         <input
            name="zipCode"
            value={formik.values.zipCode}
            onChange={formik.handleChange("zipCode")}
            onBlur={formik.handleBlur("zipCode")}
            placeholder="Zip Code"
         />
         {formik.touched.zipCode && formik.errors.zipCode ? (
            <small className="signErrorsDir">{formik.errors.zipCode}</small>
         ) : (
            <small className="signNoErrorsDir">NoErrors</small>
         )}
         <input
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange("city")}
            onBlur={formik.handleBlur("city")}
            placeholder="City"
         />
         {formik.touched.city && formik.errors.city ? (
            <small className="signErrorsDir">{formik.errors.city}</small>
         ) : (
            <small className="signNoErrorsDir">NoErrors</small>
         )}
         <input
            name="state"
            value={formik.values.state}
            onChange={formik.handleChange("state")}
            onBlur={formik.handleBlur("state")}
            placeholder="State"
         />
         {formik.touched.state && formik.errors.state ? (
            <small className="signErrorsDir">{formik.errors.state}</small>
         ) : (
            <small className="signNoErrorsDir">NoErrors</small>
         )}
      </div>
   )
}

export default FormCart
