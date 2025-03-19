import { apiSlide } from "../api/apiSlide";

export const registerFreelancer = apiSlide.injectEndpoints({
  endpoints: (build) => ({
    registerFreelancer: build.mutation({
      query: (body) => ({
        url: "/api/users/register-freelancer",
        method: "POST",
        body,
      }),
    }),
    registerBusinessOwner: build.mutation({
      query: (data) => ({
        url: "https://jobbridge-api.devnerd.store/api/users/register-business-owner", // Your API endpoint
        method: "POST",
        body: data,
      }),
    }),

    login: build.mutation({
      query: (body) => ({
        url: "/api/users/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    }),

    getMe: build.query({
      query: () => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("No token found in localStorage");
        }
        return {
          url: "/api/users/me",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["User"], // Tag this query for cache invalidation
    }),
    
  }),
});

export const {
  useRegisterFreelancerMutation,
  useRegisterBusinessOwnerMutation,
  useLoginMutation,
  useGetMeQuery,
} = registerFreelancer;
