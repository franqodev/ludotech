import React, { useState } from "react"
import { StyleSheet, Text, View, ScrollView } from "react-native"
import { CardField, createPaymentMethod } from "@stripe/stripe-react-native"
import DirectionsForm from "../components/DirectionsForm"
import axios from "axios"
import { usePurchase } from "../hooks/usersHooks"
import { useDispatch, useSelector } from "react-redux"
import { ActivityIndicator, Button, Colors } from "react-native-paper"
import usersActions from "../redux/actions/usersActions"

const HOST = "https://lodotechgames.herokuapp.com"

const Stripe = () => {
  const [cardDetails, setCardDetails] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [purchase, loadingPurchase, errorPurchase] = usePurchase()
  const dispatch = useDispatch()
  const initialValues = {
    street: "Calle",
    number: "123",
    city: "Ciudad",
    zipCode: "4030",
    receiver: "Yo",
    department: "Departamento",
    state: "Estado",
  }
  const user = useSelector((state) => state.users.user)

  const purchaseHandler = async (values) => {
    setLoading(true)
    setError(null)
    try {
      if (!cardDetails?.complete)
        throw new Error("You must complete all card details.")
      const { paymentError, paymentMethod } = await createPaymentMethod({
        type: "card",
        card: cardDetails,
        billingDetails: {
          addressCity: values.city,
          addressCountry: "AR",
          addressLine1: `${values.street.trim()} ${values.number}`,
          addressLine2: values.city,
          addressPostalCode: values.zipCode,
          addressState: values.state,
          email: user.email,
          name: `${user.firstname} ${user.lastname}`,
          phone: user.phone,
        },
      })
      if (paymentError || !paymentMethod)
        throw new Error(paymentError || "Error proccessing your purchase.")

      const authorization = await axios.post(
        `${HOST}/api/stripe/payment-intent`,
        { id: paymentMethod.id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      if (!authorization.data.success) throw new Error(authorization.data.error)
      const details = {
        direction: values,
        paymentDetails: {
          method: "STRIPE",
          orderId: paymentMethod.id,
          receipt: authorization.data.response.charges.data[0].receipt_url,
        },
      }
      const res = await purchase(details)
      console.log(res)
      setLoading(false) // en realidad, este setLoading no es necesario.
      // aquí termina la compra... hacer checkout
    } catch (e) {
      console.log(e.message)
      setError(e.message)
      setLoading(false)
    }
  }
  if (loading)
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator
          animating={true}
          color={Colors.purple800}
          size="large"
        />
      </View>
    )
  return (
    <View>
      <ScrollView>
        <DirectionsForm
          initialValues={initialValues}
          submitCallback={(values) => {
            purchaseHandler(values)
          }}
          alias={false}
          buttonText="Pay"
        >
          <CardField
            postalCodeEnabled={false}
            placeholder={{
              number: "4242",
            }}
            cardStyle={{
              backgroundColor: "white",
            }}
            style={{
              width: "100%",
              height: 50,
            }}
            onCardChange={(cardDetails) => {
              setCardDetails(cardDetails)
            }}
          />
        </DirectionsForm>
        {/* {error && (
          <View>
            <Text style={{ color: "red" }}>{error}</Text>
          </View>
        )} */}
      </ScrollView>
    </View>
  )
}

export default Stripe

const styles = StyleSheet.create({
  // card: {
  //   // backgroundColor: "#FFFFFF",
  //   width: "100%",
  // },
  // cardField: {
  //   width: "100%",
  //   height: 50,
  //   color: "#000000",
  //   backgroundColor: "#FFFFFF",
  //   width: "100%",
  // },
})
