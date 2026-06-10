import React from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaUsers } from "react-icons/fa";

import collage from "../../assets/collage.jpeg";

function LocationDetails() {
  const { id } = useParams();

  
    const locations = [
        {
          id: 1,
          college: "JBIET",
          city: "Hyderabad",
          area: "Main Canteen Area",
          students: "5,000+",
          status: "Reserved",
          image: collage,
          description: "Prime location in the heart of JBIET campus with high student footfall throughout the day."
        },
        {
          id: 2,
          college: "JBREC",
          city: "Hyderabad",
          area: "Central Canteen Hub",
          students: "4,000+",
          status: "Reserved",
          image: collage,
          description: "Strategically located at the central canteen hub, serving students from all engineering branches."
        },
        {
          id: 3,
          college: "KG Reddy College",
          city: "Hyderabad",
          area: "College Cafeteria",
          students: "5,500+",
          status: "Reserved",
          image: collage,
          description: "High-traffic zone in the main cafeteria area, ideal for automated printing services."
        },
        {
          id: 4,
          college: "VBIET",
          city: "Hyderabad",
          area: "Main Canteen Area",
          students: "5,000+",
          status: "Available",
          image: collage,
          description: "Available spot in the main canteen area with excellent visibility and access."
        },
        {
          id: 5,
          college: "CMR",
          city: "Hyderabad",
          area: "Canteen",
          students: "12,000+",
          status: "Available",
          image: collage,
          description: "Massive student base at CMR campus. This canteen location is a goldmine for high-volume printing."
        },
        {
          id: 6,
          college: "GLOBAL COLLEGE",
          city: "Hyderabad",
          area: "Tech Park Food Court",
          students: "4,000+",
          status: "Available",
          image: collage,
          description: "Located in the Tech Park Food Court, serving both students and faculty members."
        },
        {
          id: 7,
          college: "MGIET",
          city: "Hyderabad",
          area: "Main Canteen Area",
          students: "5,000+",
          status: "Available",
          image: collage,
          description: "Centralized location in the main canteen area of MGIET campus."
        },
      ];

  const location = locations.find(
    (item) => item.id === Number(id)
  );

  if (!location) {
    return (
      <div className="container py-5">
        <h2>Location Not Found</h2>
      </div>
    );
  }

  const handleReservation = () => {

  const priorityMember =
    localStorage.getItem("priorityMember");

  if (!priorityMember) {

    alert(
      "Only Priority Members can reserve locations."
    );

    return;
  }

  alert(
    "Location Reserved Successfully!"
  );
};

  return (
    <section className="location-details-page">
      <div className="container">

        <div className="details-card">

          <img
            src={location.image}
            alt={location.college}
            className="details-image"
          />

          <div className="details-content">

            <span
              className={`details-status ${location.status
                .toLowerCase()
                .replace(" ", "-")}`}
            >
              {location.status}
            </span>

            <h1>{location.college}</h1>

            <div className="details-info">

              <p>
                <FaMapMarkerAlt />
                <span>{location.city}</span>
              </p>

              <p>
                <FaUsers />
                <span>{location.students} Students</span>
              </p>

            </div>

            <h5>Campus Area</h5>
            <p>{location.area}</p>

            <h5>Description</h5>
            <p>{location.description}</p>

            <div className="reservation-box">

  <div>
    <h3>Reservation Status</h3>
    <h2>{location.status}</h2>
  </div>

  {location.status === "Available" ? (
    <button
      className="confirm-btn"
      onClick={handleReservation}
    >
      Confirm Reservation
    </button>
  ) : (
    <button
      className="reserved-btn"
      disabled
    >
      {location.status}
    </button>
  )}

</div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default LocationDetails;