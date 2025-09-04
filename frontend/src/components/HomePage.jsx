import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Headphones, BarChart3, Users, Clock, Shield, PlayCircle, TrendingUp, Star } from "lucide-react"
import Contributors from "./Contributors"

export default function HomePage() {
  const features = [
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Realistic Call Scenarios",
      description:
        "Practice with authentic emergency situations including medical, fire, and police dispatch scenarios.",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Voice-Based Training",
      description:
        "Experience real-time voice interactions that simulate actual emergency calls with professional audio quality.",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Performance Analytics",
      description:
        "Get detailed reports on response time, protocol adherence, and areas for improvement after each simulation.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Multi-Scenario Training",
      description:
        "Choose from various emergency types or let the system generate random scenarios to test your adaptability.",
    },
  ]

  const stats = [
    { label: "Training Scenarios", value: "500+", icon: <PlayCircle className="h-5 w-5" /> },
    { label: "Active Dispatchers", value: "2,500+", icon: <Users className="h-5 w-5" /> },
    { label: "Avg. Improvement", value: "35%", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Response Time", value: "<2s", icon: <Clock className="h-5 w-5" /> },
  ]

  const sponsors = [
    {
      name: "MediHack",
      logo: "/medihack.jpg",
    },
    {
      name: "Laerdal Medical",
      logo: "/laerdal.png",
    }
  ]

  const contributors = [
    {
      name: "Fahad Abbas",
      role: "Lead Emergency Dispatcher",
      avatar: "/fahad.jpg",
      experience: "15+ years",
    },
    {
      name: "Michael Chen",
      role: "Training Coordinator",
      avatar: "/professional-man-training-coordinator-headshot.jpg",
      experience: "12+ years",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Emergency Medicine Specialist",
      avatar: "/professional-woman-doctor-headshot.png",
      experience: "20+ years",
    },
    {
      name: "Captain James Wilson",
      role: "Fire Department Chief",
      avatar: "/professional-fire-chief-headshot.jpg",
      experience: "18+ years",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      {/* Hero Section */}
      <div className=" h-screen  relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-900/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2 text-sm font-medium">
              <Shield className="h-4 w-4 mr-2" />
              Professional Emergency Training Platform
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Master Emergency
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent block">
                Dispatch Skills
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Train with realistic emergency scenarios, improve your response time, and become a more confident
              dispatcher through our advanced simulation platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
              >
                <PlayCircle className="h-5 w-5 mr-2" />
                Start Training Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 px-8 py-4 text-lg bg-transparent"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3 text-emerald-400">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose Our Platform?</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Experience the most comprehensive emergency dispatch training available, designed by professionals for
            professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Training Modules Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Training Modules</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Choose your training path and start improving your emergency dispatch skills today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-slate-800/80 border-emerald-500/30 backdrop-blur-sm hover:bg-slate-800/90 hover:border-emerald-400/50 transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-white">Simulation Module</CardTitle>
                <PlayCircle className="h-8 w-8 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                Practice emergency dispatch scenarios with realistic voice-based simulations. Choose from medical, fire,
                police, or random scenarios.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-emerald-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  Real-time voice interactions
                </div>
                <div className="flex items-center text-sm text-emerald-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  Multiple scenario types
                </div>
                <div className="flex items-center text-sm text-emerald-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  Adaptive difficulty levels
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold">
                Start Simulation
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/80 border-blue-500/30 backdrop-blur-sm hover:bg-slate-800/90 hover:border-blue-400/50 transition-all duration-300 group">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-white">Feedback Module</CardTitle>
                <BarChart3 className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300 leading-relaxed">
                Review detailed performance analytics and get personalized feedback to improve your dispatch skills and
                response times.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-blue-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Detailed performance metrics
                </div>
                <div className="flex items-center text-sm text-blue-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Protocol adherence tracking
                </div>
                <div className="flex items-center text-sm text-blue-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Improvement recommendations
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-500/10 font-semibold bg-transparent"
              >
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

     

      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Built by Industry Experts</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Our training platform is developed with input from experienced emergency professionals
          </p>
        </div>

       <Contributors/>
      </div>

       <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Sponsored by 
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {sponsors.map((sponsor, index) => (
            <div key={index} className="flex flex-col items-center gap-4 group">
              <div className="relative">
                <img
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={sponsor.name}
                  className="w-20 h-20 md:w-24 object-contain md:h-24 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 opacity-80 hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <p className="text-lg text-slate-300 group-hover:text-emerald-300 transition-colors duration-300 text-center max-w-32">
                {sponsor.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <Card className="bg-slate-800/80 border-emerald-500/30 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Become a Better Dispatcher?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of emergency dispatchers who have improved their skills and confidence through our training
              platform.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
            >
              Get Started Today
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
