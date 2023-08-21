import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { otpCodes } from "@/lib/schema/otpCodes";
import { eq } from "drizzle-orm";
import sgMail from "@sendgrid/mail";
import { createConnection } from "../nodeMailer";
import { officialEmail } from "@/data/socialLinks/socialLinks";

sgMail.setApiKey(process.env.NEXT_PUBLIC_API_KEY!);

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    throw new Error("Enter your email!");
  }

  const code = Math.floor(100000 + Math.random() * 900000);

  try {
    //Old User
    const oldUsers = await db
      .select()
      .from(otpCodes)
      .where(eq(otpCodes.email, email));
    const oldUser = oldUsers[0];

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 2);

    //Updating OTP code
    if (oldUser) {
      await db
        .update(otpCodes)
        .set({ code, expiryTime: currentDate })
        .where(eq(otpCodes.email, email))
        .returning({ updatedCode: otpCodes.code });
    } else {
      await db
        .insert(otpCodes)
        .values({ email, code, expiryTime: currentDate })
        .returning();
    }

    const transporter = await createConnection();

    await transporter.sendMail({
      to: email, // Change to your recipient
      from: officialEmail, // Change to your verified sender
      subject: "Verify Email with Governers Website!",
      html: sendEmailtemplate(code), // html body
    });

    return NextResponse.json({
      message: "OTP sent successfully. Please check you email.",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

const sendEmailtemplate = (EmailCode: number) => {
  let customerEmailTemplate = `
    <div style="background-color:#ffffff"><div class="adM">
    </div><center>
	<table style="width:560px;margin:0;padding:0;font-family:Helvetica,Arial,sans-serif;border-collapse:collapse!important;height:100%!important;background-color:#ffffff" align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="m_7739369197626284510bodyTable">
		<tbody><tr>
		<td align="center" valign="top" id="m_7739369197626284510bodyCell" style="margin:0;padding:0;font-family:Helvetica,Arial,sans-serif;height:100%!important">
            <div style="background-color:#ffffff;color:#202123;padding:27px 20px 0 15px">
			<p style="text-align:left;margin:0">
            <img src="http://www.governorsindh.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.9ff76f62.png&w=96&q=75" width="560" height="168" alt="OpenAI" title="" style="width:70px;height:auto;border:0;line-height:100%;outline:none;text-decoration:none" class="CToWUd" data-bit="iit">
			</p>
			</div>
            <div style="background-color:#ffffff;color:#353740;padding:40px 20px;text-align:left;line-height:1.5">
              <h1 style="color:#202123;font-size:32px;line-height:40px;margin:0 0 20px"><span class="il">Verify</span> your email address</h1>

              <p style="font-size:16px;line-height:24px">
                Your 6 digit OTP is here for you!
              </p>
              
              <h1 style="color:#202123;font-size:28px;line-height:40px;margin:0 0 20px;letter-spacing:5px;background:#f1f1f1;padding: 5px;width: fit-content;">${EmailCode}</h1>
            </div>
			<div style="text-align:left;background:#ffffff;color:#6e6e80;padding:0 20px 20px;font-size:13px;line-height:1.4">
				<p style="margin:0">
                    This code will expire in 2 hours. If you did not make this request, please disregard this email.
				</p>
            </div>
          </td>
        </tr>
      </tbody></table>
    </center>
  <img src="https://ci4.googleusercontent.com/proxy/zjUZ7voWo-4izJF4IPREh88OrXbYowjgeMpxGSmKgzxxyqF90qq23uco48WChUjyTuVI6fh1rGs8CUD9K4bsuuGBRkaER_p9jEMt2P81di3swUBZcs9ec4Xgt-p4gG9tOk6yV6L9Gsw=s0-d-e1-ft#https://mandrillapp.com/track/open.php?u=31165340&amp;id=81e1a353e3c84ca599bac019726e6524" height="1" width="1" alt="" class="CToWUd" data-bit="iit"></div>
    `;
  return customerEmailTemplate;
};
