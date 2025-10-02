# Modern Swiper Slider Card Component

A highly customizable and modern swiper slider card component built with Angular 20 and Keen Slider.

## 🚀 Features

### Enhanced UI/UX
- **Modern Design**: Clean, gradient-based design with smooth animations
- **Responsive Layout**: Optimized for all screen sizes (desktop, tablet, mobile)
- **Smooth Transitions**: CSS transitions with cubic-bezier timing functions
- **Hover Effects**: Interactive hover states with elevation and scaling
- **Gradient Accents**: Beautiful gradient colors for active states and buttons

### Navigation Features
- **Arrow Navigation**: Circular buttons with hover effects and disabled states
- **Dot Indicators**: Animated dots with pulse effects for active state
- **Progress Bar**: Visual progress indicator showing slide position
- **Auto Play**: Automatic sliding with configurable intervals
- **Drag Support**: Touch and mouse drag support
- **Keyboard Navigation**: Accessible keyboard controls

### Advanced Functionality
- **Auto Play Control**: Pause on hover, resume on leave
- **Breakpoint Configuration**: Responsive slides per view configuration
- **Empty State**: Graceful handling when no data is available
- **Accessibility**: ARIA labels and keyboard navigation support
- **Dark Mode**: Automatic dark mode support

## 📋 Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `swiperData` | `CardInfo[]` | `[]` | Array of card data to display |
| `title` | `string` | `''` | Section title |
| `isShowBtn` | `boolean` | `false` | Show navigation buttons |
| `autoPlay` | `boolean` | `true` | Enable auto-play functionality |
| `autoPlayInterval` | `number` | `4000` | Auto-play interval in milliseconds |
| `showProgress` | `boolean` | `true` | Show progress bar |

## 🎨 Styling Features

### Card Component
- **Gradient Header**: Top accent bar with gradient
- **Image Hover Effects**: Scale and overlay effects
- **Modern Shadows**: Soft shadows with elevation on hover
- **Border Radius**: Rounded corners (16px)
- **Typography**: Clean, readable fonts with proper hierarchy

### Slider Component
- **Fade Edges**: Gradient overlays on slider edges
- **Active Slide Scaling**: Slight scale effect for active slide
- **Smooth Animations**: CSS transitions and keyframe animations
- **Responsive Spacing**: Adaptive padding and margins

### Navigation Elements
- **Circular Arrows**: 48px circular buttons with shadows
- **Animated Dots**: Pulse animation for active dots
- **Progress Bar**: Gradient progress indicator
- **Hover States**: Interactive feedback for all controls

## 📱 Responsive Breakpoints

| Breakpoint | Slides Per View | Spacing |
|------------|-----------------|---------|
| > 1400px | 4 | 20px |
| 1024px - 1400px | 3 | 15px |
| 768px - 1024px | 2 | 15px |
| 480px - 768px | 1 | 10px |
| < 480px | 1 | 8px |

## 🎯 Usage Example

```html
<app-swiper-slider-card
  [swiperData]="cardData"
  [title]="'Featured Services'"
  [autoPlay]="true"
  [autoPlayInterval]="5000"
  [showProgress]="true">
</app-swiper-slider-card>
```

## 🔧 Customization

### CSS Custom Properties
The component uses modern CSS with:
- CSS Grid and Flexbox
- CSS Custom Properties (variables)
- CSS Transitions and Animations
- Media Queries for responsiveness

### Color Scheme
- Primary Gradient: `#667eea` to `#764ba2`
- Secondary Colors: Modern grayscale palette
- Success: `#38a169` (green)
- Warning: `#f6ad55` (orange)
- Error: `#e53e3e` (red)

## ♿ Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Tab navigation and arrow key support
- **Focus Indicators**: Clear focus states for interactive elements
- **Semantic HTML**: Proper HTML structure and semantics

## 🌙 Dark Mode Support

Automatic dark mode detection using `prefers-color-scheme` media query with appropriate color adjustments.

## 📄 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🛠️ Development

### Prerequisites
- Angular 20+
- Keen Slider library
- Modern CSS support

### Building
```bash
npm run build
```

### Development Server
```bash
npm start
```

## 📝 Notes

- The component automatically handles empty states
- Auto-play pauses on hover and during drag interactions
- Responsive design adapts to different screen sizes
- Modern CSS features ensure smooth performance
- Accessibility features make it usable for all users

## 🔄 Updates

### Version 1.0.0
- Initial modern design implementation
- Auto-play functionality
- Responsive breakpoints
- Accessibility features
- Dark mode support
