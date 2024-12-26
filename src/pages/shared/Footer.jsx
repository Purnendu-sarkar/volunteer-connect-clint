import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo/Branding */}
          <div className="text-center md:text-left">
            <div className="flex gap-3">
              <Heart className="h-8 w-8 text-rose-500" />
              <h2 className="text-3xl font-semibold text-blue-500">
                Volunteer Network
              </h2>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Empowering communities through volunteerism.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-center md:text-left">
            <a href="/" className="text-sm text-gray-300 hover:text-blue-400">
              Privacy Policy
            </a>
            <a href="/" className="text-sm text-gray-300 hover:text-blue-400">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="text-center mt-6 border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400">
            &copy; 2024 Volunteer App. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
