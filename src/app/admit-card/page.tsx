"use client";
import { Input, Loader, AdmitCard } from "@/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { admitCardRequirementsSchema } from "@/lib/yupValidation";
import { IAdmitCard, IAdmitCardRequirements } from "@/types";
import { Poppins } from "next/font/google";
import { useState } from "react";

const poppins = Poppins({
  weight: ["300", "400", "500", "800", "900"],
  subsets: ["latin"],
});

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IAdmitCard>({
    fullName: "Shehzad",
    fatherName: "string",
    cnic: "string",
    phoneNumber: "string",
    email: "string",
    dateOfRegistration: "any",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAdmitCardRequirements>({
    mode: "onTouched",
    resolver: yupResolver(admitCardRequirementsSchema),
  });

  const onFormSubmit = async (formData: IAdmitCardRequirements) => {
    try {
      setLoading(true);
      const sleep = () => new Promise((resolve) => setTimeout(resolve, 2500));
      await sleep();

      //   const res = await fetch("/api/*****/", {
      //     body: JSON.stringify(formData),
      //     method: "POST",
      //   });
      //  setData(await res.json())
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <h1
        style={poppins.style}
        className="my-8 text-center text-lg font-bold text-main md:text-3xl"
      >
        Download Admit Card
      </h1>
      <AdmitCard data={data} />
      <form
        className="-top-10 z-10 mx-4 my-10 w-full max-w-2xl rounded px-4 py-8 text-black shadow-lg md:mx-10 md:px-6"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <Input
          type="number"
          id="cnic"
          placeholder="CNIC or B-Form Number"
          required={true}
          register={register}
          errors={errors}
        />
        <Input
          type="number"
          id="phoneNumber"
          placeholder="Phone Number"
          required={true}
          register={register}
          errors={errors}
        />
        <Input
          type="email"
          id="email"
          placeholder="Email"
          required={true}
          register={register}
          errors={errors}
        />
        <button
          type="submit"
          style={poppins.style}
          disabled={loading}
          className="text mt-5 w-52 bg-sub py-4 text-center text-base font-semibold tracking-widest text-white transition-all hover:translate-y-1 disabled:opacity-60 disabled:hover:cursor-not-allowed sm:w-full sm:py-3 sm:text-sm"
        >
          {loading ? <Loader width="w-4" height="h-4" /> : "GET CARD"}
        </button>
      </form>
    </main>
  );
}
