import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"
import { Card, CardContent } from "@/components/ui/card"
import { Award } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us & Our Tutors - EDforED",
  description:
    "Learn about EDforED's rigorous tutor selection process and meet our experienced tutoring and marketing teams.",
}

const tutors = [
  // Add your actual tutor data here - this is placeholder structure
  {
    name: "Tutor Name 1",
    image: "/tutor-1.jpg",
    achievements: ["Achievement 1", "Achievement 2", "Achievement 3"],
  },
  {
    name: "Tutor Name 2",
    image: "/tutor-2.jpg",
    achievements: ["Achievement 1", "Achievement 2"],
  },
  // Add more tutors as needed
]

const marketingTeam = [
  // Add your actual marketing team data here
  {
    name: "Marketing Member 1",
    image: "/marketing-1.jpg",
  },
  {
    name: "Marketing Member 2",
    image: "/marketing-2.jpg",
  },
  // Add more team members as needed
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-20">
        {/* About Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                About <span className="text-primary">EDforED</span>
              </h1>
            </div>

            {/* Tutors Section */}
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Tutors</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                  We have a rigorous selection process for our tutors. In order to be accepted, students must fill out
                  an application form and submit transcripts that show they are in all honors classes along with having
                  a minimum of an A average. Furthermore, we require a list of achievements that each person has and a
                  list of teaching experiences. Unless recommended by a tutor, applicants must have a series of
                  interviews with our hiring team. As of now, we have tutors in 8 different towns throughout Bergen
                  County and 21 Members.
                </p>
              </div>

              {/* Original Six Members Image */}
              <div className="mb-16">
                <div className="rounded-2xl overflow-hidden max-w-3xl mx-auto">
                  <img
                    src="/original-six-members.jpg"
                    alt="Original Six EDforED Members"
                    className="w-full h-auto object-cover"
                  />
                  <p className="text-center mt-4 text-sm text-muted-foreground">Original Six Members</p>
                </div>
              </div>

              {/* Tutor Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {tutors.map((tutor, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                      <img
                        src={tutor.image || "/placeholder.svg"}
                        alt={tutor.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="pt-6">
                      <h3 className="text-xl font-bold mb-4">{tutor.name}</h3>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-muted-foreground mb-2">Achievements:</p>
                        {tutor.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Marketing Team Section */}
              <div className="mt-24">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Marketing Team</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                    Our marketing team is made up of talented individuals with years of experience in their fields. Each
                    member was chosen after seeing several past works along with their achievements. Videos created by
                    EDforED Tutoring Video Team & Yash SR Media Group.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {marketingTeam.map((member, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow text-center">
                      <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-bold">{member.name}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
