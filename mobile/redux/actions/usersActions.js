import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const HOST = "https://lodotechgames.herokuapp.com"

const usersActions = {
  logInOrSignUp: (data, action) => {
    return async (dispatch) => {
      try {
        // action puede ser 'login' o 'signup'
        console.log(data)
        const response = await axios.post(`${HOST}/api/${action}`, data)
        console.log(response.data)
        if (!response.data.success) throw new Error(response.data.error)
        await AsyncStorage.setItem(
          "token",
          response.data.response.token,
          (e) => e && console.log(e)
        )
        dispatch({
          type: "LOGIN_OR_SIGNUP",
          payload: response.data.response,
        })
        return { success: true, error: null }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  logOut: () => {
    return async (dispatch) => {
      await AsyncStorage.removeItem("token", (e) => e && console.log(e))
      dispatch({ type: "LOG_OUT" })
    }
  },
  logInLS: (token) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${HOST}/api/user/verifyToken`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.data.success) throw new Error(response.data.error)
        dispatch({
          type: "LOGIN_OR_SIGNUP",
          payload: { ...response.data.response, token },
        })
        return { success: true, error: null }
      } catch (e) {
        await AsyncStorage.removeItem("token", (e) => e && console.log(e))
        return { success: false, error: e.message }
      }
    }
  },
  updateAccount: (data) => {
    return async (dispatch, getState) => {
      try {
        const response = await axios.put(
          `${HOST}/api/user/${getState().users.user._id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${getState().users.user.token}`,
            },
          }
        )
        if (!response.data.success) throw new Error(response.data.error)
        dispatch({
          type: "LOGIN_OR_SIGNUP",
          payload: response.data.response,
        })
        return { success: true, error: null }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  toggleWishList: (articleId) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.put(
          `${HOST}/api/user/wish-list/${articleId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${getState().users.user.token}`,
            },
          }
        )
        if (!res.data.success) throw new Error(res.data.error)
        dispatch({ type: "WISH_LIST", payload: res.data.response })
        return { success: true, error: null }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  purchaseHandler: (data) => {
    // data es un objeto así:
    // data = {
    //// direction: {
    ////// "receiver": "",
    ////// "street": "",
    ////// "number": "",
    ////// "department": "",
    ////// "zipCode": "",
    ////// "city": "",
    ////// "state": ""
    //// },
    //// paymentDetails: {
    ////// method: 'PAYPAL',
    ////// orderId: '',
    //// }
    // } (de momento sólo está Paypal (?)) si el objeto no va tal cual, lo para Joi.
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(`${HOST}/api/user/purchase`, data, {
          headers: {
            Authorization: `Bearer ${getState().users.user.token}`,
          },
        })
        if (!res.data.success) throw new Error(res.data.error)
        const body = {
          user: getState().users.user,
          purchase: res.data.response.purchase,
        }
        // await axios.post(`${HOST}/api/success-purchase`, body, { headers: { Authorization: `Bearer ${getState().users.user.token}`}})
        dispatch({ type: "PURCHASE", payload: res.data.response })
        return { success: true, response: res.data.response, error: null }
      } catch (e) {
        return { success: false, response: null, error: e.message }
      }
    }
  },
  addDirection: (data) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.post(`${HOST}/api/user/directions`, data, {
          headers: {
            Authorization: `Bearer ${getState().users.user.token}`,
          },
        })
        if (!res.data.success) throw new Error(res.data.error)
        dispatch({ type: "UPDATE_DIRECTIONS", payload: res.data.response })
        return { success: true, error: null }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  updateDirection: (data, directionId) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.put(
          `${HOST}/api/user/direction/${directionId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${getState().users.user.token}`,
            },
          }
        )
        if (!res.data.success) throw new Error(res.data.error)
        dispatch({ type: "UPDATE_DIRECTIONS", payload: res.data.response })
        return { success: true, error: null }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  deleteDirection: (directionId) => {
    return async (dispatch, getState) => {
      try {
        const res = await axios.delete(
          `${HOST}/api/user/direction/${directionId}`,
          {
            headers: {
              Authorization: `Bearer ${getState().users.user.token}`,
            },
          }
        )
        if (!res.data.success) throw new Error(res.data.error)
        dispatch({ type: "UPDATE_DIRECTIONS", payload: res.data.response })
        return { success: true, error: null }
      } catch (e) {
        return { success: false, error: e.message }
      }
    }
  },
  getReceipt: (purchaseId) => {
    return async (dispatch) => {
       try {
          const res = await axios({
             url: `${HOST}/api/receipt/${purchaseId}`,
             method: "GET",
             responseType: "blob",
          })
          if (!res.data) {
             throw new Error(res.data.error)
          }

          fileDownload(res.data, `${purchaseId}.pdf`)
          return { success: true, response: "Todo bien", error: null }
       } catch (e) {
          return { success: false, response: null, error: e.message }
       }
    }
 },
}

export default usersActions
