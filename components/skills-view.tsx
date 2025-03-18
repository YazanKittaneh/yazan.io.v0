import { BarChart3, Code, Database, FileCode2, Layers, Palette, Server } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const skillCategories = [
  {
    name: "Frontend",
    icon: <Palette className="h-5 w-5" />,
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "HTML/CSS", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    name: "Backend",
    icon: <Server className="h-5 w-5" />,
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "Python", level: 75 },
      { name: "Django", level: 70 },
      { name: "RESTful APIs", level: 85 },
      { name: "GraphQL", level: 75 },
    ],
  },
  {
    name: "Database",
    icon: <Database className="h-5 w-5" />,
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "MySQL", level: 75 },
      { name: "Firebase", level: 80 },
      { name: "Redis", level: 70 },
    ],
  },
  {
    name: "DevOps",
    icon: <Layers className="h-5 w-5" />,
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 75 },
      { name: "CI/CD", level: 70 },
      { name: "AWS", level: 65 },
      { name: "Vercel", level: 85 },
    ],
  },
]

export default function SkillsView() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-normal tracking-tight text-foreground/90">Skills & Technologies</h2>
        <p className="text-muted-foreground">An overview of my technical skills and proficiency levels</p>
      </div>

      <Tabs defaultValue="frontend" className="space-y-6">
        <TabsList className="bg-secondary/30 p-0.5">
          {skillCategories.map((category) => (
            <TabsTrigger
              key={category.name}
              value={category.name.toLowerCase()}
              className="font-normal data-[state=active]:bg-background data-[state=active]:shadow-none transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                {category.icon}
                <span>{category.name}</span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {skillCategories.map((category) => (
          <TabsContent
            key={category.name}
            value={category.name.toLowerCase()}
            className="space-y-6 animate-in fade-in-50 duration-300"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {category.skills.map((skill) => (
                <Card key={skill.name} className="border border-border/20 shadow-none hover-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-normal">{skill.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Proficiency</span>
                      <span className="font-normal">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-1 mt-2 bg-secondary/30 progress-animate" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border border-border/20 shadow-none hover-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-normal">
              <Code className="h-5 w-5" />
              Languages
            </CardTitle>
            <CardDescription>Programming languages I work with</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>JavaScript/TypeScript</span>
                <span className="text-sm text-muted-foreground">Expert</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Python</span>
                <span className="text-sm text-muted-foreground">Advanced</span>
              </li>
              <li className="flex items-center justify-between">
                <span>PHP</span>
                <span className="text-sm text-muted-foreground">Intermediate</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Java</span>
                <span className="text-sm text-muted-foreground">Intermediate</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Go</span>
                <span className="text-sm text-muted-foreground">Beginner</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border border-border/20 shadow-none hover-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-normal">
              <FileCode2 className="h-5 w-5" />
              Frameworks
            </CardTitle>
            <CardDescription>Frameworks and libraries I use</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>React/Next.js</span>
                <span className="text-sm text-muted-foreground">Expert</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Express.js</span>
                <span className="text-sm text-muted-foreground">Advanced</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Django</span>
                <span className="text-sm text-muted-foreground">Intermediate</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Vue.js</span>
                <span className="text-sm text-muted-foreground">Intermediate</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Laravel</span>
                <span className="text-sm text-muted-foreground">Beginner</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border border-border/20 shadow-none hover-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-normal">
              <BarChart3 className="h-5 w-5" />
              Tools
            </CardTitle>
            <CardDescription>Development tools I'm proficient with</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>Git/GitHub</span>
                <span className="text-sm text-muted-foreground">Expert</span>
              </li>
              <li className="flex items-center justify-between">
                <span>VS Code</span>
                <span className="text-sm text-muted-foreground">Expert</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Docker</span>
                <span className="text-sm text-muted-foreground">Advanced</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Figma</span>
                <span className="text-sm text-muted-foreground">Intermediate</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Postman</span>
                <span className="text-sm text-muted-foreground">Advanced</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

