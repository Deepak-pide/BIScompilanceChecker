import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const aboutSections = [
  {
    title: "What is BIS?",
    content:
      "The Bureau of Indian Standards (BIS) is India's official team for making sure products are safe, reliable, and high-quality. Think of them as the nation's quality guardians.",
  },
  {
    title: "Our Mission",
    content:
      "Our mission is to make it simple and fast for anyone to check if a product meets the important BIS safety and quality rules. We want to help creators build and sell products that everyone can trust.",
  },
  {
    title: "How We Help",
    content:
      "Figuring out all the BIS rules can be tough. Our app uses smart AI to do the hard work. It quickly analyzes a product and tells you exactly what passes and what needs to be fixed, making compliance easy.",
  },
  {
    title: "Why It Matters",
    content:
      "When products meet BIS standards, they are safer and more dependable for you and your family. By making compliance easier, we help ensure that more high-quality products make it to the market.",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Our Mission: Simple, Smart, Safe
      </h1>
      <div className="space-y-6">
        {aboutSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle className="text-primary">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-foreground/80">{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
