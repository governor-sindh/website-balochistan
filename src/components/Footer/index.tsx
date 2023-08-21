import Link from "next/link";
import { CompulsoryData, tracks } from "@/data";
import { AiOutlineMail } from "react-icons/ai";
import { Icons } from "@/components";
import { officialEmail } from "@/data/socialLinks/socialLinks";

function Footer() {
  return (
    <div className="mt-20 w-full bg-zinc-100 print:hidden">
      <div className="m-auto w-[95%] py-20 lg:w-[90%] xl:w-[1300px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="text-zinc-800">
            <h1 className="text-xl font-bold">Core Courses</h1>
            <div className="mt-5 flex flex-col gap-3 text-sm md:text-base">
              {CompulsoryData.map((val, index) => {
                return (
                  <Link
                    href={`/compulsory/${encodeURIComponent(val.id)}`}
                    className="truncate"
                    key={index}
                  >
                    {val.text}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="text-zinc-800">
            <h1 className="text-xl font-bold">Advanced Courses</h1>
            <div className="mt-5 flex flex-col gap-3 text-sm md:text-base">
              {tracks.map((val, index) => {
                return (
                  <Link
                    href={`/tracks/${encodeURIComponent(val.id)}/4`}
                    className=""
                    key={index}
                  >
                    {val.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="text-zinc-800">
            <h1 className="text-xl font-bold">Social Links</h1>
            <Icons />
            <Link
              className="mt-4 flex items-center py-1 text-main underline"
              href={`mailto:${officialEmail}`}
              target="_blank"
            >
              <div className="mr-3 h-6 w-6">
                <AiOutlineMail className="h-6 w-6 text-main" />
              </div>
              {officialEmail}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
