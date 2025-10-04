import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, BookOpen, Target, Lightbulb } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
          <div className="container text-center">
            <div className="flex items-center justify-center mb-4">
              <GraduationCap className="h-12 w-12 text-blue-600 mr-3" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                About This Blog
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A digital space to share homework assignments from my coursework.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container max-w-4xl">
            <div className="grid gap-8 md:grid-cols-2">
              
              {/* Purpose Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <CardTitle>Purpose</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    This blog documents and shares my homework assignments, 
                    providing a central place for knowledge sharing and reflection on my learning.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Structure Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    <CardTitle>Structure</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    Each post represents a complete list off all my homework assignments, presented clearly for easy reading and reference.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Topics Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    <CardTitle>Topics Covered</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Cybersecurity</Badge>
                      <Badge variant="secondary">Statistics</Badge>
                      <Badge variant="secondary">Data Analysis</Badge>
                      <Badge variant="secondary">Research Methods</Badge>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      Posts focus on academic research, practical exercises, and analytical thinking across various domains.
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>

              {/* Goals Card */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                    <CardTitle>Academic Goals</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    The goal is to maintain a clear record of my learning, demonstrating research skills, critical thinking, and practical application of theoretical knowledge.
                  </CardDescription>
                </CardContent>
              </Card>

            </div>

            {/* How to Navigate */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>What to see</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Homework Assignments</h4>
                    <p className="text-muted-foreground">
                      Individual assignments with detailed solutions, case studies, or exercises reflecting course concepts.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Search</h4>
                    <p className="text-muted-foreground">
                      Use the search bar on the homepage to quickly find specific posts by title or content.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
