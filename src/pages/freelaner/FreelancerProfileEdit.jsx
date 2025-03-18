import { useState } from "react"
import ScrollIndicator from "../components/scrollIndicator/scrollIndicator"
// import { CheckIcon, ChevronDownIcon } from "./icons"; // Optional - see note below
import { useEditeProfileFreelancerMutatio } from "../../feature/editProfile/editeProfileSlide"
export default function FreelancerEditProfile() {
  const  { dat } = useEditeProfileFreelancerMutatio();
   const [formData, setFormData] = useState({
    firstName: "Mehrab",
    lastName: "Bozorgi",
    email: "Mehrabozorgi.business@gmail.com",
    address: "33062 Zboncak isle",
    contactNumber: "58077.79",
    city: "Mehrab",
    state: "Bozorgi",
  })

  // State for dropdowns
  const [cityOpen, setCityOpen] = useState(false)
  const [stateOpen, setStateOpen] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (name === "city") setCityOpen(false)
    if (name === "state") setStateOpen(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

  }

  return (
  <>
  <ScrollIndicator/>
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-3xl bg-gray-200 shadow-md rounded-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-row items-center justify-between pb-4">
            <h2 className="text-xl font-bold text-primary">Edit profile</h2>
            <div className="h-12 w-12 rounded-full overflow-hidden">
              <img
                src="src/assets/imgAboutUs/sanom.jpg"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-sm font-medium text-primary">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-sm font-medium text-primary">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white pr-10"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-green-500 rounded-full p-0.5">
                  {/* CheckIcon component or inline SVG */}
                  <svg
                    className="h-3 w-3 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <label htmlFor="address" className="block text-sm font-medium">
                Address
              </label>
              <input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div className="space-y-2 mb-4">
              <label htmlFor="contactNumber" className="block text-sm font-medium">
                Contact Number
              </label>
              <input
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label htmlFor="city" className="block text-sm font-medium">
                  City
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCityOpen(!cityOpen)}
                    className="w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white flex justify-between items-center"
                  >
                    <span>{formData.city}</span>
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  {cityOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      <ul className="py-1">
                        {["Mehrab", "New York", "Los Angeles", "Chicago"].map((city) => (
                          <li key={city}>
                            <button
                              type="button"
                              className="w-full px-3 py-2 text-left hover:bg-gray-100"
                              onClick={() => handleSelectChange("city", city)}
                            >
                              {city}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="state" className="block text-sm font-medium">
                  State
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setStateOpen(!stateOpen)}
                    className="w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white flex justify-between items-center"
                  >
                    <span>{formData.state}</span>
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>

                  {stateOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      <ul className="py-1">
                        {["Bozorgi", "California", "New York", "Texas"].map((state) => (
                          <li key={state}>
                            <button
                              type="button"
                              className="w-full px-3 py-2 text-left hover:bg-gray-100"
                              onClick={() => handleSelectChange("state", state)}
                            >
                              {state}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-start space-x-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </>
  )
}


