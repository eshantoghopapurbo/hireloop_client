import Link from "next/link";
import {
  LogoGithub,
  LogoLinkedin,
  LogoFacebook,
} from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800">
      <div className=" mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-30">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-bold">
                <span className="text-blue-500">hire</span>
                <span className="text-orange-500">loop</span>
              </h2>
            </Link>

            <p className="mt-6 text-sm leading-7 max-w-xs">
              The AI-native career platform. Built for people who
              take their work seriously.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-10">
              <Link
                href="#"
                className="w-11 h-11 rounded-lg bg-gray-900 hover:bg-blue-600 transition flex items-center justify-center"
              >
                <LogoFacebook className="w-5 h-5 text-white" />
              </Link>

              <Link
                href="#"
                className="w-11 h-11 rounded-lg bg-indigo-600 hover:opacity-90 transition flex items-center justify-center"
              >
                <LogoGithub className="w-5 h-5 text-white" />
              </Link>

              <Link
                href="#"
                className="w-11 h-11 rounded-lg bg-gray-900 hover:bg-blue-700 transition flex items-center justify-center"
              >
                <LogoLinkedin className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Product
            </h3>

            <ul className="space-y-4">
              <li>
                <Link href="/jobs" className="hover:text-white transition">
                  Job Discovery
                </Link>
              </li>
              <li>
                <Link href="/ai" className="hover:text-white transition">
                  AI Career Assistant
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-white transition">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/salary-guide" className="hover:text-white transition">
                  Salary Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Navigation
            </h3>

            <ul className="space-y-4">
              <li>
                <Link href="/help-center" className="hover:text-white transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/career-library" className="hover:text-white transition">
                  Career Library
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-5">
              Resources
            </h3>

            <ul className="space-y-4">
              <li>
                <Link href="/brand-guideline" className="hover:text-white transition">
                  Brand Guideline
                </Link>
              </li>
              <li>
                <Link href="/newsroom" className="hover:text-white transition">
                  Newsroom
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} HireLoop. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">
            <Link href="/terms" className="hover:text-white transition">
              Terms & Policy
            </Link>

            <Link href="/privacy-policy" className="hover:text-white transition">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}