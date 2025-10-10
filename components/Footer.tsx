import {
  FaFacebookF,
  FaInstagram,
  FaSnapchatGhost,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <section className="w-full p-4 flex justify-center items-center bg-black">
      <div className="max-w-7xl w-full flex flex-col justify-center items-center">
        <footer className="bg-black text-white py-10 w-full">
          {/* Social Section */}
          <div className="text-center mb-8">
            <h2 className="font-bold uppercase mb-4">Gor Ma Ko&#39;ogalo</h2>
            <div className="flex justify-center gap-6 text-green-500 text-2xl">
              <FaFacebookF />
              <FaXTwitter />
              <FaInstagram />

              <FaSnapchatGhost />
              <FaTiktok />
            </div>
          </div>

          {/* Sign for Celtic */}
          <div className="text-center border-t border-gray-600 pt-6 pb-8">
            <p className="text-gray-300 mt-2 max-w-md mx-auto">
              Become a registered member
            </p>
            <button className="mt-3 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Sign for Gor Mahia
            </button>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-16 mt-10">
            {/* Column 1 */}
            <div>
              <h4 className="font-bold uppercase border-b border-gray-500 pb-2 mb-3">
                Official Gor Mahia FC Website
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>Terms of Use</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="font-bold uppercase border-b border-gray-500 pb-2 mb-3">
                —
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>Working at Gor Mahia</li>

                <li>Contact Us</li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="font-bold uppercase border-b border-gray-500 pb-2 mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>Gor Mahia</li>
                <li>Gor TV</li>
                <li>Shop</li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="font-bold uppercase border-b border-gray-500 pb-2 mb-3">
                —
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>News</li>
                <li>Fixtures</li>
                <li>Teams</li>
                <li>Tickets</li>
              </ul>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-gray-600 mt-10"></div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
