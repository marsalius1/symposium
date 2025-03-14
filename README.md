# Symposium

Symposium is a TikTok-like content app for insightful and engaging content with a unique progressive depth feature.

## Features

- **Progressive Depth Content**: Each post has 3 levels - Hook, Main, and Full
- **Intuitive Navigation**: Swipe left to go deeper into content, swipe up for the next post
- **Mixed Media Support**: Both text and video content supported at each level
- **Response System**: Users can respond to posts with text or video responses
- **Citation Support**: Responses can include citations to reference sources

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository
```
git clone https://github.com/yourusername/symposium.git
cd symposium
```

2. Install dependencies
```
npm install
```

3. Set up Firebase
   - Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Firestore and Storage services
   - Update your Firebase configuration in `src/firebase.js`

4. Start the development server
```
npm start
```

## Tech Stack

- React (Create React App)
- Firebase (Firestore and Storage)
- Tailwind CSS

## Usage

### For You Feed

- The app opens in the "For You" feed by default
- Swipe horizontally (left/right) to navigate through depth levels
- Swipe vertically (up/down) to navigate between posts
- At the "Full" level, you can view and add responses

### Creating Posts

1. Click on the "Upload" tab
2. Follow the 3-step process to create your post:
   - Hook: Create a short attention-grabbing hook (text or video)
   - Main: Expand on your idea with more details
   - Full: Add comprehensive content, sections, and references

## Project Structure

```
symposium/
├── public/
├── src/
│   ├── components/          # UI Components
│   ├── models/              # Data models
│   ├── pages/               # Page components
│   ├── services/            # Firebase services
│   ├── App.js               # Main app component
│   ├── firebase.js          # Firebase configuration
│   └── index.js             # Entry point
└── README.md
```

## Future Enhancements

- User authentication and profiles
- Content categorization and discovery
- Search functionality
- Bookmarking and collections
- Enhanced analytics

## License

This project is licensed under the MIT License - see the LICENSE file for details. 