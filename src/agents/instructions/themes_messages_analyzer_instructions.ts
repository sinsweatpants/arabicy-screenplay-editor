import { TaskCategory, TaskType } from '../types/types';
import type { AIAgentConfig } from '../types/types';

${ADVANCED_MODULE_OUTPUT_STRUCTURE}
**تفاصيل حقل \`details\` المطلوبة لهذه الوحدة:**
\`\`\`json
{
  "mainThemesExtractor": [
    { "themeName": "اسم الموضوع الرئيسي", "description": "شرح للموضوع وكيفية ظهوره في النص", "keyExamples": ["أمثلة من النص تدعم الموضوع"] }
  ],
  "philosophicalDepthAnalyzer": {
    "identifiedPhilosophicalDimensions": ["البعد الفلسفي الأول (مثال: الوجودية، العدالة)", "البعد الفلسفي الثاني"],
    "discussionOfDepth": "نقاش حول العمق الفلسفي للعمل وكيفية معالجته لهذه الأبعاد.",
    "relatedPhilosophicalConcepts": ["مفاهيم فلسفية ذات صلة"]
  },
  "hiddenMessagesDetector": [
    { "inferredMessage": "الرسالة الضمنية أو المخفية المستنبطة", "supportingEvidence": "الأدلة من النص التي تدعم هذا الاستنباط", "potentialImpact": "التأثير المحتمل لهذه الرسالة على الجمهور." }
  ],
  "thematicCohesionAssessor": {
    "cohesionScore": 0.85,
    "analysisOfCohesion": "تحليل مدى ترابط الموضوعات المختلفة وكيف تخدم بعضها البعض.",
    "pointsOfPotentialConflictOrUnity": "نقاط قد تتعارض فيها الموضوعات أو تتحد."
  },
  "thematicOriginalityAnalyzer": {
    "originalityScore": 0.6,
    "comparisonToCommonThemes": "مقارنة بمعالجة الموضوعات الشائعة في هذا النوع.",
    "innovativeAspects": "الجوانب المبتكرة في معالجة الموضوعات."
  }
}
\`\`\`
`;
