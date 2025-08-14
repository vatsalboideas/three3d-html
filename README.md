# Four Seasons 3D Viewer

A clean and optimized 360° virtual tour implementation using Marzipano.js for Four Seasons venue spaces.

## Features

- **Progressive Image Loading**: Starts with low-quality images and automatically upgrades to 8K resolution
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Auto-rotating Scene List**: Scene list auto-closes after 5 seconds on desktop for better UX
- **Grouped Scene Navigation**: Corporate and wedding scenes organized in collapsible dropdown groups
- **Smart Dimensions Button**: Context-aware dimensions view access for all scene types (corporate, wedding, entry, pre-function)
- **Smooth Transitions**: Seamless scene switching with proper loading states
- **Interactive Hotspots**: Link hotspots for navigation and info hotspots for additional information
- **Touch Support**: Full touch gesture support for mobile devices
- **Fullscreen Mode**: Toggle fullscreen viewing experience

## Project Structure

```
├── index.html          # Main HTML file
├── index.js            # Clean Marzipano implementation
├── style.css           # Optimized CSS styles
├── data.js             # Scene configuration and data
├── images/             # Low-resolution preview images
│   ├── 1.webp
│   ├── 2.webp
│   ├── 3.webp
│   ├── 4.webp
│   ├── 5.webp
│   ├── back.webp
│   ├── blank.webp
│   ├── center.webp
│   ├── stage.webp
│   ├── wedding.webp
│   └── dimensions/     # Dimension view images
└── img/                # UI icons
    ├── close.png
    ├── collapse.png
    ├── expand.png
    ├── fullscreen.png
    ├── info.png
    ├── link.png
    ├── pause.png
    ├── play.png
    └── ...
```

## Scenes

### Main Venue Scenes
1. **Entry Scene** - Main entrance view
2. **Pre Function Areas 1-4** - Various pre-function spaces

### Corporate Views (Grouped Dropdown)
1. **Center View** - Central ballroom perspective
2. **Stage View** - View from the stage
3. **Back View** - Rear perspective of the venue
4. **Blank View** - Empty space view
5. **Corporate Dimensions View** - Corporate setup measurements

### Wedding Views (Grouped Dropdown)
1. **Wedding Main View** - Primary wedding setup
2. **Wedding Center View** - Central wedding perspective
3. **Wedding Stage View** - Wedding stage area
4. **Wedding Back View** - Rear wedding perspective
5. **Wedding Blank View** - Empty wedding space

### Other Dimension Views
1. **Entry Dimensions View** - Entry area dimensions
2. **Pre Entry Dimensions View** - Pre-entry measurements

## Technical Implementation

### Progressive Loading
- Low-quality WebP images load immediately for fast initial display
- High-quality 8K PNG images from AWS S3 load in background
- Seamless upgrade without interrupting user experience

### Scene Management
- Global scene tracking prevents upgrade conflicts
- Proper cleanup when switching between scenes
- Loading indicators for HD upgrades

### Mobile Optimization
- Touch-friendly hotspot sizes
- Responsive scene list behavior
- Optimized control layouts for small screens

## Dependencies

- **Marzipano.js** (v0.10.2) - 360° viewer library
- **Screenfull.js** - Fullscreen API wrapper
- **Bowser.js** - Browser detection

## Browser Support

- Modern browsers with WebGL support
- Mobile Safari and Chrome
- Desktop Chrome, Firefox, Safari, Edge

## Performance Optimizations

1. **Removed unused code** - Eliminated commented-out functions and redundant implementations
2. **Optimized CSS** - Cleaned up styles and removed unused selectors
3. **Efficient scene switching** - Proper cleanup and state management
4. **Smart loading** - Progressive image loading with cancellation support
5. **Memory management** - Proper cleanup of timeouts and event listeners

## Usage

1. Open `index.html` in a web browser
2. Use mouse/touch to navigate the 360° view
3. Click scene list toggle to switch between venues
4. Use hotspots to navigate between connected scenes
5. Toggle autorotate and fullscreen as needed

## Customization

### Adding New Scenes
1. Add scene data to `data.js` in the `scenes` array
2. Include low and high resolution image URLs
3. Define initial view parameters and hotspots
4. Add corresponding HTML list item in `index.html`

### Modifying Hotspots
- **Link Hotspots**: For navigation between scenes
- **Info Hotspots**: For displaying additional information
- Configure position using `yaw` and `pitch` values

### Styling
- Modify `style.css` for visual customization
- All colors and dimensions are easily adjustable
- Responsive breakpoints can be modified

## License

This project is optimized and cleaned up from the original Marzipano demo code.