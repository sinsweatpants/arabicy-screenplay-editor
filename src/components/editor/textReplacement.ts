/**
 * Applies regex-based replacements across all text nodes within the provided root element.
 *
 * This utility preserves the existing DOM structure by restricting replacements to text nodes,
 * preventing the destructive flattening that occurs when rewriting `innerText` for complex
 * screenplay documents that rely on semantic block wrappers.
 *
 * @param {HTMLElement} root - The root element containing screenplay markup.
 * @param {string} patternSource - The regex source string to apply.
 * @param {string} patternFlags - The regex flags to honour when building matchers.
 * @param {string} replacement - The replacement string to inject for each match.
 * @param {boolean} replaceAll - Whether replacements should continue after the first match.
 * @returns {number} The total number of replacements applied across all text nodes.
 */
export function applyRegexReplacementToTextNodes(
  root: HTMLElement,
  patternSource: string,
  patternFlags: string,
  replacement: string,
  replaceAll: boolean
): number {
  const combinedFlags = Array.from(new Set((patternFlags + 'g').split(''))).join('');
  const maxReplacements = replaceAll ? Number.POSITIVE_INFINITY : 1;
  const TEXT_NODE = 3;

  let remaining = maxReplacements;
  let replacementsApplied = 0;

  const traverse = (node: any) => {
    if (!node || remaining === 0) return;

    if (typeof node.nodeType === 'number' && node.nodeType === TEXT_NODE) {
      const originalText = node.nodeValue ?? node.textContent ?? '';
      if (!originalText) {
        return;
      }

      const regex = new RegExp(patternSource, combinedFlags);
      let nodeChanged = false;

      const updatedText = originalText.replace(regex, (match: string) => {
        if (remaining === 0) {
          return match;
        }

        nodeChanged = true;
        replacementsApplied += 1;

        if (remaining !== Number.POSITIVE_INFINITY) {
          remaining -= 1;
        }

        return replacement;
      });

      if (nodeChanged) {
        if ('nodeValue' in node) {
          node.nodeValue = updatedText;
        } else if ('textContent' in node) {
          node.textContent = updatedText;
        }
      }

      return;
    }

    const children: any[] = Array.isArray(node?.childNodes)
      ? node.childNodes
      : Array.from(node?.childNodes ?? []);

    for (const child of children) {
      if (remaining === 0) break;
      traverse(child);
    }
  };

  traverse(root);

  return replacementsApplied;
}
