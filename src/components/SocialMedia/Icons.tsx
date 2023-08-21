import Link from "next/link";
import { socialLinks } from "@/data";

export default function Icons() {
  return (
    <div className="my-5 flex gap-3 md:text-sm">
      {socialLinks.map((item) => (
        <Link
          href={item.link}
          target="_blank"
          className={`flex h-8 w-8 ${item.class} items-center justify-center rounded-full text-white`}
          key={item.id}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  );
}
