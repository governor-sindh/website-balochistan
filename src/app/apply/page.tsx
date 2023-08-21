"use client";
import {
  DownloadAdmitCard,
  EmailAndOtpFields,
  Input,
  Loader,
} from "@/components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IApplyForm } from "@/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { mainFormSchema } from "@/lib/yupValidation";
import { formCities, formQualifications } from "@/data";
import { useToast } from "@chakra-ui/react";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  weight: ["300", "400", "500", "800", "900"],
  subsets: ["latin"],
});

export default function Page() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<any>();
  const [occupiedErr, setOccupiedErr] = useState({
    phoneNumber: "",
    cnic: "",
    email: "",
    otp: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IApplyForm>({
    mode: "onTouched",
    resolver: yupResolver(mainFormSchema),
  });

  const onFormSubmit = async (data: IApplyForm) => {
    try {
      setLoading(true);
      const formData = {
        fullName: data.fullName.toLowerCase(),
        fatherName: data.fatherName.toLowerCase(),
        cnic: Number(data.cnic),
        phoneNumber: Number(`92${data.phoneNumber}`),
        city: data.city,
        email: data.email.toLowerCase(),
        otp: Number(data.otp),
        dateOfBirth: `${data.dateOfBirth.getFullYear()}-${
          data.dateOfBirth.getMonth() + 1
        }-${data.dateOfBirth.getDate()}`,
        gender: data.gender.toLowerCase(),
        highestQualification: data.highestQualification,
      };

      const res = await fetch("/api/applyform", {
        body: JSON.stringify(formData),
        method: "POST",
      });

      const resData: any = await res.json();
      if (!resData.users) throw new Error(resData.message);

      setFormValues({
        ...formData,
        ...(resData.users[0] && { users: resData.users[0] }),
      });

      toast({
        title: `${resData.message}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      localStorage.removeItem("facebook");
      localStorage.removeItem("youtube");
      localStorage.removeItem("twitter");
      localStorage.removeItem("instagram");

      setIsApplied(true);
    } catch (err: any) {
      toast.closeAll();
      toast({
        title: `${err.message || "Unknown Error"}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      if (err.message == "An application with this email already exists.") {
        setOccupiedErr({ ...occupiedErr, email: err.message });
      } else if (
        err.message == "An application with this CNIC already exists."
      ) {
        setOccupiedErr({ ...occupiedErr, cnic: err.message });
      } else if (
        err.message == "An application with this Phone number already exists."
      ) {
        setOccupiedErr({ ...occupiedErr, phoneNumber: err.message });
      } else if (err.message === "Incorrect OTP Entered!") {
        setOccupiedErr({ ...occupiedErr, otp: err.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mb-20 flex flex-col items-center justify-center">
      {isApplied && formValues && formValues.users && (
        <>
          <h1
            style={poppins.style}
            className="my-8 text-center text-lg font-bold text-main print:hidden md:text-3xl"
          >
            Download Admit Card
          </h1>
          <DownloadAdmitCard
            data={{
              cnic: formValues.cnic,
              dateOfRegistration: formValues.users.createdAt,
              fatherName: formValues.fatherName,
              fullName: formValues.fullName,
              studentId: formValues.users.id,
            }}
          />
        </>
      )}

      {!isApplied && (
        <form
          className="w z-10 mx-4 my-10 w-full max-w-2xl rounded bg-opacity-30 px-4 py-8 text-black shadow-lg backdrop-blur-3xl md:mx-10 md:px-6"
          onSubmit={handleSubmit(onFormSubmit)}
          noValidate
        >
          <h1
            style={poppins.style}
            className="mb-8 text-center text-lg font-bold text-main md:text-3xl"
          >
            Student Course Registration Form{" "}
          </h1>
          <p className="text-center">
            Already applied?{" "}
            <Link className="text-blue-400 underline" href={"/admit-card"}>
              Get Admit Card
            </Link>
          </p>
          <Input
            type="text"
            id="fullName"
            placeholder="Full Name"
            required={true}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            id="fatherName"
            placeholder="Father's Full Name"
            required={true}
            register={register}
            errors={errors}
          />
          <EmailAndOtpFields
            watch={watch}
            register={register}
            errors={errors}
            occupiedErr={occupiedErr}
            setOccupiedErr={setOccupiedErr}
          />
          <Input
            type="tel"
            id="cnic"
            placeholder="CNIC or B-Form Number"
            required={true}
            register={register}
            errors={errors}
            occupiedErr={occupiedErr}
            setOccupiedErr={setOccupiedErr}
          />
          <Input
            type="tel"
            id="phoneNumber"
            placeholder="Phone Number"
            required={true}
            register={register}
            errors={errors}
            occupiedErr={occupiedErr}
            setOccupiedErr={setOccupiedErr}
          />
          <label htmlFor="city" className="text-slate-700 md:text-xl">
            City *
          </label>
          <select
            {...register("city", { required: true })}
            id="city"
            className={`mb-2 mt-2 block w-full rounded border border-gray-400 bg-gray-100 p-3 md:text-lg ${
              errors?.city
                ? "border-red-400 ring-red-500"
                : "focus:border-sub focus:ring-sub"
            } outline-none focus:ring-1`}
            required
          >
            <option value="karachi">Karachi</option>
            {formCities.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="mb-4 text-red-400">{errors.city?.message}</p>
          )}

          <Input
            type="date"
            id="dateOfBirth"
            placeholder="Date of Birth"
            required={true}
            register={register}
            errors={errors}
          />
          <label className="text-slate-700 md:text-xl"> Gender *</label>
          <div className="mb-4 flex justify-center gap-20 text-xl">
            <label className="ml-2 cursor-pointer text-slate-700 md:text-xl">
              <input
                {...register("gender", { required: true })}
                type="radio"
                value="male"
                className="h-4 w-4 cursor-pointer text-sub"
              />
              <span> Male </span>
            </label>
            <label className="ml-2 cursor-pointer text-slate-700 md:text-xl">
              <input
                {...register("gender", { required: true })}
                type="radio"
                value="female"
                className="h-4 w-4 cursor-pointer text-sub"
              />
              <span> Female</span>
            </label>
          </div>
          {errors.gender && (
            <p className="mb-4 text-red-400">{errors.gender?.message}</p>
          )}
          <div className="my-6">
            <label
              htmlFor="qualification"
              className="text-slate-700 md:text-xl"
            >
              Highest Qualification *
            </label>
            <select
              {...register("highestQualification", { required: true })}
              id="qualification"
              className={`mb-2 mt-1 block w-full cursor-pointer rounded border border-gray-400 bg-gray-100 p-3 md:text-lg ${
                errors?.highestQualification
                  ? "border-red-400 ring-red-500"
                  : "focus:border-sub focus:ring-sub"
              } outline-none focus:ring-1`}
            >
              <option value="n">Please Select</option>
              {formQualifications.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.highestQualification && (
              <p className="mb-4 text-red-400">
                {errors.highestQualification?.message}
              </p>
            )}
          </div>

          <div className="flex w-full justify-center">
            <button
              type="submit"
              style={poppins.style}
              disabled={loading}
              className="text mt-5 w-52  bg-main py-4 text-center text-base font-semibold tracking-widest text-white transition-all hover:translate-y-1 disabled:opacity-60 disabled:hover:cursor-not-allowed sm:w-full sm:py-3 sm:text-sm"
            >
              {loading ? <Loader width="w-4" height="h-4" /> : "SUBMIT"}
            </button>
          </div>
        </form>
      )}
    </main>
  );
}

// this is for tailwind to  ==> bg-green-500 !cursor-not-allowed
