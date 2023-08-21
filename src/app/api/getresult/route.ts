import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/drizzle";
import { eq, and } from "drizzle-orm";
import { UsersTable } from "@/lib/schema/users";
import { EntranceResultTable } from "@/lib/schema/entrance_exam_result";

export async function POST(request: NextRequest) {
  const { id, cnic } = await request.json();

  const convertIdToNumber = Number(id);
  const convertCNICToNumber = Number(cnic);

  if (!convertIdToNumber) {
    throw new Error("Please enter your reg ID!");
  }

  if (!convertCNICToNumber) {
    throw new Error("Please enter your cnic!");
  }

  try {
    //applicants
    const applicants = await db
      .select()
      .from(UsersTable)
      .where(
        and(
          eq(UsersTable.id, convertIdToNumber),
          eq(UsersTable.cnic, convertCNICToNumber)
        )
      );

    if (!applicants || applicants.length === 0) {
      throw new Error("This Student does not exist.");
    }

    const applicant = applicants[0];

    const getResults = await db
      .select()
      .from(EntranceResultTable)
      .where(eq(EntranceResultTable.id, convertIdToNumber));

    if (!getResults || getResults.length === 0) {
      throw new Error("This student did not attempt the exam.");
    }

    const getResult = getResults[0];

    return NextResponse.json({
      status: getResult.status,
      id: getResult.id,
      exam_date: getResult.exam_date,
      name: applicant.fullName,
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
