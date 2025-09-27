import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, X, Loader2, Sun, Moon, FileText, Bold, Italic, Underline, 
  MoveVertical, Type, Search, Replace, Save, FolderOpen, 
  Printer, Settings, Download, FilePlus, 
  Undo, Redo, Scissors, Film, Camera, Feather, UserSquare, Parentheses, MessageCircle, 
  FastForward, ChevronDown, BookHeart, Hash, Play,
  Pause, RotateCcw, Upload, Activity, Globe,
  Database, Zap, Share2, Check, Edit3, Trash2, Copy, ExternalLink, GitBranch, Clock,
  Bookmark, Tag, MapPin, AlertTriangle, CheckCircle, XCircle, Plus,
  Minus, MoreVertical, Filter, SortAsc, SortDesc, Calendar, User,
  Mail, Phone, Link, Star, Heart, ThumbsUp, MessageSquare, Send,
  Maximize2, Minimize2, RefreshCw, HelpCircle, BarChart3, Users, PenTool,
  Brain
} from 'lucide-react';
import AdvancedAgentsPopup from './AdvancedAgentsPopup';
import { AutoSaveManager, AdvancedSearchEngine } from './advancedTools';

// ==================== PRODUCTION-READY SYSTEM CLASSES ====================

/**
 * نظام إدارة الحالة العام
 */
class StateManager {
  private state = new Map();
  private subscribers = new Map();

  subscribe(key: string, callback: (value: any) => void) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, []);
    }
    this.subscribers.get(key).push(callback);

    return () => {
      const callbacks = this.subscribers.get(key);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  setState(key: string, value: any) {
    this.state.set(key, value);
    const callbacks = this.subscribers.get(key) || [];
    callbacks.forEach((callback: any) => callback(value));
  }

  getState(key: string) {
    return this.state.get(key);
  }
}

/**
 * نظام التعاون والتعليقات
 */
class CollaborationSystem {
  private collaborators: Array<{ id: string; name: string; color: string }> = [];
  private comments: Array<{ id: string; content: string; author: string; timestamp: Date; position: any }> = [];
  private changeCallbacks: Array<(data: any) => void> = [];

  addCollaborator(collaborator: { id: string; name: string; color: string }) {
    this.collaborators.push(collaborator);
    this.notifyChanges({ type: 'collaborator_added', collaborator });
  }

  removeCollaborator(id: string) {
    this.collaborators = this.collaborators.filter(c => c.id !== id);
    this.notifyChanges({ type: 'collaborator_removed', id });
  }

  addComment(comment: { id: string; content: string; author: string; timestamp: Date; position: any }) {
    this.comments.push(comment);
    this.notifyChanges({ type: 'comment_added', comment });
  }

  removeComment(id: string) {
    this.comments = this.comments.filter(c => c.id !== id);
    this.notifyChanges({ type: 'comment_removed', id });
  }

  subscribeToChanges(callback: (data: any) => void) {
    this.changeCallbacks.push(callback);
  }

  private notifyChanges(data: any) {
    this.changeCallbacks.forEach(callback => callback(data));
  }

  getCollaborators() {
    return [...this.collaborators];
  }

  getComments() {
    return [...this.comments];
  }
}

/**
 * مساعد الكتابة بالذكاء الاصطناعي
 */
class AIWritingAssistant {
  async generateText(prompt: string, context: string, options: any = {}) {
    // In a real implementation, this would call an AI service
    // For now, we'll simulate the response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          text: `نص مُولد بواسطة الذكاء الاصطناعي استنادًا إلى: "${prompt}"\n\nهذا نص تجريبي يُظهر كيف يمكن للمساعد إنشاء محتوى مفيد للمؤلف.`,
          suggestions: [
            "اقتراح 1: تحسين تدفق الحوار",
            "اقتراح 2: إضافة تفاصيل وصفية",
            "اقتراح 3: تطوير الشخصية"
          ]
        });
      }, 1500);
    });
  }

  async rewriteText(text: string, style: string, options: any = {}) {
    // In a real implementation, this would call an AI service
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          originalText: text,
          rewrittenText: `النص المعاد كتابته بأسلوب ${style}:\n\n${text}`,
          changes: [
            { type: "style", description: `تم تطبيق أسلوب ${style}` },
            { type: "improvement", description: "تحسين التدفق العام" }
          ]
        });
      }, 1500);
    });
  }
}

/**
 * نظام إدارة المشاريع والقوالب
 */
class ProjectManager {
  private projects: Array<{ id: string; name: string; createdAt: Date; lastModified: Date }> = [];
  private templates: Array<{ id: string; name: string; content: string }> = [];

