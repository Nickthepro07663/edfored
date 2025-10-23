import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have questions? We're here to help. Reach out to us through any of the following channels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Card className="border-border">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Email Us</h3>
              <p className="text-sm text-muted-foreground">info@edumaster.com</p>
              <p className="text-sm text-muted-foreground">support@edumaster.com</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Call Us</h3>
              <p className="text-sm text-muted-foreground">(555) 123-4567</p>
              <p className="text-sm text-muted-foreground">(555) 987-6543</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Visit Us</h3>
              <p className="text-sm text-muted-foreground">123 Education Street</p>
              <p className="text-sm text-muted-foreground">Learning City, LC 12345</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Office Hours</h3>
              <p className="text-sm text-muted-foreground">Mon-Fri: 9am - 8pm</p>
              <p className="text-sm text-muted-foreground">Sat-Sun: 10am - 6pm</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
