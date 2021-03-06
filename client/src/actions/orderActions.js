import axios from "axios";
import {
  ADMIN_ORDER_LIST_FAIL,
  ADMIN_ORDER_LIST_REQUEST,
  ADMIN_ORDER_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../constants/types";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/orders", order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAIL_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVER_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    await axios.put(`/api/orders/${order._id}/deliver`, order, config);

    dispatch({ type: ORDER_DELIVER_SUCCESS });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const resetOrderState = () => (dispatch) => {
  dispatch({
    type: ORDER_PAY_RESET,
  });
  dispatch({ type: ORDER_DELIVER_RESET });
};

export const getOrdersForUser = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/orders/myorders", config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrdersForAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_ORDER_LIST_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/orders", config);

    dispatch({
      type: ADMIN_ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
