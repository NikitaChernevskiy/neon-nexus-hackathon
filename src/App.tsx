import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, MapPin, Clock, Zap, Confetti, CheckCircle } from "@phosphor-icons/react"
import { toast } from "sonner"

interface FormData {
  name: string
  email: string
  isOnline: boolean
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    isOnline: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please fill in all required fields")
      return
    }

    if (!formData.email.includes('@')) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('https://SAMPLE.URL/IWILLREPLACEITLATER', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setIsSubmitted(true)
        setShowSuccessAnimation(true)
        toast.success("Registration successful! See you at the hackathon!")
      } else {
        toast.error("Registration failed. Please try again.")
      }
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Trigger confetti animation after success state renders
  useEffect(() => {
    if (showSuccessAnimation) {
      const timer = setTimeout(() => {
        setShowSuccessAnimation(false)
      }, 3000) // Animation duration
      return () => clearTimeout(timer)
    }
  }, [showSuccessAnimation])

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        {/* Confetti Animation Background */}
        {showSuccessAnimation && (
          <div className="fixed inset-0 pointer-events-none z-10">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti-particle absolute"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}
        
        {/* Success celebration particles */}
        {showSuccessAnimation && (
          <div className="fixed inset-0 pointer-events-none z-10">
            {[...Array(8)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="success-star absolute"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        )}

        <Card className={`w-full max-w-md neon-border-active neon-glow-cyan bg-card/90 backdrop-blur-sm relative z-20 ${
          showSuccessAnimation ? 'success-bounce' : ''
        }`}>
          <CardContent className="p-8 text-center">
            <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center neon-glow relative ${
              showSuccessAnimation ? 'success-icon-pulse' : ''
            }`}>
              {showSuccessAnimation ? (
                <CheckCircle size={32} className="text-white success-check-animate" weight="fill" />
              ) : (
                <Zap size={32} className="text-white" weight="fill" />
              )}
              
              {/* Success ring animation */}
              {showSuccessAnimation && (
                <div className="absolute inset-0 rounded-full border-4 border-accent success-ring-expand"></div>
              )}
            </div>
            
            <h2 className={`text-2xl font-black uppercase mb-4 synthwave-text ${
              showSuccessAnimation ? 'success-text-glow' : ''
            }`}>
              You're In!
            </h2>
            
            <p className="text-card-foreground/80 mb-6">
              Welcome to Vibe Hackathon! We'll send you event details and updates to your email.
            </p>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong>September 27th</strong> • VR Portal Blagoevgrad</p>
              <p>Attending: <span className="text-accent font-semibold">{formData.isOnline ? 'Online' : 'In Person'}</span></p>
            </div>

            {/* Celebration message */}
            {showSuccessAnimation && (
              <div className="mt-6 success-message-slide">
                <div className="flex items-center justify-center space-x-2 text-accent">
                  <Confetti size={20} weight="fill" />
                  <span className="font-bold">Get ready to hack!</span>
                  <Confetti size={20} weight="fill" />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-black uppercase mb-6 synthwave-text tracking-tight">
            Vibe Hackathon
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 font-medium">
            Where creativity meets technology in a <span className="synthwave-text font-bold">synthwave</span> experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Event Info */}
          <Card className="neon-border neon-glow bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <h2 className="text-3xl font-black uppercase synthwave-text">
                Event Details
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center neon-glow">
                  <Calendar size={24} className="text-primary" weight="bold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Date</p>
                  <p className="text-xl font-bold text-card-foreground">September 27th</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center neon-glow-cyan">
                  <MapPin size={24} className="text-secondary" weight="bold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Location</p>
                  <p className="text-xl font-bold text-card-foreground">VR Portal Blagoevgrad</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center neon-glow-yellow">
                  <Clock size={24} className="text-accent-foreground" weight="bold" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">Duration</p>
                  <p className="text-xl font-bold text-card-foreground">2 Hours</p>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-lg bg-muted/50 border border-border">
                <p className="text-card-foreground/90 leading-relaxed">
                  Join us for an electrifying coding experience where innovation meets creativity. 
                  Build, hack, and vibe with fellow developers in our synthwave-inspired environment.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Registration Form */}
          <Card className="neon-border-active neon-glow bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <h2 className="text-3xl font-black uppercase synthwave-text">
                Join the Vibe
              </h2>
              <p className="text-card-foreground/70">Register now to secure your spot</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold uppercase tracking-wide text-card-foreground">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-input border-border focus:border-primary focus:ring-primary neon-border text-card-foreground placeholder:text-muted-foreground"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold uppercase tracking-wide text-card-foreground">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-input border-border focus:border-primary focus:ring-primary neon-border text-card-foreground placeholder:text-muted-foreground"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-sm font-semibold uppercase tracking-wide text-card-foreground">
                    Attendance Type
                  </Label>
                  <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/30 border border-border">
                    <Checkbox
                      id="attendance"
                      checked={formData.isOnline}
                      onCheckedChange={(checked) => handleInputChange('isOnline', !!checked)}
                      className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="attendance" className="text-card-foreground cursor-pointer">
                      I will be joining <strong>online</strong> (uncheck for in-person attendance)
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-black uppercase tracking-wide neon-gradient hover:scale-105 transition-transform duration-300 pulse-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Register Now'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App