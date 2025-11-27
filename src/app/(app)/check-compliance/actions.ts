"use server";

import {
  generateComplianceReport,
  type GenerateComplianceReportOutput,
} from "@/ai/flows/generate-compliance-report";
import { z } from "zod";

const FormSchema = z.object({
  productName: z.string().min(3, "Product name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  fileDataUri: z.string().optional(),
});

export type FormState = {
  report?: GenerateComplianceReportOutput;
  error?: string;
  fieldErrors?: {
    productName?: string[];
    description?: string[];
  };
};

export async function checkComplianceAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    productName: formData.get("productName"),
    description: formData.get("description"),
    fileDataUri: formData.get("fileDataUri"),
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid form data.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const report = await generateComplianceReport(validatedFields.data);
    return { report };
  } catch (e) {
    console.error(e);
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Failed to generate report: ${errorMessage}` };
  }
}