  createProject(name: string) {
    const project = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      createdAt: new Date(),
      lastModified: new Date()
    };
    this.projects.push(project);
    return project;
  }

  getProjects() {
    return [...this.projects];
  }

  getProject(id: string) {
    return this.projects.find(p => p.id === id);
  }

  updateProject(id: string, updates: any) {
    const project = this.projects.find(p => p.id === id);
    if (project) {
      Object.assign(project, updates, { lastModified: new Date() });
      return project;
    }
    return null;
  }

  deleteProject(id: string) {
    this.projects = this.projects.filter(p => p.id !== id);
  }

  addTemplate(name: string, content: string) {
    const template = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      content
    };
    this.templates.push(template);
    return template;
  }

  getTemplates() {
    return [...this.templates];
  }

  applyTemplate(templateId: string) {
    const template = this.templates.find(t => t.id === templateId);
    return template ? template.content : null;
  }
}

/**
 * نظام التخطيط البصري (المخططات الزمنية، القصص المصورة)
 */
class VisualPlanningSystem {
  private storyboards: Array<{ id: string; sceneId: string; description: string; imageUrl?: string }> = [];
  private beatSheets: Array<{ id: string; act: number; beat: string; description: string }> = [];

  addStoryboard(sceneId: string, description: string, imageUrl?: string) {
    const storyboard = {
      id: Math.random().toString(36).substr(2, 9),
      sceneId,
      description,
      imageUrl
    };
    this.storyboards.push(storyboard);
    return storyboard;
  }

  getStoryboards() {
    return [...this.storyboards];
  }

  addBeatSheet(act: number, beat: string, description: string) {
    const beatSheet = {
      id: Math.random().toString(36).substr(2, 9),
      act,
      beat,
      description
    };
    this.beatSheets.push(beatSheet);
    return beatSheet;
  }

  getBeatSheets() {
    return [...this.beatSheets];
  }
}

// ==================== ARABIC SCREENPLAY CLASSIFIER ====================

class ScreenplayClassifier {
  // Arabic text processing utilities
  static stripTashkeel(text: string): string {
    return text.replace(/[\u064B-\u065F\u0670]/g, '');
  }

  static normalizeSeparators(text: string): string {
    return text.replace(/\u2013|\u2014|\u2015/g, '-').replace(/\u060C/g, ',').replace(/\s+/g, ' ');
  }

  static normalizeLine(input: string): string {
    return ScreenplayClassifier.stripTashkeel(
      ScreenplayClassifier.normalizeSeparators(input)
    ).replace(/[\u200f\u200e\ufeff\t]+/g, '').trim();
  }

  static textInsideParens(s: string): string {
    const match = s.match(/^\s*\((.*?)\)\s*$/);
    return match ? match[1] : '';
  }

  static hasSentencePunctuation(s: string): boolean {
    return /[\.!\؟\?]/.test(s);
  }

  static wordCount(s: string): number {
    return s.trim() ? s.trim().split(/\s+/).length : 0;
  }

  static isBlank(line: string): boolean {
    return !line || line.trim() === '';
  }

