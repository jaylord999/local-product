# Local Product Finder Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from Airbnb's local discovery interface and Google Maps' business listings for location-based product discovery.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Brand Primary: 220 85% 25% (Deep ocean blue representing Bohol's waters)
- Background Light: 0 0% 98%
- Background Dark: 220 15% 8%

**Accent Colors:**
- Success/Available: 145 65% 45% (Tropical green)
- Warning/Limited: 35 85% 55% (Warm amber)

### Typography
- **Primary Font**: Inter (Google Fonts) - clean, modern readability
- **Headings**: 600-700 weight, sizes 24px-48px
- **Body Text**: 400-500 weight, 14px-16px
- **Small Text**: 400 weight, 12px-14px

### Layout System
**Tailwind Spacing Primitives**: 2, 4, 6, 8, 12, 16
- Consistent use of p-4, m-6, gap-8 for primary layouts
- Map container: full viewport height minus header
- List cards: p-6 with m-4 spacing

### Component Library

**Navigation:**
- Fixed header with app logo, search bar, and view toggle (Map/List)
- Mobile: Hamburger menu with overlay navigation

**Map Components:**
- Interactive Leaflet map with custom store pins
- Store popup cards showing name, rating, and quick product count
- Zoom controls and current location button

**Product Cards:**
- Store cards: Image, name, distance, rating, product count
- Product cards: Thumbnail, name, price, store name, availability status
- Hover states with subtle shadow elevation

**Search & Filters:**
- Prominent search bar with category dropdown
- Price range slider with min/max inputs
- Filter chips showing active selections

**Data Display:**
- Product image galleries with thumbnail grid
- Store detail modals with full product listings
- Distance calculations prominently displayed

### Visual Treatments
**Backgrounds:**
- Subtle gradient overlays on hero sections: 220 85% 25% to 220 75% 35%
- Card backgrounds with soft shadows and rounded corners (8px)
- Map area: full-bleed with overlay UI elements

**Interactive Elements:**
- Map pins: Custom store logo with colored borders
- Buttons: Rounded corners, clear hierarchy between primary/secondary
- Cards: Hover elevation with smooth transitions

## Images
**Store Logos/Photos:**
- Square aspect ratio thumbnails (150x150px minimum)
- Product images in 4:3 aspect ratio for consistency
- Map pin icons: 32x32px store logos with circular masks

**No Large Hero Image** - The map view serves as the primary visual element, with immediate functionality taking precedence over marketing imagery.

## Key Design Principles
1. **Location-First**: Map prominence emphasizes geographic discovery
2. **Information Density**: Efficient display of store/product data without clutter
3. **Mobile Optimization**: Touch-friendly controls and readable text on mobile devices
4. **Local Context**: Visual design reflects Bohol's tropical, coastal environment through color choices