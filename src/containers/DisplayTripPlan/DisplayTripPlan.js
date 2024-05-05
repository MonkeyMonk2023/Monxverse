import React, { useState, useEffect } from 'react';
import TripPlanCard from '../../components/tripPlanCard/TripCard';

const DisplayTripPlan = ({tripData}) => {
  return(
    <>
      <div className="sm:w-5/6 mx-auto my-4 py-4 rounded-2xl">
      <div className="text-center mb-4">
            <h2 className="text-2xl lg:text-3xl mx-4 sm:mx-8 font-bold my-4">
              Your customized trip plan
            </h2>
            <p>{tripData.trip_plan.duration} {tripData.trip_plan.trip_style} trip to {tripData.trip_plan.destination}</p>
          </div>
      {
        tripData.trip_plan.itinerary.map(day => (
        <div key={day.day}>
          <h3 className='font-bold text-2xl w-[90%] mx-auto'>Day: {day.day}</h3>
          {day.activities.map(activity => (
            <div key={activity[1]} className='my-10 sm:my-5'>
              <TripPlanCard
                place={activity[1]}
                place_time={activity[0]}
                place_bio={activity[4]}
                place_price={activity[3]}
                place_rating={activity[2]}
                place_icon={activity[5]}
              />
            </div>
          ))}
        </div>
      ))
      }
      </div>
    </>
  )
};

export default DisplayTripPlan;
