import { baseApi } from "@/src/redux/baseApi/baseApi";

interface OrderParams {
  page?: number;
  limit?: number;
  status?: "pending" | "in_progress" | "completed" | "cancelled";
}

interface CreateOrderBody {
  boostingPostId: string;
  offerId: string;
  [key: string]: unknown;
}

interface UpdateOrderStatusBody {
  status: string;
  [key: string]: unknown;
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new order as buyer
    createOrderBuyer: builder.mutation<ApiResponse<unknown>, CreateOrderBody>({
      query: (orderBody) => ({
        url: "/orders",
        method: "POST",
        body: orderBody,
      }),
    }),

    // Update order status
    updateOrderStatus: builder.mutation<
      ApiResponse<unknown>,
      { id: string; orderBody: UpdateOrderStatusBody }
    >({
      query: ({ id, orderBody }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: orderBody,
      }),
    }),

    // Get my orders as buyer
    getMyOrdersAsBuyer: builder.query({
      query: (params: OrderParams | void) => ({
        url: "/orders/my-orders/buyer",
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
    }),
    // Get my orders as Seller
    getMyOrdersAsSeller: builder.query({
      query: (params: OrderParams | void) => ({
        url: "/orders/my-orders/buyer",
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
    }),

    // Get single order by ID
    getOrderById: builder.query({
      query: (id: string) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
    }),
    // payments verifications by session id
    getVerifyPayments: builder.query({
      query: (sessionId: string) => ({
        url: `/orders/payment/verify/${sessionId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderBuyerMutation,
  useUpdateOrderStatusMutation,
  useGetMyOrdersAsBuyerQuery,
  useGetOrderByIdQuery,
  useLazyGetMyOrdersAsBuyerQuery,
  useLazyGetOrderByIdQuery,

  // verify payments
  useGetVerifyPaymentsQuery,
} = ordersApi;
