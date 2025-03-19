import { GraduationCap, Briefcase, Award, MapPin } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { resumeData } from "@/lib/data/ResumeData"

export default function AboutView() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-normal tracking-tight text-foreground/90">About Me</h2>
        <p className="text-muted-foreground">Learn more about my background, experience, and interests</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 border border-border/20 shadow-none hover-card">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <Avatar className="h-24 w-24 border-0 ring-2 ring-border/20 ring-offset-2 ring-offset-background">
                <AvatarImage src="/avatar.jpg" alt="Profile" />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {resumeData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="font-normal">{resumeData.name}</CardTitle>
            <CardDescription>{resumeData.experiences[0].title}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{resumeData.experiences[0].location}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span>{resumeData.education[0].degree}, {resumeData.education[0].institution}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{resumeData.experiences.length}+ Years Experience</span>
              </div>

              <Separator className="bg-border/20" />

              <div>
                <h4 className="mb-2 font-normal">Interests</h4>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="bg-secondary/30 border-border/20 font-normal text-xs">
                    Web Development
                  </Badge>
                  <Badge variant="outline" className="bg-secondary/30 border-border/20 font-normal text-xs">
                    UI/UX Design
                  </Badge>
                  <Badge variant="outline" className="bg-secondary/30 border-border/20 font-normal text-xs">
                    AI
                  </Badge>
                  <Badge variant="outline" className="bg-secondary/30 border-border/20 font-normal text-xs">
                    Open Source
                  </Badge>
                  <Badge variant="outline" className="bg-secondary/30 border-border/20 font-normal text-xs">
                    Photography
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border border-border/20 shadow-none hover-card">
          <CardHeader>
            <CardTitle className="font-normal">Professional Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              I'm a passionate Full Stack Developer with over 5 years of experience building web applications and
              digital experiences. I specialize in JavaScript technologies, particularly React and Node.js, and have a
              strong foundation in software architecture and design patterns.
            </p>
            <p>
              My approach combines technical expertise with a keen eye for user experience. I believe in writing clean,
              maintainable code and creating intuitive interfaces that solve real problems for users.
            </p>
            <p>
              When I'm not coding, you can find me contributing to open source projects, writing technical articles, or
              exploring the latest web technologies.
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="experience" className="space-y-6">
        <TabsList className="bg-secondary/30 p-0.5">
          <TabsTrigger
            value="experience"
            className="font-normal data-[state=active]:bg-background data-[state=active]:shadow-none transition-all duration-200"
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Experience
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="font-normal data-[state=active]:bg-background data-[state=active]:shadow-none transition-all duration-200"
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            Education
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="font-normal data-[state=active]:bg-background data-[state=active]:shadow-none transition-all duration-200"
          >
            <Award className="mr-2 h-4 w-4" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="experience" className="space-y-4 animate-in fade-in-50 duration-300">
          {resumeData.experiences.map((experience, index) => (
            <Card key={index} className="border border-border/20 shadow-none hover-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-normal">{experience.title}</CardTitle>
                    <CardDescription>{experience.company}</CardDescription>
                  </div>
                  <Badge className="font-normal text-xs bg-secondary/50 text-secondary-foreground">{experience.period}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {experience.achievements.map((achievement, idx) => (
                    <li key={idx} dangerouslySetInnerHTML={{ __html: achievement }} />
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="education" className="space-y-4 animate-in fade-in-50 duration-300">
          {resumeData.education.map((edu, index) => (
            <Card key={index} className="border border-border/20 shadow-none hover-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="font-normal">{edu.degree}</CardTitle>
                    <CardDescription>{edu.institution}</CardDescription>
                  </div>
                  <Badge className="font-normal text-xs bg-secondary/50 text-secondary-foreground">{edu.graduationDate}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>{edu.location}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4 animate-in fade-in-50 duration-300">
          <Card className="border border-border/20 shadow-none hover-card">
            <CardHeader>
              <CardTitle className="font-normal">Awards & Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-primary/70 mt-0.5" />
                  <div>
                    <p className="font-normal">Best Web Application Award</p>
                    <p className="text-sm text-muted-foreground">Regional Tech Conference, 2022</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-primary/70 mt-0.5" />
                  <div>
                    <p className="font-normal">AWS Certified Solutions Architect</p>
                    <p className="text-sm text-muted-foreground">Amazon Web Services, 2021</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Award className="h-5 w-5 text-primary/70 mt-0.5" />
                  <div>
                    <p className="font-normal">Open Source Contributor Award</p>
                    <p className="text-sm text-muted-foreground">GitHub, 2020</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

