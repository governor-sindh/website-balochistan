import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { eq, or, and } from "drizzle-orm";
import { UsersTable, NewUser } from "@/lib/schema/users";
import { NextApiResponse } from "next";
import type { IApplyForm } from "@/types";
import { formCities, formQualifications } from "@/data";
import { createConnection } from "../nodeMailer";
// import { sendConfirmationEmail } from "@/lib/confirmationTemplates";
import { otpCodes } from "@/lib/schema/otpCodes";
import { sendConfirmationEmail } from "@/lib/confirmationTemplates";
import { officialEmail } from "@/data/socialLinks/socialLinks";

export async function POST(request: NextRequest, res: NextApiResponse) {
  const {
    fullName,
    fatherName,
    cnic,
    phoneNumber,
    city,
    email,
    gender,
    dateOfBirth,
    highestQualification,
    otp,
  }: IApplyForm = await request.json();

  if (fullName.length < 3 || fullName.length > 1000) {
    return NextResponse.json(
      {
        message: "Invalid Full name length!",
      },
      {
        status: 500,
      }
    );
  }

  if (fatherName.length < 3 || fatherName.length > 1000) {
    return NextResponse.json(
      {
        message: "Invalid Full name length!",
      },
      {
        status: 500,
      }
    );
  }

  if (email.length > 1000) {
    return NextResponse.json(
      {
        message: "Invalid Email length!",
      },
      {
        status: 500,
      }
    );
  }

  const newForCities = [...formCities, "karachi"];
  if (!newForCities.includes(city)) {
    return NextResponse.json(
      {
        message: "Invalid City!",
      },
      {
        status: 500,
      }
    );
  }

  if (!formQualifications.includes(highestQualification)) {
    return NextResponse.json(
      {
        message: "Invalid Qualification!",
      },
      {
        status: 500,
      }
    );
  }

  if (phoneNumber.toString().length !== 12) {
    return NextResponse.json(
      {
        message: "Invalid phone number length!",
      },
      {
        status: 500,
      }
    );
  }

  if (cnic.toString().length !== 13) {
    return NextResponse.json(
      {
        message: "Invalid cnic length!",
      },
      {
        status: 500,
      }
    );
  }

  if (gender !== "female" && gender !== "male") {
    return NextResponse.json(
      {
        message: "Invalid Gender",
      },
      {
        status: 500,
      }
    );
  }

  if (
    !fullName ||
    !email ||
    !phoneNumber ||
    !cnic ||
    !city ||
    !gender ||
    !highestQualification ||
    !dateOfBirth ||
    !otp
  ) {
    return NextResponse.json(
      { message: "Fields are empty!" },
      {
        status: 404,
      }
    );
  }

  const appliedUser: NewUser = {
    fullName,
    fatherName,
    cnic,
    phoneNumber,
    city,
    email,
    gender,
    dateOfBirth,
    highestQualification,
  };

  try {
    const oldUsers = await db
      .select()
      .from(UsersTable)
      .where(
        or(
          eq(UsersTable.email, email),
          eq(UsersTable.cnic, cnic),
          eq(UsersTable.phoneNumber, phoneNumber)
        )
      );
    if (!oldUsers) {
      throw new Error("Internal Server Error");
    }
    const oldUser = oldUsers[0];
    if (!!oldUser && oldUser.email == email) {
      throw new Error("An application with this email already exists.");
    } else if (!!oldUser && oldUser.cnic == cnic) {
      throw new Error("An application with this CNIC already exists.");
    } else if (!!oldUser && oldUser.phoneNumber == phoneNumber) {
      throw new Error("An application with this Phone number already exists.");
    }

    ///Commenting out otp code until email is working fine
    const otpUsers = await db
      .select()
      .from(otpCodes)
      .where(and(eq(otpCodes.email, email), eq(otpCodes.code, otp)));

    if (!otpUsers) {
      throw new Error("Internal Server Error");
    }
    const otpUser = otpUsers[0];

    if (!otpUser) {
      throw new Error("Incorrect OTP Entered!");
    }

    const userTime = otpUser.expiryTime;
    const expiryTime = userTime.getTime();

    const currentDate = new Date();
    const currentTime = currentDate.getTime();

    if (expiryTime > currentTime) {
      const users = await db.insert(UsersTable).values(appliedUser).returning();
      const user = users[0];
      const transporter = await createConnection();

      try {
        await transporter.sendMail({
          to: email, // Change to your recipient
          from: officialEmail, // Change to your verified sender
          subject:
            "Thank you for expressing your interest in the Governor’s Initiative for AI, Web 3.0 & Metaverse Program!",
          html: sendConfirmationEmail(fullName, `${user.id}`.padStart(8, "0")), // html body
        });
      } catch (error) {
        console.log("error ", error);
      }

      return NextResponse.json({
        message: "Applied Successfully",
        users,
      });
    } else {
      throw new Error("OTP expired. Please click on SEND OTP button.");
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
