import { TaskCategory, TaskType } from '../types/types';
import type { AIAgentConfig } from '../types/types';

${ADVANCED_MODULE_OUTPUT_STRUCTURE}
**تفاصيل حقل \`details\` المطلوبة لهذه الوحدة:**
\`\`\`json
{
  "directorialInstructionsInterpreter": {
    "keyStageDirections": [
      { "directionText": "نص التعليمات الإخراجية", "interpretation": "تفسير الرؤية البصرية المقصودة (إضاءة، كاميرا، تكوين)" }
    ],
    "overallVisualVision": "ملخص للرؤية البصرية العامة المستنبطة من التعليمات."
  },
  "atmosphereAnalyzer": [
    {
      "sceneOrSection": "وصف المشهد أو الجزء",
      "visualMood": "الحالة المزاجية البصرية (مثال: قاتم، مشرق، متوتر)",
      "contributingElements": ["العناصر البصرية المساهمة في الجو (ألوان، إضاءة، بيئة)"]
    }
  ],
  "visualSymbolismDetector": [
    {
      "symbolDescription": "وصف الرمز البصري أو الاستعارة المرئية",
      "potentialMeanings": ["المعاني المحتملة للرمز"],
      "thematicConnection": "كيف يرتبط الرمز بالموضوعات الرئيسية."
    }
  ],
  "shootabilityAssessor": {
    "overallShootabilityScore": 0.7,
    "challengingScenes": [
      { "sceneDescription": "وصف المشهد", "potentialChallenges": ["تحديات الإنتاج المحتملة (مؤثرات خاصة، مواقع معقدة)"] }
    ],
    "shootabilityNotes": "ملاحظات عامة حول قابلية النص للتصوير."
  },
  "cinematicFlowAnalyzer": {
    "sceneTransitionAnalysis": "تحليل عام لتدفق المشاهد والانتقالات بينها (مثال: سلس، متقطع، إيقاع سريع).",
    "keyTransitions": [
      { "fromScene": "وصف المشهد السابق", "toScene": "وصف المشهد التالي", "transitionType": "نوع الانتقال (قطع، مزج، تلاشي - إذا أمكن استنباطه)", "effect": "تأثير هذا الانتقال على السرد." }
    ],
    "pacingAndRhythmVisuals": "كيف يساهم التدفق البصري في الإيقاع العام."
  }
}
\`\`\`
`;
