import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  // FaInstagram,
  // FaTiktok,
} from "react-icons/fa";
import Link from "next/link";

export default function Icons() {
  return (
    <div className="my-5 flex gap-3  md:text-sm">
      <Link
        href={"https://www.facebook.com/groups/panaverse"}
        target="_blank"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4267B2] text-white"
      >
        <FaFacebookF className="h-5 w-5" />
      </Link>
      <Link
        href={"https://www.youtube.com/@panaverse"}
        target="_blank"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF0000] text-white"
      >
        <FaYoutube className="h-5 w-5" />
      </Link>
      <Link
        href={"https://twitter.com/Panaverse_edu"}
        target="_blank"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1DA1F2] text-white"
      >
        <FaTwitter className="h-5 w-5" />
      </Link>
      {/* <Link
        href={"https://instagram.com/KamranTessoriPk"}
        target="_blank"
        className="instagram flex h-8 w-8 items-center justify-center rounded-full text-white"
      >
        <FaInstagram className="h-5 w-5" />
      </Link>
      <Link
        href={"https://tiktok.com/@KamranTessoriPk"}
        target="_blank"
        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#171515] text-white"
      >
        <FaTiktok className="h-5 w-5" />
      </Link> */}
    </div>
  );
}
