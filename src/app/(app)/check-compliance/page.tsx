import { ComplianceChecker } from "./compliance-checker";

export default function CheckCompliancePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Check Product Compliance</h1>
      <p className="text-muted-foreground mb-8">
        Enter your product's details to generate an AI-powered compliance
        report.
      </p>
      <ComplianceChecker />
    </div>
  );
}
