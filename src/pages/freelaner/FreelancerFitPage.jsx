import React from "react";
import CardFitPage from "../../components/cards/CardFitPage";
import SearchForm from "../../components/searchForms/SearchForm";
import { useGetAllUsersQuery } from "../../feature/service/serviceSlde";

export default function FreelancerFitPage() {
  const { data, isLoading, error } = useGetAllUsersQuery();
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <div className="container mx-auto flex flex-grow gap-6 px-4 mt-4">
        {/* <div className="w-[278px] flex flex-col gap-4">
          <UserProfileCard />
          <LeftSidebar />
          <LeftTags />
        </div> */}
        <div className=" m-auto">
          <SearchForm />
          {/* <SearchFitPage /> */}
          <CardFitPage />
        </div>
        {/* <div className="w-[300px] hidden lg:block">
          <MostPopularUser />
        </div> */}
      </div>
    </div>
  );
}