  // Arabic-specific patterns
  static ARABIC_PATTERNS = {
    CHARACTER: [
      /^[\u0600-\u06FF\s]+:$/,  // Arabic characters followed by colon
      /^[A-Z\u0600-\u06FF\s]+$/  // All caps or Arabic characters (without colon)
    ],
    DIALOGUE: [
      /^[\u0600-\u06FF\s\.,!?؛؟\-"]+$/,  // Arabic text with punctuation
    ],
    ACTION: [
      /^[\u0600-\u06FF\s\.,!?؛؟\-"]+$/,  // Arabic text with punctuation
    ],
    TRANSITION: [
      /^(CUT TO:|FADE (IN|OUT)\.|DISSOLVE TO:|SMASH CUT TO:|MATCH CUT TO:|JUMP CUT TO:)/i,
      /^(تحول إلى|تلاشي (داخل|خارج)\.|تتلاشى إلى|قطع إلى|اقتطاع إلى|ذوبان إلى)/
    ],
    SCENE_HEADER: [
      /^\s*(?:مشهد|م\.)\s*\d+/i,  // Arabic scene headers like "مشهد 1" or "م. 1"
    ]
  };

  // Action verbs list for Arabic
  static ACTION_VERB_LIST = [
    'يتحرك', 'يقول', 'يفعل', 'ينظر', 'يسمع', 'يشعر', 'يفكر', 'يتذكر', 'يقرر', 'يبدأ', 'ينتهي',
    'يدخل', 'يخرج', 'يقف', 'يجلس', 'ينام', 'يستيقظ', 'يأكل', 'يشرب', 'يكتب', 'يقرأ', 'يتحدث',
    'يصرخ', 'يبكي', 'يضحك', 'يبتسم', 'ينهي', 'يوقف', 'يستمر', 'يتغير', 'يظهر', 'يختفي',
    'يأخذ', 'يعطي', 'يضع', 'يرفع', 'يخفض', 'يفتح', 'يغلق', 'يبدأ', 'ينتهي', 'يستمر', 'يتوقف'
  ].join('|');

  // Type checkers
  static isBasmala(line: string): boolean {
    // Handle both formats:
    // 1. بسم الله الرحمن الرحيم
    // 2. }بسم الله الرحمن الرحيم{
    const normalizedLine = line.trim();
    const basmalaPatterns = [
      /^بسم\s+الله\s+الرحمن\s+الرحيم$/i,  // Standard format
      /^[{}]*\s*بسم\s+الله\s+الرحمن\s+الرحيم\s*[{}]*$/i  // With braces
    ];
    
    return basmalaPatterns.some(pattern => pattern.test(normalizedLine));
  }

  static isSceneHeaderStart(line: string): boolean {
    // Match Arabic scene headers like "مشهد 1" or "م. 1"
    return /^\s*(?:مشهد|م\.)\s*\d+/i.test(line);
  }

  static isTransition(line: string): boolean {
    const transitionPatterns = [
      /^\s*(CUT TO:|FADE (IN|OUT)\.|DISSOLVE TO:|SMASH CUT TO:|MATCH CUT TO:|JUMP CUT TO:)/i,
      /^\s*(تحول إلى|تلاشي (داخل|خارج)\.|تتلاشى إلى|قطع إلى|اقتطاع إلى|ذوبان إلى)/
    ];
    
    return transitionPatterns.some(pattern => pattern.test(line));
  }

  static isParenShaped(line: string): boolean {
    return /^\s*\(.*?\)\s*$/.test(line);
  }

  static isCharacterLine(line: string, context?: { lastFormat: string; isInDialogueBlock: boolean }): boolean {
    if (ScreenplayClassifier.isBlank(line) || 
        ScreenplayClassifier.isBasmala(line) || 
        ScreenplayClassifier.isSceneHeaderStart(line) || 
        ScreenplayClassifier.isTransition(line) || 
        ScreenplayClassifier.isParenShaped(line)) {
      return false;
    }
    
    const wordCount = ScreenplayClassifier.wordCount(line);
    // Allow slightly longer character lines for Arabic names
    if (wordCount > 7) return false;
    
    // Check if line ends with a colon (common in Arabic screenplays)
    const hasColon = line.includes(':');
    
    // Special handling for Arabic character names that might not follow Western patterns
    const arabicCharacterPattern = /^[\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+[:\s]*$/;
    
    // If it ends with a colon, it's very likely a character line
    if (hasColon && line.trim().endsWith(':')) {
      return true;
    }
    
    // If it matches Arabic character pattern, it's likely a character line
    if (arabicCharacterPattern.test(line)) {
      return true;
    }
    
    // If it doesn't have a colon and doesn't match character patterns, it's likely action
    if (!hasColon) return false;
    
    // Context-aware checks
    if (context) {
      // If we're already in a dialogue block, this might be a new character
      if (context.isInDialogueBlock) {
        // If the last line was also a character, this is likely a new character
        if (context.lastFormat === 'character') {
          return ScreenplayClassifier.ARABIC_PATTERNS.CHARACTER.some(pattern => pattern.test(line)) || arabicCharacterPattern.test(line);
        }
        // If the last line was dialogue, this is probably not a character
        if (context.lastFormat === 'dialogue') {
          return false;
        }
      }
      
      // If the last format was action, and this line has a colon, it's likely a character
      if (context.lastFormat === 'action' && hasColon) {
        return ScreenplayClassifier.ARABIC_PATTERNS.CHARACTER.some(pattern => pattern.test(line)) || arabicCharacterPattern.test(line);
      }
    }
    
    return ScreenplayClassifier.ARABIC_PATTERNS.CHARACTER.some(pattern => pattern.test(line)) || arabicCharacterPattern.test(line);
  }

  static isLikelyAction(line: string): boolean {
    if (ScreenplayClassifier.isBlank(line) || 
        ScreenplayClassifier.isBasmala(line) || 
        ScreenplayClassifier.isSceneHeaderStart(line) || 
        ScreenplayClassifier.isTransition(line) || 
        ScreenplayClassifier.isCharacterLine(line) || 
        ScreenplayClassifier.isParenShaped(line)) {
      return false;
    }
    
    // Additional checks for action lines
    const normalized = ScreenplayClassifier.normalizeLine(line);
    
    // Check if line starts with an action description pattern
    // These are strong indicators of action lines
    const actionStartPatterns = [
      /^\s*[-–—]?\s*(?:نرى|ننظر|نسمع|نلاحظ|يبدو|يظهر|يبدأ|ينتهي|يستمر|يتوقف|يتحرك|يحدث|يكون|يوجد|توجد|تظهر)/,
      /^\s*[-–—]?\s*[ي|ت][\u0600-\u06FF]+\s+(?:[^\s\u0600-\u06FF]*\s*)*[^\\s\u0600-\u06FF]/  // Verbs starting with ي or ت followed by other words
    ];
    
    for (const pattern of actionStartPatterns) {
      if (pattern.test(line)) {
        return true;
      }
    }
    
    // Enhanced action detection for Arabic
    // Check if line starts with an action verb
    const actionVerbPattern = new RegExp('^(?:' + ScreenplayClassifier.ACTION_VERB_LIST + ')(?:\\s|$)');
    if (actionVerbPattern.test(normalized)) {
      return true;
    }
    
    // If it has sentence punctuation and no colon, it might be action
    // But we need to be more careful to avoid misclassifying dialogue
    if (ScreenplayClassifier.hasSentencePunctuation(line) && !line.includes(':')) {
      // Check if it contains action indicators
      const actionIndicators = [
        'يدخل', 'يخرج', 'ينظر', 'يرفع', 'تبتسم', 'ترقد', 'تقف', 'يبسم', 'يضع', 'تنظر', 'تربت', 'تقوم', 'يشق', 'تشق', 'تضرب', 'يسحب', 'يلتفت', 'يقف', 'يجلس', 'تجلس', 'يجري', 'تجري', 'يمشي', 'تمشي', 'يركض', 'تركض', 'يصرخ', 'اصرخ', 'يبكي', 'تبكي', 'يضحك', 'تضحك', 'يغني', 'تغني', 'يرقص', 'ترقص', 'يأكل', 'تأكل', 'يشرب', 'تشرب', 'ينام', 'تنام', 'يستيقظ', 'تستيقظ', 'يكتب', 'تكتب', 'يقرأ', 'تقرأ', 'يسمع', 'تسمع', 'يشم', 'تشم', 'يلمس', 'تلمس', 'يأخذ', 'تأخذ', 'يعطي', 'تعطي', 'يفتح', 'تفتح', 'يغلق', 'تغلق'
      ];
      
      for (const indicator of actionIndicators) {
        if (normalized.includes(indicator)) {
          return true;
        }
      }
    }
    
    return false;
  }
}

// ==================== MAIN SCREENPLAY EDITOR COMPONENT ====================

const CleanIntegratedScreenplayEditor: React.FC = () => {
  // State variables
  const [htmlContent, setHtmlContent] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentFormat, setCurrentFormat] = useState('action');
  const [selectedFont, setSelectedFont] = useState('Amiri');
  const [selectedSize, setSelectedSize] = useState('14pt');
  const [documentStats, setDocumentStats] = useState({
    characters: 0,
    words: 0,
    pages: 1,
    scenes: 0
  });

  // Menu states
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showFormatMenu, setShowFormatMenu] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [showAgentsPopup, setShowAgentsPopup] = useState(false);

  // Dialog states
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [showCharacterRename, setShowCharacterRename] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [oldCharacterName, setOldCharacterName] = useState('');
  const [newCharacterName, setNewCharacterName] = useState('');

  // AI review states
  const [showReviewerDialog, setShowReviewerDialog] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewResult, setReviewResult] = useState('');

