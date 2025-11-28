'use client';

import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Search, Book, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const options = [
  {
    title: 'Check Product Compliance',
    href: '/check-compliance',
    icon: Search,
    description: 'Analyze your product against BIS standards using AI.',
  },
  {
    title: 'Search BIS Standard',
    href: '/search-standard',
    icon: Book,
    description: 'Find and explore specific BIS standards.',
  },
  {
    title: 'About BIS Standards',
    href: '/about',
    icon: Info,
    description: 'Learn more about the Bureau of Indian Standards.',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center p-4 w-full">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Welcome to BIS Smart Checker
          </h1>
          <div className="space-y-4">
            {options.map(option => (
              <Button
                key={option.title}
                asChild
                variant="outline"
                className="w-full justify-start h-auto py-4 px-6 text-left"
              >
                <Link href={option.href}>
                  <option.icon className="w-6 h-6 mr-4 text-primary" />
                  <span className="font-semibold">{option.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="mt-8 text-2xl font-bold">
        <span style={{ color: 'hsl(var(--primary))' }}>Hack</span>
        <span style={{ color: 'hsl(var(--accent))' }}>Hustlers</span>
      </div>
    </div>
  );
}
