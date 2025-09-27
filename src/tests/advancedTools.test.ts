import test from 'node:test';
import assert from 'node:assert/strict';
import type { AutoSaveManager as AutoSaveManagerType, AdvancedSearchEngine as AdvancedSearchEngineType } from '../components/editor/advancedTools';

const toolsPromise = import('../components/editor/advancedTools.js') as Promise<typeof import('../components/editor/advancedTools')>;

const intervalHandles = new Map<number, NodeJS.Timeout>();
let nextIntervalId = 1;

(globalThis as any).window = {
  setInterval: (handler: (...args: any[]) => void, timeout?: number, ...args: any[]) => {
    const id = nextIntervalId++;
    const handle = setInterval(handler, timeout, ...args);
    intervalHandles.set(id, handle);
    return id;
  },
  clearInterval: (id: number) => {
    const handle = intervalHandles.get(id);
    if (handle) {
      clearInterval(handle);
      intervalHandles.delete(id);
    }
  }
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

test('AutoSaveManager saves changed content on interval', async () => {
  const { AutoSaveManager } = await toolsPromise;
  const manager: AutoSaveManagerType = new AutoSaveManager(15);
  const saved: string[] = [];
  manager.setSaveCallback(async (content: string) => {
    saved.push(content);
  });

  manager.updateContent('المشهد الافتتاحي');
  manager.startAutoSave();
  await delay(40);
  manager.stopAutoSave();

  assert.deepStrictEqual(saved, ['المشهد الافتتاحي']);
});

test('AutoSaveManager avoids redundant saves for identical content', async () => {
  const { AutoSaveManager } = await toolsPromise;
  const manager: AutoSaveManagerType = new AutoSaveManager(10);
  const saved: string[] = [];
  manager.setSaveCallback(async (content: string) => {
    saved.push(content);
  });

  manager.updateContent('حوار المشهد الأول');
  manager.startAutoSave();
  await delay(30);

  manager.updateContent('حوار المشهد الأول');
  await delay(30);

  manager.stopAutoSave();

  assert.strictEqual(saved.length, 1);
  assert.strictEqual(saved[0], 'حوار المشهد الأول');
});

test('AutoSaveManager.forceSave persists the latest content immediately', async () => {
  const { AutoSaveManager } = await toolsPromise;
  const manager: AutoSaveManagerType = new AutoSaveManager(50);
  const saved: string[] = [];
  manager.setSaveCallback(async (content: string) => {
    saved.push(content);
  });

  manager.startAutoSave();
  manager.updateContent('الخاتمة');
  await manager.forceSave();
  manager.stopAutoSave();

  await delay(60);

  assert.deepStrictEqual(saved, ['الخاتمة']);
});

test('AdvancedSearchEngine finds matches across multiple lines', async () => {
  const { AdvancedSearchEngine } = await toolsPromise;
  const engine: AdvancedSearchEngineType = new AdvancedSearchEngine();
  const content = 'مشهد 1: وصف المشهد\nالمشهد الثاني يحتوي على تفاصيل إضافية';

  const result = await engine.searchInContent(content, 'المشهد');

  assert.ok(result.success);
  assert.strictEqual(result.totalMatches, 2);
  assert.deepStrictEqual(result.results.map(r => r.lineNumber), [1, 2]);
});

test('AdvancedSearchEngine.replaceInContent respects replaceAll option', async () => {
  const { AdvancedSearchEngine } = await toolsPromise;
  const engine: AdvancedSearchEngineType = new AdvancedSearchEngine();
  const content = 'قطع إلى الداخل. قطع إلى الخارج.';

  const result = await engine.replaceInContent(content, 'قطع', 'انتقال', { replaceAll: false });

  assert.ok(result.success);
  assert.strictEqual(result.newContent, 'انتقال إلى الداخل. قطع إلى الخارج.');
  assert.strictEqual(result.replacements, 2);
});

test('AdvancedSearchEngine.searchInContent handles invalid regex input', async () => {
  const { AdvancedSearchEngine } = await toolsPromise;
  const engine: AdvancedSearchEngineType = new AdvancedSearchEngine();
  const content = 'نص بسيط للاختبار';

  const result = await engine.searchInContent(content, '[', { useRegex: true });

  assert.ok(!result.success);
  assert.strictEqual(result.results.length, 0);
  assert.match(result.error ?? '', /خطأ في البحث/);
});
