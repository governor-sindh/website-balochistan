import {
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
    uniqueIndex,
    date,
    numeric,
    integer,
    boolean,
    index,
  } from "drizzle-orm/pg-core";
  import { InferModel, desc } from "drizzle-orm";
  
  export const EntranceResultTable = pgTable(
    "entrance_exam_result",
    {
      id: serial("id").primaryKey().notNull(),
      status: text("status").notNull(),
      exam_date: date("exam_date"),
    }
  );
  
  export type Result = InferModel<typeof EntranceResultTable>;
  export type NewResult = InferModel<typeof EntranceResultTable, "insert">;
  