  // View states
  const [showRulers, setShowRulers] = useState(true);

  // Refs
  const editorRef = useRef<HTMLDivElement>(null);
  const stickyHeaderRef = useRef<HTMLDivElement>(null);

  // Production-ready system instances
  const stateManager = useRef(new StateManager());
  const autoSaveManager = useRef(new AutoSaveManager());
  const searchEngine = useRef(new AdvancedSearchEngine());
  const collaborationSystem = useRef(new CollaborationSystem());
  const aiAssistant = useRef(new AIWritingAssistant());
  const projectManager = useRef(new ProjectManager());
  const visualPlanning = useRef(new VisualPlanningSystem());
  const screenplayClassifier = useRef(new ScreenplayClassifier());

  // Get format styles
  const getFormatStyles = (formatType: string): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      fontFamily: `${selectedFont}, Amiri, Cairo, Noto Sans Arabic, Arial, sans-serif`,
      fontSize: selectedSize,
      direction: 'rtl',
      lineHeight: '1.8',
      minHeight: '1.2em'
    };

    const formatStyles: { [key: string]: React.CSSProperties } = {
      'basmala': { textAlign: 'left', margin: '0' },
      'scene-header-top-line': { display: 'flex', justifyContent: 'space-between', width: '100%', margin: '1rem 0 0 0' },
      'scene-header-3': { textAlign: 'center', fontWeight: 'bold', margin: '0 0 1rem 0' },
      'action': { textAlign: 'right', margin: '12px 0' },
      'character': { textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', width: '2.5in', margin: '12px auto 0 auto' },
      'parenthetical': { textAlign: 'center', fontStyle: 'italic', width: '2.0in', margin: '6px auto' },
      'dialogue': { textAlign: 'center', width: '2.5in', lineHeight: '1.2', margin: '0 auto 12px auto' },
      'transition': { textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', margin: '1rem 0' },
    };

    const finalStyles = { ...baseStyles, ...formatStyles[formatType] };
  
    if (formatType === 'scene-header-1') return { ...baseStyles, fontWeight: 'bold', textTransform: 'uppercase', margin: '0' };
    if (formatType === 'scene-header-2') return { ...baseStyles, fontStyle: 'italic', margin: '0' };
  
    return finalStyles;
  };

  // Update cursor position
  const updateCursorPosition = () => {
    // Function implementation removed as variables are unused
  };

  // Check if current element is empty
  const isCurrentElementEmpty = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const element = range.startContainer.parentElement;
      return element && element.textContent === '';
    }
    return false;
  };

  // Calculate document stats
  const calculateStats = () => {
    if (editorRef.current) {
      const textContent = editorRef.current.innerText || '';
      const characters = textContent.length;
      const words = textContent.trim() ? textContent.trim().split(/\s+/).length : 0;
      const scenes = (textContent.match(/مشهد\s*\d+/gi) || []).length;
      
      // Calculate pages based on A4 height
      const scrollHeight = editorRef.current.scrollHeight;
      const pages = Math.max(1, Math.ceil(scrollHeight / (29.7 * 37.8)));
      
      setDocumentStats({ characters, words, pages, scenes });
    }
  };

  // Get next format on Tab
  const getNextFormatOnTab = (currentFormat: string, shiftKey: boolean) => {
    const mainSequence = ['scene-header-top-line', 'action', 'character', 'transition'];
    
    switch (currentFormat) {
      case 'character':
        if (shiftKey) {
          return isCurrentElementEmpty() ? 'action' : 'transition';
        } else {
          return 'dialogue';
        }
      case 'dialogue':
        if (shiftKey) {
          return 'character';
        } else {
          return 'parenthetical';
        }
      case 'parenthetical':
        return 'dialogue';
      default:
        const currentIndex = mainSequence.indexOf(currentFormat);
        if (currentIndex !== -1) {
          if (shiftKey) {
            return mainSequence[Math.max(0, currentIndex - 1)];
          } else {
            return mainSequence[Math.min(mainSequence.length - 1, currentIndex + 1)];
          }
        }
        return 'action';
    }
  };

  // Get next format on Enter
  const getNextFormatOnEnter = (currentFormat: string) => {
    const transitions: { [key: string]: string } = {
      'scene-header-top-line': 'scene-header-3', 
      'scene-header-3': 'action',
      'scene-header-1': 'scene-header-3',
      'scene-header-2': 'scene-header-3'
    };
  
    return transitions[currentFormat] || 'action';
  };

  // Apply format to current line
  const applyFormatToCurrentLine = (formatType: string) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const element = range.startContainer.parentElement;
      
      if (element) {
        element.className = formatType;
        Object.assign(element.style, getFormatStyles(formatType));
        setCurrentFormat(formatType);
      }
    }
  };

  // Format text
  const formatText = (command: string, value: string = '') => {
    document.execCommand(command, false, value);
  };

  // Update content
  const updateContent = () => {
    if (editorRef.current) {
      setHtmlContent(editorRef.current.innerHTML);
      
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const element = range.startContainer.parentElement;
        if (element) {
          setCurrentFormat(element.className || 'action');
        }
      }
      
      calculateStats();
    }
  };

  // Handle key down
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const nextFormat = getNextFormatOnTab(currentFormat, e.shiftKey);
      applyFormatToCurrentLine(nextFormat);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const nextFormat = getNextFormatOnEnter(currentFormat);
      applyFormatToCurrentLine(nextFormat);
    } else if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
        case 'B':
          e.preventDefault();
          formatText('bold');
          break;
        case 'i':
        case 'I':
          e.preventDefault();
          formatText('italic');
          break;
        case 'u':
        case 'U':
          e.preventDefault();
          formatText('underline');
          break;
      }
    }
    
    // Small delay to ensure DOM updates before calculating stats
    setTimeout(updateContent, 10);
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  // Handle content change
  const handleContentChange = () => {
    updateContent();
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchTerm.trim() || !editorRef.current) return;
    
    const content = editorRef.current.innerText;
    const result = await searchEngine.current.searchInContent(content, searchTerm);
    
    if (result.success) {
      alert(`Found ${result.totalMatches} matches for "${searchTerm}"`);
    } else {
      alert(`Search failed: ${result.error}`);
    }
  };

  // Handle replace
  const handleReplace = async () => {
    if (!searchTerm.trim() || !editorRef.current) return;
    
    const content = editorRef.current.innerText;
    const result = await searchEngine.current.replaceInContent(content, searchTerm, replaceTerm);
    
    if (result.success) {
      if (editorRef.current) {
        editorRef.current.innerText = result.newContent;
        updateContent();
        alert(`Replaced ${result.replacements} occurrences of "${searchTerm}" with "${replaceTerm}"`);
      }
    } else {
      alert(`Replace failed: ${result.error}`);
    }
  };

  // Handle character rename
  const handleCharacterRename = () => {
    if (!oldCharacterName.trim() || !newCharacterName.trim() || !editorRef.current) return;
    
    const content = editorRef.current.innerText;
    const regex = new RegExp(`^\\s*${oldCharacterName}\\s*$`, 'gmi');
    const newContent = content.replace(regex, newCharacterName.toUpperCase());
    
    if (editorRef.current) {
      editorRef.current.innerText = newContent;
      updateContent();
      alert(`Renamed character "${oldCharacterName}" to "${newCharacterName}"`);
      setShowCharacterRename(false);
      setOldCharacterName('');
      setNewCharacterName('');
    }
  };

  // Handle AI review
  const handleAIReview = async () => {
    if (!editorRef.current) return;
    
    setIsReviewing(true);
    const content = editorRef.current.innerText;
    
    try {
      // In a real implementation, this would call an AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockReview = `AI Review Results:
      
Strengths:
- Good character development
- Strong dialogue
- Clear scene structure

Areas for improvement:
- Consider adding more action descriptions
- Some dialogue could be more natural
- Scene transitions could be smoother

Suggestions:
- Add more sensory details to action lines
- Vary sentence structure in dialogue
- Ensure each scene has a clear purpose`;
      
      setReviewResult(mockReview);
    } catch (error) {
      setReviewResult(`AI review failed: ${error}`);
    } finally {
      setIsReviewing(false);
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Initialize editor
  useEffect(() => {
    if (editorRef.current) {
      // Set initial content
      editorRef.current.innerHTML = `
        <div class="basmala" style="${Object.entries(getFormatStyles('basmala')).map(([k, v]) => `${k}: ${v}`).join('; ')}">
          بسم الله الرحمن الرحيم
        </div>
        <div class="scene-header-top-line" style="${Object.entries(getFormatStyles('scene-header-top-line')).map(([k, v]) => `${k}: ${v}`).join('; ')}">
          <div>المؤلف: اسم المؤلف</div>
          <div>التاريخ: ${new Date().toLocaleDateString('ar')}</div>
        </div>
        <div class="scene-header-3" style="${Object.entries(getFormatStyles('scene-header-3')).map(([k, v]) => `${k}: ${v}`).join('; ')}">
          مشهد 1
        </div>
        <div class="action" style="${Object.entries(getFormatStyles('action')).map(([k, v]) => `${k}: ${v}`).join('; ')}">
          [وصف المشهد والأفعال هنا]
        </div>
        <div class="character" style="${Object.entries(getFormatStyles('character')).map(([k, v]) => `${k}: ${v}`).join('; ')}">
          الاسم
        </div>
        <div class="dialogue" style="${Object.entries(getFormatStyles('dialogue')).map(([k, v]) => `${k}: ${v}`).join('; ')}">
          [الحوار هنا]
        </div>
      `;
      
      updateContent();
    }
    
    // Set up auto-save
    autoSaveManager.current.setSaveCallback(async (content) => {
      // In a real implementation, this would save to a database or file
      console.log('Auto-saved content:', content);
    });
    autoSaveManager.current.startAutoSave();
    
    // Clean up
    return () => {
      autoSaveManager.current.stopAutoSave();
    };
  }, []);

  // Update stats when content changes
  useEffect(() => {
    calculateStats();
  }, [htmlContent]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-2">
            <Film className="text-blue-500" />
            <h1 className="text-xl font-bold">محرر السيناريو العربي</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              title={isDarkMode ? "الوضع النهاري" : "الوضع الليلي"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowFileMenu(!showFileMenu)}
                className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                ملف <ChevronDown size={16} className="mr-1" />
              </button>
              
              {showFileMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20">
                  <button className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <FilePlus size={16} className="ml-2" /> جديد
                  </button>
                  <button className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <FolderOpen size={16} className="ml-2" /> فتح
                  </button>
                  <button className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <Save size={16} className="ml-2" /> حفظ
                  </button>
                  <button className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <Download size={16} className="ml-2" /> تصدير
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowEditMenu(!showEditMenu)}
                className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                تحرير <ChevronDown size={16} className="mr-1" />
              </button>
              
              {showEditMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20">
                  <button className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <Undo size={16} className="ml-2" /> تراجع
                  </button>
                  <button className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <Redo size={16} className="ml-2" /> إعادة
                  </button>
                  <button className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <Scissors size={16} className="ml-2" /> قص
                  </button>
                  <button className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center">
                    <Copy size={16} className="ml-2" /> نسخ
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowFormatMenu(!showFormatMenu)}
                className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                تنسيق <ChevronDown size={16} className="mr-1" />
              </button>
              
              {showFormatMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20">
                  <button 
                    onClick={() => applyFormatToCurrentLine('scene-header-top-line')}
                    className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    عنوان المشهد العلوي
                  </button>
                  <button 
                    onClick={() => applyFormatToCurrentLine('scene-header-3')}
                    className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    عنوان المشهد
                  </button>
                  <button 
                    onClick={() => applyFormatToCurrentLine('action')}
                    className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    وصف الأفعال
                  </button>
                  <button 
                    onClick={() => applyFormatToCurrentLine('character')}
                    className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    الشخصية
                  </button>
                  <button 
                    onClick={() => applyFormatToCurrentLine('dialogue')}
                    className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    الحوار
                  </button>
                  <button 
                    onClick={() => applyFormatToCurrentLine('transition')}
                    className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    الانتقال
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowToolsMenu(!showToolsMenu)}
                className="px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
              >
                أدوات <ChevronDown size={16} className="mr-1" />
              </button>
              
              {showToolsMenu && (
                <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-20">
                  <button 
                    onClick={() => setShowSearchDialog(true)}
                    className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <Search size={16} className="ml-2" /> بحث
                  </button>
                  <button 
                    onClick={() => setShowReplaceDialog(true)}
                    className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <Replace size={16} className="ml-2" /> استبدال
                  </button>
                  <button 
                    onClick={() => setShowCharacterRename(true)}
                    className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <UserSquare size={16} className="ml-2" /> إعادة تسمية الشخصية
                  </button>
                  <button 
                    onClick={() => setShowReviewerDialog(true)}
                    className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <Sparkles size={16} className="ml-2" /> مراجعة الذكاء الاصطناعي
                  </button>
                  <button 
                    onClick={() => setShowAgentsPopup(true)}
                    className="block w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                  >
                    <Brain size={16} className="ml-2" /> الوكلاء المتقدمة
                  </button>
                </div>
              )}
            </div>
            
            <button 
              onClick={() => window.print()}
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              title="طباعة"
            >
              <Printer size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex">
        {/* Editor */}
        <div className="flex-1 p-4">
          <div 
            ref={editorRef}
            contentEditable
            className="min-h-[70vh] p-8 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ 
              fontFamily: `${selectedFont}, Amiri, Cairo, Noto Sans Arabic, Arial, sans-serif`,
              fontSize: selectedSize,
              direction: 'rtl',
              lineHeight: '1.8'
            }}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onInput={handleContentChange}
          />
        </div>
        
        {/* Sidebar */}
        <div className="w-64 border-l border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-2">الإحصائيات</h3>
              <div className="space-y-1 text-sm">
                <div>الشخصيات: {documentStats.characters}</div>
                <div>الكلمات: {documentStats.words}</div>
                <div>الصفحات: {documentStats.pages}</div>
                <div>المشاهد: {documentStats.scenes}</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">التنسيق</h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-sm mb-1">الخط</label>
                  <select 
                    value={selectedFont}
                    onChange={(e) => setSelectedFont(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  >
                    <option value="Amiri">Amiri</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Tajawal">Tajawal</option>
                    <option value="Noto Sans Arabic">Noto Sans Arabic</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm mb-1">الحجم</label>
                  <select 
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  >
                    <option value="12pt">صغير (12pt)</option>
                    <option value="14pt">متوسط (14pt)</option>
                    <option value="16pt">كبير (16pt)</option>
                    <option value="18pt">كبير جداً (18pt)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">العناصر السريعة</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => applyFormatToCurrentLine('scene-header-3')}
                  className="w-full text-right p-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 rounded flex items-center"
                >
                  <Hash size={16} className="ml-2" /> إضافة مشهد
                </button>
                <button 
                  onClick={() => applyFormatToCurrentLine('character')}
                  className="w-full text-right p-2 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 rounded flex items-center"
                >
                  <UserSquare size={16} className="ml-2" /> إضافة شخصية
                </button>
                <button 
                  onClick={() => applyFormatToCurrentLine('dialogue')}
                  className="w-full text-right p-2 bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 rounded flex items-center"
                >
                  <MessageCircle size={16} className="ml-2" /> إضافة حوار
                </button>
                <button 
                  onClick={() => applyFormatToCurrentLine('transition')}
                  className="w-full text-right p-2 bg-yellow-100 dark:bg-yellow-900 hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded flex items-center"
                >
                  <FastForward size={16} className="ml-2" /> إضافة انتقال
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Dialog */}
      {showSearchDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center">
                <Search className="ml-2" /> بحث
              </h3>
              <button onClick={() => setShowSearchDialog(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1">كلمة البحث</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  placeholder="أدخل النص للبحث عنه"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setShowSearchDialog(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  إلغاء
                </button>
                <button 
                  onClick={handleSearch}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  بحث
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Replace Dialog */}
      {showReplaceDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center">
                <Replace className="ml-2" /> بحث واستبدال
              </h3>
              <button onClick={() => setShowReplaceDialog(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1">البحث عن</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  placeholder="أدخل النص للبحث عنه"
                />
              </div>
              
              <div>
                <label className="block mb-1">استبدال بـ</label>
                <input
                  type="text"
                  value={replaceTerm}
                  onChange={(e) => setReplaceTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  placeholder="أدخل النص البديل"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setShowReplaceDialog(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  إلغاء
                </button>
                <button 
                  onClick={handleReplace}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  استبدال
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Character Rename Dialog */}
      {showCharacterRename && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center">
                <UserSquare className="ml-2" /> إعادة تسمية الشخصية
              </h3>
              <button onClick={() => setShowCharacterRename(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1">الاسم الحالي</label>
                <input
                  type="text"
                  value={oldCharacterName}
                  onChange={(e) => setOldCharacterName(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  placeholder="أدخل الاسم الحالي"
                />
              </div>
              
              <div>
                <label className="block mb-1">الاسم الجديد</label>
                <input
                  type="text"
                  value={newCharacterName}
                  onChange={(e) => setNewCharacterName(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                  placeholder="أدخل الاسم الجديد"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setShowCharacterRename(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  إلغاء
                </button>
                <button 
                  onClick={handleCharacterRename}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  إعادة تسمية
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Reviewer Dialog */}
      {showReviewerDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-1/2 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center">
                <Sparkles className="ml-2" /> مراجعة الذكاء الاصطناعي
              </h3>
              <button onClick={() => setShowReviewerDialog(false)}>
                <X size={20} />
              </button>
            </div>
            
            {isReviewing ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="animate-spin mb-4" size={32} />
                <p>جاري تحليل النص باستخدام الذكاء الاصطناعي...</p>
              </div>
            ) : reviewResult ? (
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded whitespace-pre-line">
                  {reviewResult}
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={() => setShowReviewerDialog(false)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p>هل تريد مراجعة النص باستخدام الذكاء الاصطناعي؟</p>
                <div className="flex justify-end space-x-2">
                  <button 
                    onClick={() => setShowReviewerDialog(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    إلغاء
                  </button>
                  <button 
                    onClick={handleAIReview}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    مراجعة
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Advanced Agents Popup */}
      <AdvancedAgentsPopup 
        isOpen={showAgentsPopup}
        onClose={() => setShowAgentsPopup(false)}
        content={editorRef.current?.innerText || ''}
      />
    </div>
  );
};

export default CleanIntegratedScreenplayEditor;
