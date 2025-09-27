/**
 * نظام الحفظ التلقائي والنسخ الاحتياطية
 */
export class AutoSaveManager {
  private autoSaveInterval: number | null = null;
  private currentContent = '';
  private lastSaved = '';
  private saveCallback: ((content: string) => Promise<void>) | null = null;

  private intervalMs: number;

  constructor(intervalMs: number = 30000) {
    this.intervalMs = intervalMs;
  }

  setSaveCallback(callback: (content: string) => Promise<void>) {
    this.saveCallback = callback;
  }

  updateContent(content: string) {
    this.currentContent = content;
  }

  startAutoSave() {
    if (this.autoSaveInterval) return;

    this.autoSaveInterval = window.setInterval(async () => {
      if (this.currentContent !== this.lastSaved && this.saveCallback) {
        try {
          await this.saveCallback(this.currentContent);
          this.lastSaved = this.currentContent;
          console.log('Auto-saved at:', new Date().toLocaleTimeString());
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }
    }, this.intervalMs);
  }

  stopAutoSave() {
    if (this.autoSaveInterval) {
      window.clearInterval(this.autoSaveInterval);
      this.autoSaveInterval = null;
    }
  }

  async forceSave() {
    if (this.saveCallback) {
      await this.saveCallback(this.currentContent);
      this.lastSaved = this.currentContent;
    }
  }
}

/**
 * محرك البحث والاستبدال المتقدم
 */
export class AdvancedSearchEngine {
  async searchInContent(content: string, query: string, options: any = {}) {
    const results: Array<{ lineNumber: number; content: string; matches: Array<{ text: string; index: number; length: number }> }> = [];
    const lines = content.split('\n');
    const caseSensitive = options.caseSensitive || false;
    const wholeWords = options.wholeWords || false;
    const useRegex = options.useRegex || false;

    let searchPattern: RegExp;

    try {
      if (useRegex) {
        const flags = caseSensitive ? 'g' : 'gi';
        searchPattern = new RegExp(query, flags);
      } else if (wholeWords) {
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const flags = caseSensitive ? 'g' : 'gi';
        searchPattern = new RegExp(`\\b${escapedQuery}\\b`, flags);
      } else {
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const flags = caseSensitive ? 'g' : 'gi';
        searchPattern = new RegExp(escapedQuery, flags);
      }

      lines.forEach((line, lineNumber) => {
        const matches = Array.from(line.matchAll(searchPattern));
        if (matches.length > 0) {
          results.push({
            lineNumber: lineNumber + 1,
            content: line,
            matches: matches.map(match => ({
              text: match[0],
              index: match.index || 0,
              length: match[0].length
            }))
          });
        }
      });

      return {
        success: true,
        query: query,
        totalMatches: results.reduce((sum, r) => sum + r.matches.length, 0),
        results: results,
        searchTime: Date.now()
      };

    } catch (error) {
      return {
        success: false,
        error: `خطأ في البحث: ${error}`,
        results: []
      };
    }
  }

  async replaceInContent(content: string, searchQuery: string, replaceText: string, options: any = {}) {
    const caseSensitive = options.caseSensitive || false;
    const wholeWords = options.wholeWords || false;
    const useRegex = options.useRegex || false;
    const replaceAll = options.replaceAll !== false;

    let searchPattern: RegExp;

    try {
      if (useRegex) {
        const flags = replaceAll ? (caseSensitive ? 'g' : 'gi') : (caseSensitive ? '' : 'i');
        searchPattern = new RegExp(searchQuery, flags);
      } else if (wholeWords) {
        const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const flags = replaceAll ? (caseSensitive ? 'g' : 'gi') : (caseSensitive ? '' : 'i');
        searchPattern = new RegExp(`\\b${escapedQuery}\\b`, flags);
      } else {
        const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const flags = replaceAll ? (caseSensitive ? 'g' : 'gi') : (caseSensitive ? '' : 'i');
        searchPattern = new RegExp(escapedQuery, flags);
      }

      const originalMatches = content.match(new RegExp(searchPattern.source, 'g')) || [];
      const newContent = content.replace(searchPattern, replaceText);

      return {
        success: true,
        originalContent: content,
        newContent: newContent,
        replacements: originalMatches.length,
        searchQuery: searchQuery,
        replaceText: replaceText
      };

    } catch (error) {
      return {
        success: false,
        error: `خطأ في الاستبدال: ${error}`,
        originalContent: content,
        newContent: content,
        replacements: 0,
        searchQuery: searchQuery,
        replaceText: replaceText
      };
    }
  }
}
