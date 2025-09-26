# Arabic Screenplay Editor

An enhanced editor for writing Arabic screenplays with proper formatting for scene headers, character names, dialogue, and action lines.

## Features

- Proper formatting of Arabic scene headers with time and location information
- Correct identification of character lines (centered and bold)
- Proper formatting of dialogue (centered)
- Action lines formatted right-aligned
- Support for Arabic text with correct RTL (right-to-left) handling
- Enhanced pattern recognition for complex Arabic screenplay structures

## Enhanced Pattern Recognition

This version includes significant improvements to handle complex Arabic screenplay structures:

1. **Expanded Action Verb List**: 60+ Arabic verbs for better action line detection
2. **Improved Scene Header Processing**: Better handling of complex headers like "مشهد 1 – ليل-داخلي"
3. **Enhanced Character Line Detection**: Special handling for Arabic character names ending with colons
4. **Better Action Line Classification**: Improved detection of descriptive sentences

## Usage

1. Open the editor in your browser
2. Start typing or paste your Arabic screenplay text
3. The editor will automatically format:
   - Scene headers (مشهد 1, مشهد 2, etc.)
   - Character names (centered, bold)
   - Dialogue (centered)
   - Action lines (right-aligned)
   - Transitions (centered, bold)

## Supported Elements

- **Basmala**: "بسم الله الرحمن الرحيم"
- **Scene Headers**: "مشهد 1 – ليل-داخلي", "مشهد 2 – نهار-خارجي", etc.
- **Character Names**: Lines ending with colons like "ليليث:"
- **Dialogue**: Text following character names
- **Action Lines**: Descriptive text (right-aligned)
- **Transitions**: "قطع", "ذوبان", etc.

## Test Files

The following test files demonstrate the enhanced formatting capabilities:

1. `src/test-scenario.txt` - Basic test scenario
2. `src/comprehensive-test.txt` - Comprehensive test with all JSON structure elements
3. `src/json-structure-test.txt` - Specific test targeting the exact JSON data patterns
4. `src/final-test.txt` - Complete test with all 10 scenes from the JSON data

## Running the Application

```bash
npm run dev
```

The application will be available at http://localhost:5174

## Improvements

This enhanced version includes:

1. **Enhanced Action Verb List**: Expanded to include 60+ Arabic verbs
2. **Improved Scene Header Pattern Recognition**: Better handling of complex scene headers
3. **Enhanced Character Line Detection**: Special handling for Arabic text patterns
4. **Improved Action Line Detection**: Better classification of descriptive sentences
5. **Enhanced Scene Header Processing**: Proper formatting of complex headers
6. **Improved Paste Handling**: Better processing of complex scene header structures
7. **Automatic Dash Removal**: Leading dashes are automatically removed from action lines
8. **Context-Aware Post-Processing**: Misclassified bullet-point character lines are corrected after initial formatting

These improvements ensure that Arabic screenplays with complex structures are properly formatted according to industry standards.