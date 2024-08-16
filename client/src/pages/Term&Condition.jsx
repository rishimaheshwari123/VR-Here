import React from "react";
import { Helmet } from "react-helmet-async";
import NavbarContainer from "../components/common/Navbar/Navbar";

const TermsAndConditions = () => {
  return (
    <div className="terms-conditions">
      <NavbarContainer />
      <Helmet>
        <title>Terms and Conditions - VR Here</title>
        <meta
          name="description"
          content="Review the comprehensive Terms and Conditions of VR Here, your trusted platform for PG room rentals and tiffin services. Ensure you understand and agree to these terms before using our services."
        />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">1. General Terms</h2>
          <p>
            Welcome to VR Here, your reliable partner for finding PG rooms and
            availing tiffin services. By accessing and using our platform, you
            agree to be bound by these Terms and Conditions. Please read them
            carefully before using our services.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">2. PG Room Services</h2>
          <p>
            VR Here provides detailed listings of PG accommodations, including
            amenities, pricing, and availability. While we strive to ensure
            accuracy, we are not responsible for any discrepancies or changes
            made by the property owners. Users are encouraged to verify details
            directly with the vendors.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">3. Tiffin Services</h2>
          <p>
            Our tiffin services connect you with vendors offering daily meals
            based on predefined menus. The availability of these services may
            vary, and the menu is subject to change without prior notice.
            We recommend confirming meal details directly with the vendor.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">4. User Responsibilities</h2>
          <p>
            As a user of VR Here, you are responsible for providing accurate and
            up-to-date contact information when utilizing our services. Any
            misuse or fraudulent activity may result in the immediate
            termination of your access to our platform.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">5. Contact Us</h2>
          <p>
            If you have any questions or concerns about these Terms and
            Conditions, feel free to reach out to us. You can contact our
            support team via email at{" "}
            <a
              href="mailto:support@mahitechnocrafts.in"
              className="text-blue-500"
            >
              support@mahitechnocrafts.in
            </a>{" "}
            or by phone at{" "}
            <a href="tel:+916267144122" className="text-blue-500">
              +91 6267144122
            </a>
            ,{" "}
            <a href="tel:+919009594537" className="text-blue-500">
              +91 9009594537
            </a>
            . We are here to assist you with any inquiries you may have.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
