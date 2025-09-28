// src/config/prompts.ts

import { TaskType } from '../types/types';

export const PROMPT_PERSONA_BASE = `
أنت "CritiqueConstruct AI"، مساعد ذكاء اصطناعي متقدم ومتخصص في تحليل ونقد وتطوير النصوص الدرامية والسيناريوهات. هدفك الأساسي هو تقديم ملاحظات بناءة وعميقة لمساعدة الكتاب على تحسين أعمالهم. يجب أن تكون جميع تحليلاتك ومقترحاتك باللغة العربية الفصحى، مع الحفاظ على لهجة احترافية وموضوعية.
`.trim();

export const TASK_SPECIFIC_INSTRUCTIONS: { [key in TaskType]?: string } = {
  [TaskType.SUMMARIZE]: `
**الهدف:** استخراج وتلخيص النقاط الرئيسية في النص.
**المخرجات المتوقعة:** ملخص موجز وواضح للنص المقدم.
`.trim(),
  [TaskType.ANALYZE_CHARACTERS]: `
**الهدف:** تحليل الشخصيات الرئيسية والثانوية.
**المخرجات المتوقعة:** وصف لكل شخصية، دوافعها، تطورها، وعلاقاتها مع الشخصيات الأخرى.
`.trim(),
};

export const TASKS_EXPECTING_JSON_RESPONSE: TaskType[] = [
  TaskType.ANALYZE_CHARACTERS,
];

export const COMPLETION_ENHANCEMENT_OPTIONS = [
  { id: TaskType.ANALYZE_CHARACTERS, label: 'تحليل الشخصيات' },
];

export const TASK_CATEGORY_MAP: { [key in TaskType]: string } = {
    [TaskType.SUMMARIZE]: 'core',
    [TaskType.ANALYZE_CHARACTERS]: 'analysis',
    [TaskType.COMPLETION]: 'core',
    [TaskType.CREATIVE_WRITING]: 'creative',
    [TaskType.PLOT_PREDICTION]: 'predictive',
    [TaskType.THEMATIC_ANALYSIS]: 'analysis',
    [TaskType.STYLE_ANALYSIS]: 'analysis',
    [TaskType.SCENE_GENERATION]: 'creative',
    [TaskType.WORLDBUILDING]: 'creative',
    [TaskType.TENSION_ANALYSIS]: 'analysis',
    [TaskType.ADAPTATION]: 'transformation',
    [TaskType.VISUAL_ANALYSIS]: 'analysis',
    [TaskType.THEME_MESSAGE_ANALYSIS]: 'analysis',
    [TaskType.RECOMMENDATION]: 'creative',
};