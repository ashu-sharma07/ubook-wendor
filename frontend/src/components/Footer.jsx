import { NavLink } from "react-router-dom";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";


export default function Footer() {
  return (
    <section className='w-full bg-green-100 mt-5 raleway pb-5'>
      <div className="max-w-screen-xl border-b border-gray-400 xl:px-0 lg:px-12 mx-auto overflow-x-hidden pt-20 py-10 flex flex-col gap-10 md:px-10 px-6 w-full">
        <h1 className="syne font-semibold text-5xl">uBook</h1>
        <div className="flex items-start justify-start gap-32 w-full">
          <div className="flex justify-start flex-col gap-3">
            <h3 className="font-medium text-2xl">
              Company
            </h3>
            <ul>
              <li>
                <NavLink to={"/"}>
                  About us
                </NavLink>
              </li>
              <li>
                <NavLink to={"/"}>
                  Terms & Conditions
                </NavLink>
              </li>
              <li>
                <NavLink to={"/"}>
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to={"/"}>
                  Careers
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="flex justify-start flex-col gap-3">
            <h3 className="font-medium text-2xl">
              Social Links
            </h3>
            <ul className="flex gap-3 text-xl items-center">
              <li>
                <NavLink to={"/"}>
                  <FaFacebook />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/"}>
                  <FaLinkedin />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/"}>
                  <FaTwitter />
                </NavLink>
              </li>
              <li>
                <NavLink to={"/"}>
                  <BsInstagram />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h4 className="text-center text-sm mb-2 mt-6">
        © 2024 uBook. All rights reserved
      </h4>
    </section>
  )
}
