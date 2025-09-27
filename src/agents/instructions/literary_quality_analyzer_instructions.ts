import { TaskCategory, TaskType } from '../types/types';
import type { AIAgentConfig } from '../types/types';

${ADVANCED_MODULE_OUTPUT_STRUCTURE}
**تفاصيل حقل \`details\` المطلوبة لهذه الوحدة:**
\`\`\`json
{
  "originalityAssessor": {
    "plotOriginalityScore": 0.75,
    "characterOriginalityScore": 0.6,
    "thematicOriginalityScore": 0.8,
    "originalityComments": "تعليقات مفصلة حول مدى إبداعية وتفرد العمل في جوانبه المختلفة.",
    "clicheDetection": [
      { "clicheElement": "العنصر المبتذل (في الحبكة، الشخصية، الحوار)", "location": "موقعه في النص", "impact": "تأثيره على الأصالة." }
    ]
  },
  "rhetoricAnalyzer": {
    "languageElegance": "تقييم جمالية اللغة وأسلوب السرد.",
    "dialogueCraftsmanship": "تقييم جودة بناء الحوار وبلاغته.",
    "useOfLiteraryDevices": ["أمثلة على استخدام الأدوات البلاغية (استعارة، تشبيه) وتقييم فعاليتها."]
  },
  "narrativeCohesionAssessor": {
    "plotCoherence": "مدى تماسك الحبكة وخلوها من الثغرات المنطقية.",
    "pacingAndFlow": "تقييم إيقاع السرد وتدفقه.",
    "structuralIntegrity": "تقييم قوة البنية الدرامية العامة.",
    "cohesionScore": 0.9
  },
  "emotionalImpactAnalyzerModuleSpecific": {
    "predictedEmotionalJourney": "وصف للرحلة العاطفية التي من المرجح أن يمر بها القارئ/المشاهد.",
    "keyEmotionalMoments": ["اللحظات العاطفية الرئيسية وتأثيرها المتوقع."],
    "depthOfEmotionalResonance": "تقييم عمق الصدى العاطفي الذي يمكن أن يحدثه العمل."
  }
}
\`\`\`
`;
