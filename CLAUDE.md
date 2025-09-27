# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is an Arabic Screenplay Editor built with React and TypeScript, designed specifically for writing and formatting Arabic screenplays with proper RTL text handling and screenplay-specific formatting.

### Current Structure
```
├── src/
│   ├── CleanIntegratedScreenplayEditor.tsx    # Main production component (active)
│   ├── App.tsx                                # Root application entry point
│   ├── AdvancedAgentsPopup.tsx               # AI agents interface popup
│   ├── main.tsx                              # Vite entry point
│   ├── ScreenplayEditor.tsx                  # Legacy primary component
│   ├── *test*.txt                            # Various test files for Arabic content
│   └── [multiple editor variants]            # Development/experimental versions
├── package.json                              # Dependencies and scripts
├── vite.config.ts                           # Vite build configuration
└── tsconfig.json                            # TypeScript configuration
```

### Key Architecture Points
- **Active Component**: `CleanIntegratedScreenplayEditor.tsx` is the main production component
- **Entry Point**: App.tsx imports and renders the CleanIntegratedScreenplayEditor
- **Multiple Variants**: The codebase contains several editor implementations (backup, fixed, complete versions)
- **Test-Driven**: Extensive Arabic text test files for screenplay formatting validation

## Development Environment

### Essential Commands
```bash
# Development
npm run dev          # Start dev server (localhost:5173)
npm run build        # Production build (tsc + vite build)
npm run preview      # Preview production build

# Note: Only basic commands are available - no separate lint/test commands
```

### Setup Instructions
```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Server runs on http://localhost:5173
```

## Project Architecture

### Technology Stack
- **Framework**: React 19+ with TypeScript 5.8+
- **Build Tool**: Vite 7+
- **Styling**: Tailwind CSS 4.1.13+ (utility-first)
- **Icons**: Lucide React 0.544+
- **Target**: ES2020+ browsers with strict TypeScript

### Component Architecture

#### Main Component Structure
The `CleanIntegratedScreenplayEditor.tsx` contains:

```typescript
// Production-ready system classes embedded in the component
class StateManager { /* Global state management */ }
class AutoSaveManager { /* Auto-save functionality */ }
class AdvancedSearchEngine { /* Search and replace */ }
class CollaborationSystem { /* Multi-user features */ }
class AIWritingAssistant { /* AI-powered assistance */ }
class ProjectManager { /* Project management */ }
class VisualPlanningSystem { /* Visual storyboarding */ }
class ScreenplayClassifier { /* Arabic text classification */ }

// Main React component with extensive state management
const CleanIntegratedScreenplayEditor: React.FC = () => {
  // Complex state for editor functionality
  // Real-time text processing and formatting
  // Advanced UI with dark mode, multiple menus, dialogs
};
```

#### Key Design Patterns
- **Monolithic Architecture**: Single large component with embedded utility classes
- **Real-time Processing**: Live text classification and formatting as user types
- **State Management**: React hooks with complex local state
- **Arabic-First Design**: RTL text handling and Arabic screenplay conventions

## Arabic Screenplay Processing

### Core Text Classification
The ScreenplayClassifier uses extensive Arabic patterns for real-time text classification:

```typescript
// Scene headers: "مشهد 1", "مشهد 2 – ليل-داخلي"
SCENE_HEADER: /^مشهد\s+\d+/

// Character names: Arabic text ending with colon
CHARACTER_NAME: /^[أ-ي\s]+:$/

// Time/location: "ليل-داخلي", "نهار-خارجي"
TIME_LOCATION: /^(ليل|نهار|صباح|مساء)-(داخلي|خارجي)/

// 60+ Arabic action verbs for action line detection
ACTION_VERBS: ['يدخل', 'يخرج', 'ينظر', 'يرفع', 'تبتسم', ...]
```

### Formatting Rules
- **Scene Headers**: Centered, bold, numbered (مشهد 1, مشهد 2)
- **Character Names**: Centered, bold, uppercase, ending with colon
- **Dialogue**: Centered with margins, follows character names
- **Action Lines**: Right-aligned RTL text with Arabic action verb detection
- **Transitions**: Centered, bold (قطع، ذوبان، انتقال)
- **Basmala**: Special handling for "بسم الله الرحمن الرحيم"

## Testing and Validation

### Available Test Files
The `src/` directory contains extensive Arabic text test files:
- `final-test.txt` - Complete screenplay sample
- `comprehensive-test.txt` - Edge cases and boundary conditions
- `action-line-test.txt` - Action line classification tests
- `dialogue-action-test.txt` - Mixed dialogue/action scenarios
- `basmala-test.cjs` - Node.js compatibility tests
- `test-classifier.cjs` - Classifier unit tests
- `dash-test.txt`, `context-test.txt`, etc. - Specific feature tests

### TypeScript Configuration Notes
- **Strict Mode**: Enabled with additional strict options
- **Target**: ES2020 with modern features
- **Excluded Files**: Several backup editor files are excluded from compilation
- **JSX**: React JSX transform for optimal performance

## File Organization Patterns

### Component Variants in Codebase
The repository contains multiple editor implementations:
- `CleanIntegratedScreenplayEditor.tsx` - **Production version** (actively used)
- `ScreenplayEditor.tsx` - Legacy/original implementation
- `ProductionReadyScreenplayEditor.tsx` - Alternative production version
- `IntegratedScreenplayEditor*.tsx` - Various integration attempts
- `*-backup.tsx`, `*-fixed.tsx` - Development/debug versions

**Important**: When making changes, focus on `CleanIntegratedScreenplayEditor.tsx` as it's the active component.

### Working with Arabic Text Processing
When modifying text classification logic:
1. Test changes against the existing `.txt` test files in `src/`
2. Pay attention to RTL text direction and Arabic script handling
3. Verify scene header detection for patterns like "مشهد 1 – ليل-داخلي"
4. Test character name detection (Arabic names ending with colons)
5. Validate action line detection using Arabic action verbs

## Common Development Tasks

### Adding New Screenplay Elements
1. Update the ScreenplayClassifier patterns
2. Add corresponding CSS styling in getFormatStyles()
3. Test with relevant Arabic text samples
4. Update format detection logic for real-time processing

### Debugging Classification Issues
The embedded ScreenplayClassifier uses complex pattern matching. When text isn't being classified correctly:
1. Check the Arabic regex patterns
2. Verify the action verb list includes the needed verbs
3. Test with the appropriate test files in `src/`
4. Use browser dev tools to inspect the classification logic

### Working with the Build System
- Build uses `tsc && vite build` - TypeScript compilation must pass first
- Dev server runs on localhost:5173 (configured in vite.config.ts)
- No separate linting or testing commands are configured