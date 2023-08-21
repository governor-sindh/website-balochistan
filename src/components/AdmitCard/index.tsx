"use client";
import { AdmitCard, Icons, PrintableAdmitCard } from "@/components";
import { officialEmail } from "@/data/socialLinks/socialLinks";
import { IAdmitCard } from "@/types";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";

const poppins = Poppins({
  weight: ["300", "400", "500", "800", "900"],
  subsets: ["latin"],
});

export default function DownloadAdmitCard({ data }: { data: IAdmitCard }) {
  return (
    <div className="mx-auto my-6 flex w-full max-w-4xl flex-col items-center justify-center gap-6">
      <div style={poppins.style} className="w-[95%] text-justify print:hidden">
        <h3 className="capitalize">Dear {data.fullName},</h3>
        <p className="my-4">
          Thank you for expressing your interest in the{" "}
          <b>
            Governor Balochistan&apos;s Initiative for “Artificial Intelligence,
            Web 3.0, and Metaverse”,{" "}
            <i>A Nation Building Program By Honorable</i> Governor Balochistan
            Abdul Wali Kakar.
          </b>
        </p>
        <p>
          We have received your application. Please note your Registration
          Number: {`${data.studentId}`.padStart(8, "0")}
        </p>
        <p className="my-4">
          Now that you&apos;ve applied, the next step will be the entrance exam.
          The details of the entrance exam, including the venue and date will be
          emailed to you. If you haven&apos;t already downloaded your admit card
          please download it and save it. You&apos;ll need it when you come for
          the entrance exam. Please click the download button below to save your
          admit card.
        </p>
        <p>
          While applications are being accepted, we encourage you to begin
          preparing for the entrance exam. The entrance exam will be split into
          3 parts:
        </p>
        <ul className="my-4 list-[upper-roman]">
          <li className="ml-14 pl-6">English (Reading & Vocabulary)</li>
          <li className="ml-14 pl-6">Mathematics (10th Grade Math)</li>
          <li className="ml-14 pl-6">Intelligence Quotient (IQ)</li>
        </ul>
        <p>
          For those students who are new to the computer field, you can start on
          your learning immediately by starting HTML and CSS:{" "}
        </p>
        <ul>
          <li className="my-4">
            <span className="block">
              Learn HTML by Hira Khan (Watch Recorded Videos)
            </span>
            <Link
              className="text-main underline"
              href="https://www.youtube.com/playlist?list=PLKvqnz8z1zWQ3BALy86tIXICkG874wAc6"
              target="_blank"
            >
              youtube.com/playlist?list=PLKvqnz8z1zWQ3BALy86tIXICkG874wAc6
            </Link>
          </li>
          <li>
            <span className="block">
              Learn CSS Intro by Hira Khan (Watch Recorded Videos)
            </span>
            <Link
              className="text-main underline"
              href="https://www.youtube.com/playlist?list=PLKvqnz8z1zWQSWIen_zUSEBmtqzPLuRob"
              target="_blank"
            >
              youtube.com/playlist?list=PLKvqnz8z1zWQSWIen_zUSEBmtqzPLuRob
            </Link>
          </li>
        </ul>
        <p className="mt-4">
          Regards,
          <b className="block font-bold">
            Governor&apos;s Initiative for AI, Web 3.0 & Metaverse
          </b>
          <Link
            className="mt-4 flex items-center text-main underline"
            href={`mailto:${officialEmail}`}
            target="_blank"
          >
            <AiOutlineMail className="mr-3 h-6 w-6 text-main" />
            {officialEmail}
          </Link>
        </p>
        <p className="my-4">
          To stay up to date on the latest updates from the Governor&apos;s
          Initiative, please follow us on your favorite social media channels:
        </p>
        <Icons />
      </div>

      <AdmitCard data={data} />
      <PrintableAdmitCard data={data} />
      <button
        className="mt-5 w-[95%] bg-main py-3 text-center text-sm font-semibold tracking-widest text-white transition-all hover:translate-y-1 print:hidden sm:w-52 sm:py-4 sm:text-base"
        onClick={() => window.print()}
      >
        DOWNLOAD
      </button>
    </div>
  );
}
