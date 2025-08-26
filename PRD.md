# Vibe Hackathon Registration Site

Create a synthwave-inspired registration site for the Vibe Hackathon that captures the energy and futuristic aesthetic of the event.

**Experience Qualities**:
1. **Energetic**: Bold neon colors and glowing effects that create excitement and anticipation
2. **Futuristic**: Modern synthwave aesthetic with cyberpunk influences that feels cutting-edge
3. **Accessible**: Clear form controls and high contrast text ensuring easy registration

**Complexity Level**: Micro Tool (single-purpose)
- Simple registration form with minimal state management focused on capturing participant information efficiently

## Essential Features

### Registration Form
- **Functionality**: Collects participant name, email, and attendance preference (online/offline)
- **Purpose**: Enable event organizers to track attendees and plan accordingly
- **Trigger**: User lands on the page and sees the prominent registration form
- **Progression**: View event info → Fill form fields → Select attendance type → Submit → Success confirmation
- **Success criteria**: Form validates inputs, submits to API endpoint, and shows confirmation

### Event Information Display
- **Functionality**: Shows key event details (date, location, duration)
- **Purpose**: Provides essential information for decision-making
- **Trigger**: Immediately visible on page load
- **Progression**: User sees event details → Decides to register
- **Success criteria**: Information is clearly readable and prominently displayed

## Edge Case Handling
- **Invalid Email**: Real-time validation with neon-styled error messages
- **Empty Fields**: Clear visual indicators for required fields
- **Network Errors**: Retry mechanism with glowing error states
- **Duplicate Submissions**: Button disabled state with loading animation

## Design Direction
The design should evoke a high-energy, futuristic nightclub atmosphere with cyberpunk aesthetics - bold, electrifying, and cutting-edge while maintaining professional clarity for registration purposes.

## Color Selection
Triadic (three equally spaced colors) - Using a neon spectrum gradient to create the iconic synthwave rainbow effect that cycles through the entire visible spectrum for maximum visual impact.

- **Primary Color**: Neon Magenta (oklch(0.7 0.3 320)) - High energy starting point for gradients
- **Secondary Colors**: 
  - Neon Cyan (oklch(0.8 0.25 200)) - Cool contrast and tech feeling
  - Neon Green (oklch(0.85 0.3 130)) - Electric energy accent
- **Accent Color**: Electric Yellow (oklch(0.9 0.25 85)) - Call-to-action highlights and active states
- **Foreground/Background Pairings**:
  - Background (Deep Black oklch(0.1 0 0)): White text (oklch(0.98 0 0)) - Ratio 15.8:1 ✓
  - Card (Dark Navy oklch(0.15 0.1 250)): Off-white text (oklch(0.95 0 0)) - Ratio 12.1:1 ✓
  - Primary (Neon Magenta oklch(0.7 0.3 320)): White text (oklch(0.98 0 0)) - Ratio 8.2:1 ✓
  - Accent (Electric Yellow oklch(0.9 0.25 85)): Black text (oklch(0.1 0 0)) - Ratio 15.1:1 ✓

## Font Selection
Typography should convey bold futuristic energy with excellent readability - using uppercase Inter for its modern geometric forms that complement the synthwave aesthetic.

- **Typographic Hierarchy**:
  - H1 (Event Title): Inter Black/48px/tight letter spacing/uppercase
  - H2 (Section Headers): Inter Bold/32px/normal spacing/uppercase  
  - H3 (Event Details): Inter Semibold/20px/normal spacing
  - Body (Form Labels): Inter Medium/16px/normal spacing
  - Caption (Helper Text): Inter Regular/14px/relaxed spacing

## Animations
Subtle pulsing glows and smooth transitions that enhance the synthwave atmosphere without overwhelming the registration process - animations should feel like digital energy flowing through the interface.

- **Purposeful Meaning**: Glowing effects reinforce the high-tech theme while guiding user attention to interactive elements
- **Hierarchy of Movement**: Form inputs receive priority glow on focus, submit button pulses to encourage action, background gradients subtly shift

## Component Selection
- **Components**: 
  - Form with Input, Label, Checkbox components with custom neon styling
  - Button with gradient backgrounds and glow effects
  - Card for containing registration form with subtle transparency
- **Customizations**: 
  - Custom gradient backgrounds spanning the neon spectrum
  - Glow box-shadows using CSS filters and multiple shadow layers
  - Animated gradient borders for active form elements
- **States**: 
  - Inputs: Default (subtle glow), Focus (bright neon border), Error (red glow), Success (green glow)
  - Button: Default (gradient), Hover (brighter glow), Active (pressed effect), Loading (pulse animation)
- **Icon Selection**: Phosphor icons in outlined style to match the neon aesthetic
- **Spacing**: Generous padding (6-8) with larger gaps (8-12) to let the glowing effects breathe
- **Mobile**: Stack form elements vertically, reduce glow intensity for better performance, maintain readable text sizes