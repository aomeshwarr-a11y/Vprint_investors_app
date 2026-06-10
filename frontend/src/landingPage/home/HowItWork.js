import React from 'react';
import {
  BsMap,
  BsCursor,
  BsCashStack,
  BsClipboardCheck,
  BsLockFill,
} from "react-icons/bs";
import { HiLightningBolt, HiChartBar } from "react-icons/hi";

import campusImg from "../../assets/collage.jpeg";

function HowItWork() {
    const steps = [
    {
      id: 1,
      icon: <BsMap />,
      title: "Browse Locations",
      desc: "Explore our curated list of high-traffic student hubs and library clusters.",
    },
    {
      id: 2,
      icon: <BsCursor />,
      title: "Select Location",
      desc: "Review detailed footprint analytics and select the spot that fits your goals.",
    },
    {
      id: 3,
      icon: <BsCashStack />,
      title: "Pay Reservation Fee",
      desc: "Secure your priority with a low-cost, refundable reservation deposit.",
    },
    {
      id: 4,
      icon: <BsClipboardCheck />,
      title: "Complete Process",
      desc: "Finalize the franchise agreement and prepare for deployment.",
    },
  ];
  return (
   <section id="how-it-works" className="how-section">
      <div className="container">

        <div className="text-center mb-5 ">
          <h2 className="display-5 fw-bold mb-3">Simple 4-Step Process</h2>
          <p className="text-muted max-w-2xl mx-auto">Getting your automated print kiosk deployed is easier than you think.</p>
        </div>

        <div className="row g-4 mb-5">
          {steps.map((step) => (
            <div key={step.id} className="col-12 col-sm-6 col-lg-3">
              <div className="step-card">
                <div className="icon-wrapper">
                  {step.icon}
                  <span className="step-number">
                    {step.id}
                  </span>
                </div>
                <h4 className="step-title">
                  {step.title}
                </h4>
                <p className="step-desc">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 mb-5">
          <div className="col-lg-8">
            <div className="opportunity-card">
              <img
                src={campusImg}
                alt="Campus"
                className="img-fluid opportunity-img"
              />
              <div className="opportunity-overlay">
                <h2 className="fw-bold h1">
                  Campus-Focused Opportunity
                </h2>
                <p className="lead">
                  Unlock recurring revenue streams by placing
                  automated print kiosks in the most coveted
                  student traffic zones in the nation.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="reservation-card h-100 d-flex flex-column justify-content-center">
              <div className="lock-icon">
                <BsLockFill />
              </div>
              <h3 className="fw-bold mt-4">
                Exclusive Reservation
              </h3>
              <p className="mt-3 text-muted">
                Once you reserve a spot, it's locked to your account
                for 30 days while you review the paperwork.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-5">
            <div className="feature-card h-100">
              <div className="feature-icon">
                <HiLightningBolt />
              </div>
              <h3 className="fw-bold">Streamlined Workflow</h3>
              <p className="text-muted">
                No complex legal hurdles. Our streamlined
                digital portal manages everything from fee
                to fulfillment with absolute transparency.
              </p>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="feature-card tracking-card h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="feature-icon">
                  <HiChartBar />
                </div>
                <h3 className="fw-bold">Real-time Analytics</h3>
                <p className="text-muted">
                  Monitor your kiosk's deployment status in real-time.
                  Watch your investment move through approval,
                  logistics, and installation with our interactive tracking system.
                </p>
              </div>

              <div className="status-card p-4 bg-light rounded-4 mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="status-title fw-bold small text-primary">
                    INSTALLATION STATUS
                  </span>
                  <span className="badge bg-success">Scheduled</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    style={{ width: "66%" }}
                  ></div>
                </div>
                <small className="d-block mt-3 fw-medium text-muted">
                  66% Complete — Expected live date: Sept 12
                </small>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default HowItWork;