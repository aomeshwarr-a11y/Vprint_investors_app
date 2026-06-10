import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaUserFriends
} from "react-icons/fa";

import collage from "../../assets/campus-hd.png";

function Locations() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const handleReserve = (locationId) => {
    const priorityMember = localStorage.getItem("priorityMember");
    if (!priorityMember) {
      alert("Only Priority Members can reserve locations.");
      return;
    }
    navigate(`/location/${locationId}`);
  };

  const locations = [
    {
      id: 1,
      college: "JBIET",
      city: "Hyderabad",
      area: "Main Canteen Area",
      students: "5,000+",
      status: "Reserved",
      image: collage,
    },
    {
      id: 2,
      college: "JBREC",
      city: "Hyderabad",
      area: "Central Canteen Hub",
      students: "4,000+",
      status: "Reserved",
      image: collage,
    },
    {
      id: 3,
      college: "KG Reddy College",
      city: "Hyderabad",
      area: "College Cafeteria",
      students: "5,500+",
      status: "Reserved",
      image: collage,
    },
    {
      id: 4,
      college: "VBIET",
      city: "Hyderabad",
      area: "Main Canteen Area",
      students: "5,000+",
      status: "Available",
      image: collage,
    },
    {
      id: 5,
      college: "CMR",
      city: "Hyderabad",
      area: "Canteen",
      students: "12,000+",
      status: "Available",
      image: collage,
    },
    {
      id: 6,
      college: "GLOBAL COLLEGE",
      city: "Hyderabad",
      area: "Tech Park Food Court",
      students: "4,000+",
      status: "Available",
      image: collage,
    },
    {
      id: 7,
      college: "MGIET",
      city: "Hyderabad",
      area: "Main Canteen Area",
      students: "5,000+",
      status: "Available",
      image: collage,
    },
  ];

  const filteredLocations = locations.filter((item) => {
    const matchesSearch =
      item.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.area.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCity = cityFilter === "All" || item.city === cityFilter;
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesCity && matchesStatus;
  });

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentLocations = filteredLocations.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredLocations.length / cardsPerPage);

  return (
    <section className="locations-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold">Find Your Ideal Location</h2>
          <p className="text-muted">Browse through premium campus spots available for your next automated kiosk.</p>
        </div>

        {/* Filters */}
        <div className="locations-filters mb-5">
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by college, city or area..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="d-flex gap-3">
            <select
              className="form-select shadow-none border-light-subtle"
              value={cityFilter}
              onChange={(e) => {
                setCityFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Cities</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>

            <select
              className="form-select shadow-none border-light-subtle"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Reserved">Reserved</option>
              <option value="Under Review">Under Review</option>
            </select>

            <button className="filter-btn">
              <FaFilter />
              <span>More</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="locations-grid">
          {currentLocations.map((location) => (
            <div className="location-card" key={location.id}>
              <div className="image-wrapper position-relative">
                <img
                  src={location.image}
                  alt={location.college}
                  className="location-image"
                />
                <span
                  className={`status-badge ${location.status.toLowerCase().replace(" ", "-")}`}
                >
                  {location.status}
                </span>
              </div>

              <div className="location-content">
                <div className="location-header d-flex justify-content-between align-items-start mb-3">
                  <h3 className="h5 fw-bold mb-0">{location.college}</h3>
                  <span className="location-city badge bg-light text-primary border border-primary-subtle d-flex align-items-center gap-1">
                    <FaMapMarkerAlt size={10} />
                    {location.city}
                  </span>
                </div>

                <p className="location-area text-muted small mb-4">
                  {location.area}
                </p>

                <hr />

                <div className="location-footer">

  <div>
    <small>STUDENT STRENGTH</small>
    <h5>{location.students}</h5>
  </div>

  {location.status === "Available" ? (
    <button
      className="reserve-btn"
      onClick={() => handleReserve(location.id)}
    >
      Reserve Now 
    </button>
  ) : (
    <button className="reserved-btn" disabled>
      {location.status}
    </button>
  )}


         </div>
      </div>
    </div>
  ))}
</div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination-wrapper mt-5 d-flex justify-content-center gap-2">
            <button
              className="btn btn-outline-light border text-dark p-3 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px' }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FaChevronLeft size={12} />
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`btn ${currentPage === index + 1 ? "btn-primary" : "btn-outline-light border text-dark"} rounded-circle fw-bold`}
                style={{ width: '40px', height: '40px', padding: 0 }}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="btn btn-outline-light border text-dark p-3 rounded-circle d-flex align-items-center justify-content-center"
              style={{ width: '40px', height: '40px' }}
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FaChevronRight size={12} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Locations;