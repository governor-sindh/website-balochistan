import { IAdmitCard } from "@/types";
import { Poppins } from "next/font/google";
import govtLogo from "../../../public/logo.png";
import Image from "next/image";

const poppins = Poppins({
  weight: ["300", "400", "500", "800", "900"],
  subsets: ["latin"],
});

export default function AdmitCard({ data }: { data: IAdmitCard }) {
  return (
    <div className="w-[95%] max-w-4xl border-2 border-gray-800 p-3 print:hidden xs:p-10">
      <div className="flex items-center justify-evenly">
        <Image
          src={govtLogo}
          alt="govt Balochistan logo"
          width={90}
          className="w-[70px] sm:w-[80px] md:w-[90px]"
        />
        <h1
          style={poppins.style}
          className="text-center text-lg font-bold text-main md:text-3xl"
        >
          Governor Balochistan Initiative for
          <br className="hidden md:block" />
          Artificial Intelligence, Web 3.0 & Metaverse
        </h1>
        <div></div>
      </div>
      <h2
        style={poppins.style}
        className="my-7 text-center text-sm font-bold text-black xs:text-lg md:text-3xl"
      >
        Entry Test Admit Card
      </h2>
      <div className="mb-6 flex flex-col items-center justify-evenly border-b border-zinc-500 pb-6 md:flex-row">
        <div className="image flex h-40 w-32 items-center justify-center border-2 border-dotted border-gray-900 text-center md:order-last md:w-40">
          Paste
          <br />
          Photograph
          <br />1 X 1
        </div>
        <div className="fields">
          <div className="my-1 flex text-lg">
            <h6 className="w-40 font-bold min-[375px]:w-48 md:w-52">
              Student Name :
            </h6>
            <p className="w-32 border-b-2 border-gray-700  capitalize xs:w-48 md:w-60">
              {data.fullName}
              <span className="h-[2px] w-full bg-gray-700"></span>
            </p>
          </div>

          <div className="my-1 flex text-lg">
            <h6 className="w-40 font-bold min-[375px]:w-48 md:w-52">
              Father&apos;s Name :
            </h6>
            <p className="w-32 border-b-2 border-gray-700  capitalize xs:w-48 md:w-60 ">
              {data.fatherName}
              <span className="h-[2px] w-full bg-gray-700"></span>
            </p>
          </div>

          <div className="my-1 flex text-lg">
            <h6 className="w-40 font-bold min-[375px]:w-48 md:w-52">
              Student CNIC No :
            </h6>
            <p className="w-32 border-b-2 border-gray-700  capitalize xs:w-48 md:w-60">
              {data.cnic}
            </p>
          </div>

          <div className="my-1 flex  text-lg">
            <h6 className="w-40 font-bold min-[375px]:w-48 md:w-52">
              Student Reg No :
            </h6>
            <p className="w-32 border-b-2 border-gray-700 capitalize xs:w-48 md:w-60">
              {`${data.studentId}`.padStart(8, "0")}
            </p>
          </div>

          <div className="my-1 flex text-lg">
            <h6 className="w-40 font-bold min-[375px]:w-48 md:w-52">
              Date of Registration :
            </h6>
            <p className="w-32 border-b-2 border-gray-700  capitalize xs:w-48 md:w-60">
              {`${new Date(data.dateOfRegistration).toLocaleDateString()}`}
              <span className="h-[2px] w-full bg-gray-700"></span>
            </p>
          </div>

          <div className="my-1 flex text-lg">
            <h6 className="w-40 font-bold min-[375px]:w-48 md:w-52">Venue :</h6>
            <p className="w-32 border-b-2 border-gray-700  capitalize xs:w-48 md:w-60 ">
              Governor House Balochistan
              <span className="h-[2px] w-full bg-gray-700"></span>
            </p>
          </div>
        </div>
      </div>

      <h2 className="my-2 text-lg font-bold">Instructions :</h2>
      <ul className="my-2 pl-6">
        <li>
          Please bring your original CNIC or B-Form and admit card hard copy.
        </li>
        <li>Details and date of the entrance exam will be emailed to you.</li>
      </ul>
    </div>
  );
}
