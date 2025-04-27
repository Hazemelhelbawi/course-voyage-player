# Course Video Player Platform

A modern, interactive course video player platform built with React and TypeScript. This platform provides an intuitive interface for students to watch course videos, track their progress, and access course materials.

##demo 
https://course-voyage-player.vercel.app/
## Features

- 📺 **Interactive Video Player**

  - Seamless video playback
  - Progress tracking for each video
  - Auto-play next video functionality
  - Support for multiple video sources (YouTube, direct URLs)

- 📊 **Progress Tracking**

  - Visual progress indicator
  - Automatic progress saving
  - Session-based progress tracking
  - Real-time progress updates

- 📚 **Course Materials**

  - PDF document viewer
  - Course exercise files
  - Reference materials
  - Installation guides

- 💡 **Smart Features**

  - Course overview
  - Interactive quizzes
  - Timed assessments
  - Automatic video completion marking

- 🎨 **Modern UI/UX**
  - Clean and intuitive interface
  - Responsive design
  - Progress visualization
  - Easy navigation between topics

## Tech Stack

- **Frontend Framework**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Video Player**: React Player
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/course-voyage-player.git
cd course-voyage-player
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── CoursePlayer.tsx      # Main course player component
│   ├── VideoListSidebar.tsx  # Video list and progress tracking
│   ├── PDFViewer.tsx        # PDF document viewer
│   ├── ExamDialog.tsx       # Quiz/exam component
│   ├── CommentSection.tsx   # Comments and discussions
│   ├── CourseMaterials.tsx  # Course materials section
│   └── VideoNavigation.tsx  # Video navigation controls
├── styles/
│   └── globals.css          # Global styles
└── types/
    └── index.ts             # TypeScript type definitions
```

## Usage

1. **Video Navigation**

   - Click on any video title in the sidebar to start playing
   - Progress is automatically saved
   - Videos are marked as completed when 80% watched

2. **Course Materials**

   - Access PDF documents by clicking on document icons
   - Download reference materials
   - View installation guides

3. **Progress Tracking**

   - Progress bar shows overall course completion
   - Individual videos show completion status
   - Progress is saved automatically

4. **Assessments**
   - Take quizzes through the exam dialog
   - View time limits and question counts
   - Get immediate feedback on answers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React Player for video playback functionality
- Tailwind CSS for styling
- Lucide React for icons
- All contributors who have helped shape this project
