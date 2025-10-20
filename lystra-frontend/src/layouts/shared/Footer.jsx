import { Link } from "react-router-dom";
import bikewale from "@/assets/footer/bikewale.png";
import cartrade from "@/assets/footer/cartrade.png";
import carwale from "@/assets/footer/carwale.png";
import mobilityOutlook from "@/assets/footer/mobilityOutlook.png";
import olx from "@/assets/footer/olx.png";
import patreon from "@/assets/footer/patreon.png";
import facebook from "@/assets/footer/facebook.svg";
import instagram from "@/assets/footer/instagram.svg";
import linkedin from "@/assets/footer/linkedin.svg";
import twitter from "@/assets/footer/twitter.svg";
import Logo from "@/components/landing/Logo";

export default function Footer() {
  const fullYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1C2E] text-white flex flex-col justify-center items-center text-center pt-5 4xl:pt-0">
      <section className="w-full flex flex-col 2xl:flex-row justify-center items-center 2xl:items-start 2xl:py-16 2xl:gap-20 4xl:gap-24 4xl:py-[105px]">
        <section className="px-5 2xl:px-0 w-full md:w-[60vw] font-normal 2xl:w-[305px] 2xl:flex flex-col 2xl:gap-11">
          <div className="2xl:-ms-[140px]">
            <Logo color={"text-white"} />
          </div>
          <p className="mt-4 2xl:mt-0 w-full 2xl:text-start">
            Gosh jaguar ostrich quail one excited dear hello & bound & the and
            bland misheard roadrunner flapped lynx far that and jeepers giggled
            far.
          </p>
          <div className="flex flex-row gap-3 2xl:gap-6 justify-center mt-7 2xl:mt-6 items-center 2xl:justify-start">
            <p className="text-center">Follow Us: </p>
            <div className="flex justify-center items-center gap-3 2xl:gap-4">
              <Link to="http://www.facebook.com" target="_blank">
                <img
                  src={facebook}
                  alt="facebook logo"
                  className="hover:scale-110"
                />
              </Link>
              <Link to="http://www.x.com" target="_blank">
                <img
                  src={twitter}
                  alt="twitter logo"
                  className="hover:scale-110"
                />
              </Link>
              <Link to="http://www.instagram.com" target="_blank">
                <img
                  src={instagram}
                  alt="instagram logo"
                  className="hover:scale-110"
                />
              </Link>
              <Link to="http://www.linkedin.com" target="_blank">
                <img
                  src={linkedin}
                  alt="linkedin logo"
                  className="hover:scale-110"
                />
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full 2xl:text-lg sm:ps-10 sm:pb-5 2xl:p-0 sm:flex justify-center items-start gap-20 sm:gap-0 2xl:gap-16 4xl:gap-[54px] 2xl:w-[700px] 4xl:w-fit">
          <div className="mt-8 2xl:mt-0 flex gap-5 2xl:gap-16 4xl:gap-[86px] justify-center items-center ">
            <div className="">
              <h4 className="text-[#ED640F] 2xl:text-start">Quick Links</h4>
              <div className="mt-3 2xl:mt-16 sm:flex flex-col gap-5 2xl:gap-6 2xl:items-start">
                <Link to="/auth/login">
                  <p className="hover:text-[#ED640F]">Blogs</p>
                </Link>
                <Link to="/help">
                  <p className="hover:text-[#ED640F]">Help</p>
                </Link>
                <Link to="/auth/login">
                  <p className="hover:text-[#ED640F]">Sitemap</p>
                </Link>
                <Link to="/auth/login">
                  <p className="hover:text-[#ED640F]">Privacy Policy</p>
                </Link>
              </div>
            </div>
            <div className="">
              <h4 className="text-[#ED640F]">Popular Location</h4>
              <div className="mt-3 2xl:mt-16 sm:flex flex-col gap-5 2xl:gap-6 2xl:items-start">
                <Link
                  to="https://www.google.com/maps/place/Kolkata"
                  target="_blank"
                >
                  <p className="hover:text-[#ED640F]">Kolkata</p>
                </Link>
                <Link
                  to="https://www.google.com/maps/place/Mumbai"
                  target="_blank"
                >
                  <p className="hover:text-[#ED640F]">Mumbai</p>
                </Link>
                <Link
                  to="https://www.google.com/maps/place/Chennai"
                  target="_blank"
                >
                  <p className="hover:text-[#ED640F]">Chennai</p>
                </Link>
                <Link
                  to="https://www.google.com/maps/place/Pune"
                  target="_blank"
                >
                  <p className="hover:text-[#ED640F]">Pune</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-[100vw] mt-8 2xl:mt-0 mb-11 2xl:mb-0 sm:w-[320px] px-3 sm:px-0">
            <h4 className="text-[#ED640F] mb-3 2xl:mb-8 4xl:mb-6 2xl:text-start">
              Companies
            </h4>
            <div className="flex flex-wrap justify-center 2xl:justify-start items-center gap-4 2xl:gap-0">
              <div className="flex flex-col md:flex-row justify-start items-center gap-5 2xl:ps-2">
                <Link to="https://www.olx.in/en-in" target="_blank">
                  <img
                    src={olx}
                    alt="olx logo"
                    className="h-[39px] 2xl:h-[59px] hover:scale-105 cursor-pointer"
                  />
                </Link>
                <Link to="https://www.carwale.com/" target="_blank">
                  <img
                    src={carwale}
                    alt="carwale logo"
                    className="h-[50px] 2xl:h-[90px] hover:scale-105 cursor-pointer"
                  />
                </Link>
              </div>
              <div className="flex flex-col md:flex-row justify-start items-center gap-5 2xl:-mt-4 4xl:-mt-2">
                <Link to="https://www.bikewale.com/" target="_blank">
                  <img
                    src={bikewale}
                    alt="bikewale logo"
                    className="h-[47px] 2xl:h-[77px] hover:scale-105 cursor-pointer"
                  />
                </Link>
                <Link to="https://www.cartrade.com/" target="_blank">
                  <img
                    src={cartrade}
                    alt="cartrade logo"
                    className="h-[47px] 2xl:h-[77px] hover:scale-105 cursor-pointer"
                  />
                </Link>
              </div>
              <div className="flex flex-col md:flex-row justify-start items-center gap-4 2xl:-mt-4 4xl:-mt-2">
                <Link to="https://www.mobilityoutlook.com/" target="_blank">
                  <img
                    src={mobilityOutlook}
                    alt="{mobilityOutlook logo"
                    className="h-[47px] 2xl:h-[77px] hover:scale-105 cursor-pointer"
                  />
                </Link>
                <Link to="https://www.patreon.com/en-GB" target="_blank">
                  <img
                    src={patreon}
                    alt="patreon logo"
                    className="h-[47px] 2xl:h-[77px] hover:scale-105 cursor-pointer"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>

      <hr className="bg-[#33364B] w-full" />

      <p className="text-[#848A91] my-[30px]">
        &copy; {fullYear} <span className="text-white">Lystra</span> All Rights
        Reserved
      </p>
    </footer>
  );
}
