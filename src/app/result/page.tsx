"use client";
import { Input, Loader } from "@/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { regNoRequirementsSchema } from "@/lib/yupValidation";
import { IResult, IResultRequirements } from "@/types";
import { Poppins } from "next/font/google";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const poppins = Poppins({
  weight: ["300", "400", "500", "800", "900"],
  subsets: ["latin"],
});

export default function Page() {
  const toast = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<IResult>();
  const [occupiedErr, setOccupiedErr] = useState({ regNo: "" });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IResultRequirements>({
    mode: "onTouched",
    resolver: yupResolver(regNoRequirementsSchema),
  });

  const onFormSubmit = async (formData: IResultRequirements) => {
    try {
      setLoading(true);

      const response = await fetch("/api/getresult", {
        body: JSON.stringify({ id: Number(formData.regNo) }),
        method: "POST",
      });

      const res = (await response.json()) as IResult;
      console.log("res ", res);
      if (!response.ok) throw new Error(res.message);

      setData(res);
    } catch (err: any) {
      toast({
        title: `${err.message || "Unknown Error"}`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });

      setData(undefined);

      if (err.message == "User with this id not found!") {
        setOccupiedErr({ regNo: "No Results with this Reg. Number exists!" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <h1
        style={poppins.style}
        className="my-8 text-center text-lg font-bold text-main print:hidden md:text-3xl"
      >
        Grand Entrance Exam Result
      </h1>

      <form
        className="-top-10 z-10 mx-4 my-10 mt-0 w-full max-w-2xl rounded px-4 py-8 text-black shadow-lg sm:mt-10 md:mx-10 md:px-6"
        onSubmit={handleSubmit(onFormSubmit)}
        noValidate
      >
        <Input
          type="tel"
          id="regNo"
          placeholder="Registration Number"
          required={true}
          register={register}
          errors={errors}
          occupiedErr={occupiedErr}
          setOccupiedErr={setOccupiedErr}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            style={poppins.style}
            disabled={loading}
            className="mt-5 w-full bg-main py-3 text-center text-sm font-semibold tracking-widest text-white transition-all hover:translate-y-1 disabled:opacity-60 disabled:hover:cursor-not-allowed sm:w-52 sm:py-4 sm:text-base"
          >
            {loading ? <Loader width="w-4" height="h-4" /> : "GET RESULT"}
          </button>
        </div>
      </form>

      {data && (
        <div
          className={`text-center text-2xl font-bold sm:text-4xl ${
            data?.status == "Eligible for Online"
              ? "text-orange-800"
              : "text-green-600"
          }`}
        >
          <p>
            {/* Dear {data?.name}, */}
            You are {data.status ? data.status : "No Result found"}
          </p>
        </div>
      )}
    </main>
  );
}
