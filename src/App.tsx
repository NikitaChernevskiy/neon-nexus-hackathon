import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, MapPin, Clock, Zap, CheckCircle, Timer, X } from "@phosphor-icons/react"
import { toast } from "sonner"

interface FormData {
  name: string
  email: string
  isOnline: boolean
}

interface FormErrors {
  name: boolean
  email: boolean
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    isOnline: false
  })
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: false,
    email: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Calculate time left until event start (September 27, 2025 4 PM Bulgarian time)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date('2025-09-27T16:00:00+03:00') // 4 PM Bulgarian time (UTC+3)
      const now = new Date()
      const difference = eventDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (field === 'name' || field === 'email') {
      setFormErrors(prev => ({
        ...prev,
        [field]: false
      }))
    }
  }

  const validateForm = () => {
    const errors: FormErrors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !formData.email.includes('@')
    }
    
    setFormErrors(errors)
    return !errors.name && !errors.email
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Please fix the errors and try again")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For production, replace with actual API call:
      // const response = await fetch('https://SAMPLE.URL/IWILLREPLACEITLATER', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData)
      // })

      // if (response.ok) {
        setShowSuccessAnimation(true)
        toast.success("Registration successful! See you at the hackathon!")
      // } else {
      //   toast.error("Registration failed. Please try again.")
      // }
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Trigger confetti animation after success state renders
  useEffect(() => {
    if (showSuccessAnimation) {
      // Remove auto-hide - popup stays open until manually closed
    }
  }, [showSuccessAnimation])

  const closeSuccessPopup = () => {
    setShowSuccessAnimation(false)
    // Reset form after closing
    setFormData({
      name: '',
      email: '',
      isOnline: false
    })
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close popup if clicked outside the card
    if (e.target === e.currentTarget) {
      closeSuccessPopup()
    }
  }



  return (
    <div className="min-h-screen p-4 space-y-12">
      {/* Header */}
      <div className="text-center pt-8">
        <h1 className="text-5xl md:text-7xl font-black uppercase mb-6 synthwave-text tracking-tight">
          Vibe Hackathon
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 font-medium">
          Where creativity meets technology in a <span className="synthwave-text font-bold">synthwave</span> experience
        </p>
      </div>

      {/* Countdown Timer - Full Width */}
      <div className="w-full">
        <h2 className="text-3xl md:text-4xl font-black uppercase synthwave-text flex items-center justify-center gap-3 mb-8">
          <Timer size={36} weight="bold" />
          Event Countdown
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 neon-border text-center">
            <div className="text-4xl md:text-6xl font-black synthwave-text mb-2">{timeLeft.days}</div>
            <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wide font-semibold">Days</div>
          </div>
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 neon-border text-center">
            <div className="text-4xl md:text-6xl font-black synthwave-text mb-2">{timeLeft.hours}</div>
            <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wide font-semibold">Hours</div>
          </div>
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 neon-border text-center">
            <div className="text-4xl md:text-6xl font-black synthwave-text mb-2">{timeLeft.minutes}</div>
            <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wide font-semibold">Minutes</div>
          </div>
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 neon-border text-center">
            <div className="text-4xl md:text-6xl font-black synthwave-text mb-2">{timeLeft.seconds}</div>
            <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wide font-semibold">Seconds</div>
          </div>
        </div>
        <div className="text-center mt-8 text-xl text-accent font-bold">
          Until September 27th, 2025 • 4:00 PM Bulgarian Time
        </div>
      </div>

      {/* Event Info - Full Width */}
      <div className="w-full max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black uppercase synthwave-text text-center mb-8">
          Event Details
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-card/40 backdrop-blur-sm rounded-2xl neon-border">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center neon-glow mb-4">
              <Calendar size={32} className="text-primary" weight="bold" />
            </div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Date</p>
            <p className="text-2xl font-bold text-card-foreground">September 27th, 2025</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-card/40 backdrop-blur-sm rounded-2xl neon-border">
            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center neon-glow-cyan mb-4">
              <MapPin size={32} className="text-secondary" weight="bold" />
            </div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Location</p>
            <p className="text-2xl font-bold text-card-foreground">VR Portal Blagoevgrad</p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-card/40 backdrop-blur-sm rounded-2xl neon-border">
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center neon-glow-yellow mb-4">
              <Clock size={32} className="text-accent" weight="bold" />
            </div>
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">Duration</p>
            <p className="text-2xl font-bold text-card-foreground">2 Hours</p>
          </div>
        </div>

        <div className="mt-8 p-8 rounded-2xl bg-card/40 backdrop-blur-sm border border-border text-center">
          <p className="text-lg text-card-foreground/90 leading-relaxed max-w-3xl mx-auto">
            Join us for an electrifying coding experience where innovation meets creativity. 
            Build, hack, and vibe with fellow developers in our synthwave-inspired environment.
          </p>
        </div>
      </div>

      {/* Registration Form - Container */}
      <div className="flex justify-center">
        <Card className="w-full max-w-4xl neon-border-active neon-glow bg-card/90 backdrop-blur-sm">
          <CardHeader>
            <h2 className="text-3xl font-black uppercase synthwave-text text-center">
              Join the Vibe
            </h2>
            <p className="text-card-foreground/70 text-center">Register now to secure your spot</p>
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
                  className={`bg-input border-border focus:border-primary focus:ring-primary text-card-foreground placeholder:text-muted-foreground ${
                    formErrors.name ? 'border-red-500 neon-border-error' : 'neon-border'
                  }`}
                  placeholder="Enter your full name"
                  required
                />
                {formErrors.name && (
                  <p className="text-red-400 text-sm font-medium">Please enter your full name</p>
                )}
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
                  className={`bg-input border-border focus:border-primary focus:ring-primary text-card-foreground placeholder:text-muted-foreground ${
                    formErrors.email ? 'border-red-500 neon-border-error' : 'neon-border'
                  }`}
                  placeholder="your@email.com"
                  required
                />
                {formErrors.email && (
                  <p className="text-red-400 text-sm font-medium">Please enter a valid email address</p>
                )}
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
                    I will attend <strong>online</strong> (leave unchecked for in-person attendance)
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

      {/* Success Popup Overlay */}
      {showSuccessAnimation && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          {/* Confetti Animation Background */}
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(60)].map((_, i) => (
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
          
          {/* Success celebration particles */}
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="success-star absolute"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${15 + Math.random() * 70}%`,
                  animationDelay: `${i * 0.15}s`
                }}
              />
            ))}
          </div>

          {/* Success Card */}
          <Card className="w-full max-w-md relative neon-border-active neon-glow-cyan bg-card/95 backdrop-blur-sm success-bounce">
            {/* Close Button */}
            <button
              onClick={closeSuccessPopup}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center transition-colors duration-200 z-10"
            >
              <X size={18} className="text-muted-foreground hover:text-foreground" weight="bold" />
            </button>
            
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center neon-glow success-icon-pulse">
                <CheckCircle size={40} className="text-white success-check-animate" weight="fill" />
                
                {/* Success ring animation */}
                <div className="absolute inset-0 rounded-full border-4 border-accent success-ring-expand"></div>
              </div>
              
              <h2 className="text-3xl font-black uppercase mb-4 synthwave-text success-text-glow">
                🎉 Registration Complete! 🎉
              </h2>
              
              <p className="text-card-foreground/90 mb-6 text-lg">
                Welcome to <span className="synthwave-text font-bold">Vibe Hackathon</span>! 
                Check your email for event details and updates.
              </p>
              
              <div className="space-y-3 text-sm bg-muted/50 rounded-lg p-4">
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Attendance:</strong> <span className="text-accent font-semibold">{formData.isOnline ? 'Online' : 'In Person'}</span></p>
              </div>

              {/* Celebration message */}
              <div className="mt-6 success-message-slide">
                <div className="flex items-center justify-center space-x-2 text-accent text-lg font-bold">
                  <Zap size={24} weight="fill" />
                  <span>Get ready to hack the future!</span>
                  <Zap size={24} weight="fill" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default App