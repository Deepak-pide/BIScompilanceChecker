'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Search, Book, Info, Save, ArrowRight } from 'lucide-react';

const options = [
  {
    title: 'Check Product Compliance',
    href: '/check-compliance',
    icon: Search,
    description: 'Analyze your product against BIS standards using our AI.',
    color: 'bg-blue-100 dark:bg-blue-900/50',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Search BIS Standards',
    href: '/search-standard',
    icon: Book,
    description: 'Find and explore specific Indian standards by code or category.',
    color: 'bg-green-100 dark:bg-green-900/50',
    iconColor: 'text-green-500',
  },
  {
    title: 'Saved Reports',
    href: '/saved-reports',
    icon: Save,
    description: 'Access your previously generated and saved compliance reports.',
    color: 'bg-yellow-100 dark:bg-yellow-900/50',
    iconColor: 'text-yellow-500',
  },
  {
    title: 'About This App',
    href: '/about',
    icon: Info,
    description: 'Learn about our mission to simplify BIS compliance for everyone.',
    color: 'bg-purple-100 dark:bg-purple-900/50',
    iconColor: 'text-purple-500',
  },
];

export default function HomePage() {
  return (
    <div className="w-full">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to BIS Smart Checker
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Your AI-powered assistant for navigating Indian standards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map(option => (
          <Link href={option.href} key={option.title} className="group">
            <Card className="h-full hover:border-primary transition-all duration-300 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${option.color}`}>
                    <option.icon className={`w-6 h-6 ${option.iconColor}`} />
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{option.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-12 text-center text-2xl font-bold">
        <span style={{ color: 'hsl(var(--primary))' }}>Hack</span>
        <span style={{ color: 'hsl(var(--accent))' }}>Hustlers</span>
      </div>
    </div>
  );
}
