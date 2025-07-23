import { FiFacebook } from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-base-300 border-t mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm text-gray-600">
        {/* Left Column */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">NTN</h3>
          <p className="leading-relaxed">
            A place to explore and share programming courses. <br />
            Discover, create, and learn together with the NTN community!
          </p>
        </div>

        {/* Middle Column */}
        <div>
          <h4 className="text-md font-semibold text-gray-800 mb-2">
            Quick Links
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="/home" className="hover:text-pink-500 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/profile" className="hover:text-pink-500 transition-colors">
                Profile
              </a>
            </li>
          </ul>
        </div>

        {/* Right Column */}
        <div>
          <h4 className="text-md font-semibold text-gray-800 mb-2">
            Follow Us
          </h4>
          <ul className="space-y-2">
            <li className="flex">
              <a
                href="https://web.facebook.com/?ref=homescreenpwa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 flex items-center gap-2 transition-colors"
              >
                <span className="text-2xl"><FiFacebook /></span>
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-400 py-4 border-t">
        &copy; {new Date().getFullYear()} NTN. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;