import React from "react";

function FAQ() {
  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-6 fw-bold mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted">Everything you need to know about the VPrint franchise opportunity.</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion accordion-flush" id="faqAccordion">
              <div className="accordion-item shadow-sm">
                <h2 className="accordion-header">
                  <button className="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                    What is the reservation fee?
                  </button>
                </h2>
                <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    The reservation fee is a nominal ₹499 deposit that secures
                    your priority in the investor queue. This fee is fully applicable 
                    toward your initial franchise licensing and setup costs.
                  </div>
                </div>
              </div>

              <div className="accordion-item shadow-sm">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                    Can I change my reserved location?
                  </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Yes, you can swap your reserved location for any other
                    available spot on the platform within the first 7 days
                    of your exclusive reservation period without any penalty.
                  </div>
                </div>
              </div>

              <div className="accordion-item shadow-sm">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                    How long is the reservation valid?
                  </button>
                </h2>
                <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    A standard reservation is valid for 30 days. This gives you 
                    ample time to review the franchise disclosure document and 
                    complete the necessary onboarding steps.
                  </div>
                </div>
              </div>

              <div className="accordion-item shadow-sm">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                    What is the approval process?
                  </button>
                </h2>
                <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    After reservation, our team reviews your profile within
                    48 hours. Once pre-approved, we schedule a briefing to
                    walk you through the operational requirements, logistics, 
                    and expected ROI for your chosen campus.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;