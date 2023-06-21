import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  // FaTiktok,
  // FaCheck,
} from "react-icons/fa";
import type { IconType } from "react-icons";

interface ISocialLinks {
  id: number;
  platform: string;
  link: string;
  class: string;
  icon: any;
  // icon: IconType;
}

export const socialLinks: ISocialLinks[] = [
  {
    id: 1,
    platform: "facebook",
    link: "https://www.facebook.com/governorsindhinitiative",
    class: "bg-[#4267B2]",
    icon: <FaFacebookF className="h-5 w-5" />,
  },
  {
    id: 2,
    platform: "youtube",
    link: "https://www.youtube.com/channel/UCFo-Z1Tp-Tus4D-YQNlue6A?sub_confirmation=1",
    class: "bg-[#FF0000]",
    icon: <FaYoutube className="h-5 w-5" />,
  },
  {
    id: 3,
    platform: "twitter",
    link: "https://twitter.com/KamranTessoriPk",
    class: "bg-[#1DA1F2]",
    icon: <FaTwitter className="h-5 w-5" />,
  },
  {
    id: 4,
    platform: "instagram",
    link: "https://www.instagram.com/KamranTessoriPk/",
    class: "instagram",
    icon: <FaInstagram className="h-5 w-5" />,
  },
];
// {id:5,name:'tiktok',link:'' <FaTiktok className="h-5 w-5" /> },
