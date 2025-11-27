'use server';

/**
 * @fileOverview AI flow to generate a compliance report for a given product against BIS standards.
 *
 * - generateComplianceReport - A function that handles the compliance report generation process.
 * - GenerateComplianceReportInput - The input type for the generateComplianceReport function.
 * - GenerateComplianceReportOutput - The return type for the generateComplianceReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateComplianceReportInputSchema = z.object({
  productName: z.string().describe('The name of the product to check for compliance.'),
  description: z.string().describe('A detailed description of the product, including materials, ratings, and features.'),
  fileDataUri: z
    .string()
    .optional()
    .describe(
      "An optional image or PDF of the product, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateComplianceReportInput = z.infer<typeof GenerateComplianceReportInputSchema>;

const ComplianceReportSchema = z.object({
  standardCode: z.string().describe('The relevant BIS standard code.'),
  productCategory: z.string().describe('The product category according to BIS standards.'),
  totalRules: z.number().describe('The total number of rules in the standard.'),
  passedRules: z.number().describe('The number of rules that the product passes.'),
  failedRules: z.number().describe('The number of rules that the product fails.'),
  complianceScore: z.number().describe('The overall compliance score as a percentage.'),
  missingRequirements: z.array(z.string()).describe('A list of specific requirements that the product does not meet.'),
});

const GenerateComplianceReportOutputSchema = z.object({
  report: ComplianceReportSchema.describe('The compliance report for the product.'),
});
export type GenerateComplianceReportOutput = z.infer<typeof GenerateComplianceReportOutputSchema>;

export async function generateComplianceReport(
  input: GenerateComplianceReportInput
): Promise<GenerateComplianceReportOutput> {
  return generateComplianceReportFlow(input);
}

const complianceReportPrompt = ai.definePrompt({
  name: 'complianceReportPrompt',
  input: {schema: GenerateComplianceReportInputSchema},
  output: {schema: GenerateComplianceReportOutputSchema},
  prompt: `You are an AI expert in BIS (Bureau of Indian Standards) compliance.
  Your task is to analyze a given product based on its name, description, and optional image/PDF, and determine its compliance against relevant BIS standards.

  Analyze the product details provided below:
  Product Name: {{{productName}}}
  Description: {{{description}}}
  {{#if fileDataUri}}
  Product Image/PDF: {{media url=fileDataUri}}
  {{/if}}

  Based on your analysis, generate a compliance report with the following details:
  - Standard Code: The most relevant BIS standard code for the product.
  - Product Category: The product category according to BIS standards.
  - Total Rules: The total number of rules in the standard.
  - Passed Rules: The number of rules that the product passes.
  - Failed Rules: The number of rules that the product fails.
  - Compliance Score: The overall compliance score as a percentage.
  - Missing Requirements: A list of specific requirements that the product does not meet.

  Ensure that the compliance score is calculated accurately based on the number of passed and failed rules.
  Provide clear and concise missing requirements based on the product details.
  Return the result in JSON format.
  `,
});

const generateComplianceReportFlow = ai.defineFlow(
  {
    name: 'generateComplianceReportFlow',
    inputSchema: GenerateComplianceReportInputSchema,
    outputSchema: GenerateComplianceReportOutputSchema,
  },
  async input => {
    const {output} = await complianceReportPrompt(input);
    return output!;
  }
);
