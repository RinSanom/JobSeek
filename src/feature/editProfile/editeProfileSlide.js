import { apiSlide } from "../api/apiSlide";

export const editeProfileSlide = apiSlide.injectEndpoints({
  endpoints: (build) => ({
    editeProfileBusinessOwner: build.mutation({
      query: (data) => {
        const token = localStorage.getItem("accessToken");
        console.log("Token", token);

        if (!token) {
          console.error("No token found. Redirecting to login...");
          return Promise.reject(
            new Error("No token found. Please log in again.")
          );
        }

        return {
          url: "/api/users/update-business-profile",
          method: "PUT",
          body: data,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Profile updated successfully:", data);
        } catch (error) {
          console.error("Error updating profile:", error);
          alert("Profile update failed. Please try again.");
        }
      },
    }),
    editeProfileFreelancer: build.mutation({
      query: (data) => {
        const token = localStorage.getItem("accessToken");
        console.log("Token", token);

        if (!token) {
          console.error("No token found. Redirecting to login...");
          return Promise.reject(
            new Error("No token found. Please log in again.")
          );
        }

        return {
          url: "/api/users/update-freelancer-profile",
          method: "PUT",
          body: data,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("Profile updated successfully:", data);
        } catch (error) {
          console.error("Error updating profile:", error);
          alert("Profile update failed. Please try again.");
        }
      },
    }),
  }),
});

export const {
  useEditeProfileBusinessOwnerMutation,
  useEditeProfileFreelancerMutation,
} = editeProfileSlide;
