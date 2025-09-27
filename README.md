# Arabic Screenplay Editor

An advanced, feature-rich editor for writing, analyzing, and formatting Arabic screenplays. This tool provides proper formatting for scene headers, character names, dialogue, and action lines, along with a suite of AI-powered agents to enhance the writing process.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
  - [Basic Editing](#basic-editing)
  - [Advanced Agents](#advanced-agents)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Standard Screenplay Formatting**: Automatically formats your text into standard screenplay elements:
  - **Scene Headers**: e.g., "مشهد 1 – ليل-داخلي"
  - **Character Names**: Centered and bold.
  - **Dialogue**: Centered below the character name.
  - **Action Lines**: Right-aligned descriptive text.
  - **Parentheticals**: Italicized and centered.
  - **Transitions**: e.g., "قطع إلى"
- **Right-to-Left (RTL) Support**: Full support for Arabic text and layout.
- **Enhanced Pattern Recognition**: Sophisticated algorithms to correctly identify screenplay elements even in complex structures.
- **AI-Powered Writing Assistants**: A suite of intelligent agents to help you analyze and improve your screenplay:
  - **Analysis Agents**: Provide deep insights into character networks, dialogue forensics, thematic mining, and more.
  - **Creative Agents**: Generate scene ideas, enhance character voices, and help with world-building.
  - **Predictive & Optimization Agents**: Predict plot points, optimize tension, and analyze audience resonance.
- **Dark & Light Mode**: Switch between themes for your comfort.
- **Export & Print**: Save your work or print it directly from the editor.

## Project Structure

The project is a standard Vite + React + TypeScript application. Here's a brief overview of the key directories:

```
/
├── public/           # Static assets
├── src/
│   ├── agents/       # AI agent configurations and logic
│   ├── assets/       # Images, fonts, etc.
│   ├── components/   # React components
│   │   └── editor/   # Editor-specific components
│   ├── config/       # Application-wide configurations (e.g., agent list)
│   ├── services/     # Helper functions and services
│   ├── types/        # TypeScript type definitions
│   ├── App.tsx       # Main application component
│   └── main.tsx      # Application entry point
├── package.json      # Project dependencies and scripts
└── vite.config.ts    # Vite configuration
```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your system.

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:
    ```bash
    cd arabic-screenplay-editor
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (the port may vary).

## Usage

### Basic Editing

1.  Open the editor in your browser.
2.  Start typing or paste your Arabic screenplay text into the editor.
3.  The editor will automatically format the text as you type based on standard screenplay conventions.
4.  Use the toolbar to apply formatting, search, replace, and access other tools.
5.  Use the sidebar to change fonts, see document statistics, and use quick-add buttons.

### Advanced Agents

1.  Click on **أدوات (Tools)** in the header menu.
2.  Select **الوكلاء المتقدمة (Advanced Agents)**.
3.  In the popup, you can browse available agents for analysis, creative generation, and more.
4.  Select an agent and click **تشغيل التحليل (Run Analysis)**.
5.  The results will appear in the "نتائج التحليل (Analysis Results)" tab.

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to add new features, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.