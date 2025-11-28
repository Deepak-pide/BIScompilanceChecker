"use server";

import {
  type GenerateComplianceReportOutput,
} from "@/ai/flows/generate-compliance-report";
import { getStandardByCode, standards } from "@/lib/standards";
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

function generateDummyReport(productName: string, description: string): GenerateComplianceReportOutput {
  
  const productKeywords: {[key: string]: string} = {
    "helmet": "IS 4151",
    "charger": "IS 13252",
    "toy": "IS 9873",
    "cement": "IS 269",
    "water": "IS 14543",
    "led": "IS 16018",
  };
  
  const lowerCaseName = productName.toLowerCase();
  let standardCode = standards[0].code; // Default to first standard

  for (const keyword in productKeywords) {
    if (lowerCaseName.includes(keyword)) {
      standardCode = productKeywords[keyword];
      break;
    }
  }

  const standard = getStandardByCode(standardCode) || standards[0];
  
  const totalRules = standard.rules.length;
  // Make pass/fail count somewhat dependent on description length
  const passedRules = Math.min(totalRules, Math.floor(description.length / 30));
  const failedRules = totalRules - passedRules;
  const complianceScore = Math.round((passedRules / totalRules) * 100);

  const missingRequirements = standard.rules.slice(passedRules);

  return {
    report: {
      standardCode: standard.code,
      productCategory: standard.category,
      totalRules,
      passedRules,
      failedRules,
      complianceScore,
      missingRequirements,
    },
  };
}


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
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    const report = generateDummyReport(validatedFields.data.productName, validatedFields.data.description);
    return { report };
  } catch (e) {
    console.error(e);
    const errorMessage =
      e instanceof Error ? e.message : "An unknown error occurred.";
    return { error: `Failed to generate report: ${errorMessage}` };
  }
}
