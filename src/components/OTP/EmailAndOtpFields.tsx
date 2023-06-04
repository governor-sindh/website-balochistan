"use client";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import type { UseFormWatch } from "react-hook-form";
import { OtpTimer, Input } from "@/components";

export default function EmailAndOtpFields({
  register,
  errors,
  watch,
  occupiedErr,
  setOccupiedErr,
}: {
  register: any;
  errors: any;
  watch: UseFormWatch<any>;
  occupiedErr: { email: string; otp: string };
  setOccupiedErr: any;
}) {
  const toast = useToast();

  const [resendOtpAvailable, setResendOtpAvailable] = useState<boolean>(false);

  const sendOTP = async () => {
    const email = watch("email");
    if (errors.email || !email) return;
    setResendOtpAvailable(true);

    try {
      const response = await fetch("/api/sendotp", {
        body: JSON.stringify({ email }),
        method: "POST",
      });

      if (!response.ok) throw new Error(JSON.stringify(await response.json()));
      const res = await response.json();

      toast({
        title: `${res.message}`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (err: any) {
      err = JSON.parse(err.message);

      toast({
        title: `${err.message}`,
        status: "error",
        duration: 9000,
        isClosable: false,
      });
    }
  };
  return (
    <div>
      <div className="my-6">
        <label htmlFor="email" className="mb-6 mt-4 text-slate-700 md:text-xl">
          Email *
        </label>

        <div className="mb-2 mt-1 flex">
          <input
            type="email"
            id="email"
            className={`block h-12 w-full border border-gray-400 bg-gray-100 p-3 ${
              errors?.email || occupiedErr?.email
                ? "border-red-400 ring-red-500"
                : "focus:border-sub focus:ring-sub"
            } rounded-l outline-none focus:ring-1 md:text-xl`}
            placeholder="Email"
            {...register("email")}
            onFocus={
              !!occupiedErr?.email
                ? () => {
                    setOccupiedErr({
                      email: "",
                      otp: "",
                    });
                  }
                : () => {}
            }
          />
          <button
            type="button"
            onClick={sendOTP}
            disabled={resendOtpAvailable}
            className="w-[30%] rounded-r bg-main text-xs text-white disabled:opacity-60 disabled:hover:cursor-not-allowed xs:text-base"
          >
            {resendOtpAvailable ? (
              <>
                <span>Resend OTP</span>
                <OtpTimer
                  duration={60}
                  func={() => setResendOtpAvailable(false)}
                />
              </>
            ) : (
              <span>Send OTP</span>
            )}
          </button>
        </div>

        {(errors?.email || occupiedErr?.email) && (
          <p className="mb-4 text-red-400">{`${
            errors?.email?.message || occupiedErr?.email
          }`}</p>
        )}
      </div>

      <Input
        type="tel"
        id="otp"
        placeholder="OTP"
        required={true}
        register={register}
        errors={errors}
        occupiedErr={occupiedErr}
        setOccupiedErr={setOccupiedErr}
      />
    </div>
  );
}
