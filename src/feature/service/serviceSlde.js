import { apiSlide } from "../api/apiSlide";

export const serviceSlide = apiSlide.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({
        url: "/api/users?userType=business_owner&page=0&size=1000&sortBy=email",
        method: "GET",
      }),
    }),
    getFreelancerService: build.query({
      query: () => ({
        url: "/api/users?userType=freelancer&page=0&size=30&sortBy=email",
        method: "GET",
      }),
    }),
    getUserById: build.query({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "GET",
      }),
    }),
    getAllServices: build.query({
      query: () => ({
        url: `/api/jobs-service/services?page=0&size=1000&sortBy=createdAt`,
        method: "GET",
      }),
    }),
    getGetServicesById: build.query({
      query: (id) => ({
        url: `/api/jobs-service/services?serviceId=${id}`,
        method: "GET",
      }),
    }),
    getAllCategories: build.query({
      query: () => ({
        url: "/api/jobs-service/categories",
        method: "GET",
      }),
    }),
    createService: build.mutation({
      query: (data) => {
        const token = localStorage.getItem("accessToken"); // Retrieve token
        return {
          url: "/api/jobs-service/services/create-new",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach token
          },
        };
      },
    }),
    getMyOwnService: build.query({
      query: () => ({
        url: "/api/jobs-service/services/own-service",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),
    deleteService: build.mutation({
      query: (id) => {
        const token = localStorage.getItem("accessToken"); // Retrieve token
        return {
          url: `/api/jobs-service/services/${id}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        };
      },
    }),
    getServicePoster: build.query({
      query: (userId) => ({
        url: `/api/jobs-service/services?userId=${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useGetAllCategoriesQuery,
  useGetMyOwnServiceQuery,
  useDeleteServiceMutation,
  useGetGetServicesByIdQuery,
  useGetFreelancerServiceQuery,
  useGetServicePosterQuery,
} = serviceSlide;
