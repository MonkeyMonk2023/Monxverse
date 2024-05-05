import React from "react";

const DisplayRestaurants = ({ restaurantsData }) => {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl lg:text-3xl mx-4 sm:mx-8 font-bold my-4">
          Popular Restaurants
        </h2>
        <p>
          Top 10 famous restaurants in {restaurantsData.destination} for{" "}
          {restaurantsData.food_preference} category
        </p>
      </div>
      {restaurantsData.restaurants.map((restaurant, index) => (
        <div
          className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 mx-2 md:max-w-6xl md:mx-auto border border-white mt-4"
          key={index}
        >
          <div className="w-full flex flex-col space-y-2 p-3">
            <div className="flex justify-between item-center">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <p className="text-gray-600 font-bold text-sm ml-1">
                  {restaurant.rating}
                </p>
              </div>
              <div className="">
                <p className="font-black text-gray-800">{restaurant.price}</p>
              </div>
            </div>
            <h3 className="font-black text-gray-800 md:text-2xl text-xl">
              {restaurant.place_name}
            </h3>
            <p className="md:text-lg text-gray-500 text-base">
              {restaurant.bio}
            </p>
            <div className="flex flex-col md:flex-row md:space-x-2">
              <h3>Must try dishes:</h3>
              <div className="space-x-1 space-y-2 md:space-y-0">
                {restaurant.must_try_dishes.map((dish, index) => (
                  <span
                    key={index}
                    className="inline-block bg-primary-200 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide"
                  >
                    {dish}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex">
              <svg
                height="24"
                viewBox="0 0 48 48"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M24 4c-7.73 0-14 6.27-14 14 0 10.5 14 26 14 26s14-15.5 14-26c0-7.73-6.27-14-14-14zm0 19c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
                <path d="M0 0h48v48h-48z" fill="none" />
              </svg>
              <p>{restaurant.landmark}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayRestaurants;
