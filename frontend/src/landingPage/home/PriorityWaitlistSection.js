import React, { useState } from "react";
import PriorityModal from "./PriorityModal";
import { HiSparkles } from "react-icons/hi";

function PriorityWaitlistSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section id="priority-wait-list" className="priority-section mx-3 mx-lg-0">
        <div className="container text-center">
          <div className="d-inline-flex align-items-center gap-2 bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-pill mb-4 border border-primary border-opacity-25">
            <HiSparkles />
            <span className="small fw-bold">Limited Opportunity</span>
          </div>

          <h2 className="priority-title display-5 fw-bold mb-4">
            Secure Your Priority Access
          </h2>

          <p className="priority-description mx-auto mb-5 text-light opacity-75">
            Don't wait for the public launch. Join the priority list today and get 
            exclusive first-rights to deploy kiosks at high-traffic campus locations.
          </p>

          <button
            className="priority-btn btn-lg px-5 py-3 shadow-lg"
            onClick={() => setShowModal(true)}
          >
            Become a Priority Partner
          </button>
        </div>
      </section>

      {showModal && (
        <PriorityModal
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default PriorityWaitlistSection;