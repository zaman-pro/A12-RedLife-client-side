import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router";
import Logo from "../Logo";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-12">
      <div className="container px-4 max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <Logo />
            <p className="">
              RedLife connects blood donors with people who need it. Simple.
              Safe. Life saving. Join us and help save lives.
            </p>
          </div>

          {/* Useful Links */}
          <div className="flex md:justify-center">
            <div>
              <h3 className="text-lg font-bold mb-4">Useful Links</h3>
              <ul>
                <li className="mb-2">
                  <Link to="/donation-requests" className="hover:underline">
                    Donation Requests
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/blog" className="hover:underline">
                    Blog
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/about-us" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex md:justify-center">
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-base-300 py-4 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} RedLife. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
