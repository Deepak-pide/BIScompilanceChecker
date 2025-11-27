import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const aboutSections = [
  {
    title: "What is BIS?",
    content:
      "The Bureau of Indian Standards (BIS) is the National Standard Body of India established under the BIS Act 2016 for the harmonious development of the activities of standardization, marking and quality certification of goods and for matters connected therewith or incidental thereto.",
  },
  {
    title: "What is a Standard?",
    content:
      "A standard is a document that provides requirements, specifications, guidelines, or characteristics that can be used consistently to ensure that materials, products, processes, and services are fit for their purpose. BIS standards are crucial for ensuring quality, safety, and reliability.",
  },
  {
    title: "Why Certification Matters",
    content:
      "BIS certification is a means of providing third party guarantee of quality, safety and reliability of products to the customer. The certification is voluntary, but the Government of India has made it mandatory for certain products taking into consideration public health.",
  },
  {
    title: "What Our App Solves",
    content:
      "Navigating the complexities of BIS compliance can be challenging. Our app leverages AI to simplify this process, allowing manufacturers and importers to quickly assess their product's compliance, identify gaps, and understand the necessary requirements, fostering a culture of quality and safety.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">
        About BIS and Our Mission
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
