import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  // FaTiktok,
  // FaCheck,
} from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";

interface ISocialLinks {
  id: number;
  platform: string;
  link: string;
  class: string;
  icon: any;
}
import { fbLink, youtubeLink, twitterLink } from "./socialLinks";

export const socialLinks: ISocialLinks[] = [
  {
    id: 1,
    platform: "facebook",
    link: fbLink,
    class: "bg-[#4267B2]",
    icon: <FaFacebookF className="h-5 w-5" />,
  },
  {
    id: 2,
    platform: "youtube",
    link: youtubeLink,
    class: "bg-[#FF0000]",
    icon: <FaYoutube className="h-5 w-5" />,
  },
  {
    id: 3,
    platform: "twitter",
    link: twitterLink,
    class: "bg-[#1DA1F2]",
    icon: <FaTwitter className="h-5 w-5" />,
  },
  // {
  //   id: 4,
  //   platform: "instagram",
  //   link: "https://www.instagram.com/KamranTessoriPk/",
  //   class: "instagram",
  //   icon: <FaInstagram className="h-5 w-5" />,
  // },
  // {
  //   id: 5,
  //   platform: "Apply",
  //   link: "",
  //   class: "bg-green-500 !cursor-not-allowed",
  //   icon: <GiCheckMark size={14} />,
  // },
];
