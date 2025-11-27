import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Search, Book, FileText, Info } from "lucide-react";

const options = [
  {
    title: "Check Product Compliance",
    href: "/check-compliance",
    icon: Search,
    description: "Analyze your product against BIS standards using AI.",
  },
  {
    title: "Search BIS Standard",
    href: "/search-standard",
    icon: Book,
    description: "Find and explore specific BIS standards.",
  },
  {
    title: "Saved Reports",
    href: "/saved-reports",
    icon: FileText,
    description: "Access your previously generated compliance reports.",
  },
  {
    title: "About BIS Standards",
    href: "/about",
    icon: Info,
    description: "Learn more about the Bureau of Indian Standards.",
  },
];

export default function HomePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Welcome to BIS Smart Checker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((option) => (
          <Link href={option.href} key={option.title} className="group">
            <Card className="h-full hover:border-primary hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <option.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{option.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{option.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
