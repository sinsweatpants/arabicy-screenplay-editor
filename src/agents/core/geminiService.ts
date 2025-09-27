

// Fix: Removed ResponseMimeType from import as it's not exported by @google/genai
import { GoogleGenAI, GenerateContentResponse, Part, Content, SafetySetting, HarmCategory, HarmBlockThreshold } from "@google/genai";
// Fix: Import ENHANCED_TASK_DESCRIPTIONS from '../constants'
import { TaskCategory, TaskType } from '../types/types'; 
import { 
  GEMINI_TEXT_MODEL, 
  PROMPT_PERSONA_BASE,
  TASK_SPECIFIC_INSTRUCTIONS,
  TASKS_EXPECTING_JSON_RESPONSE,
  COMPLETION_ENHANCEMENT_OPTIONS, 
  TASK_CATEGORY_MAP
} from '../constants';
import { ENHANCED_TASK_DESCRIPTIONS as TASK_DESCRIPTIONS_FOR_PROMPT } from '../ai/orchestration';


interface ProcessTextsParams {
  processedFiles: ProcessedFile[];
  taskType: TaskType;
  specialRequirements: string;
  additionalInfo: string;
  completionScope?: string; 
  selectedCompletionEnhancements?: TaskType[];
  previousContextText?: string; // For iterative completion
}

let ai: GoogleGenAI | null = null;

const getAiInstance = (): GoogleGenAI => {
  if (!ai) {
    if (!process.env.API_KEY) {
      throw new Error("لم يتم تعيين متغير البيئة API_KEY.");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

const attemptToFixJson = (jsonString: string): string => {
    // Try to extract content between the first '{' and last '}' or first '[' and last ']'
    const objectMatch = jsonString.match(/\{(?:.|\n)*\}/s);
    if (objectMatch && objectMatch[0]) {
        try {
            JSON.parse(objectMatch[0]); 
            return objectMatch[0];
        } catch (e) {
            // console.warn("attemptToFixJson: Extracted object substring is not valid JSON.", e);
        }
    }
    const arrayMatch = jsonString.match(/\[(?:.|\n)*\]/s);
    if (arrayMatch && arrayMatch[0]) {
        try {
            JSON.parse(arrayMatch[0]);
            return arrayMatch[0];
        } catch (e) {
            // console.warn("attemptToFixJson: Extracted array substring is not valid JSON.", e);
        }
    }
    // If no clear object/array found, or if parsing failed, return original string for further debugging
    return jsonString; 
};


const constructPromptParts = (params: ProcessTextsParams): Part[] => {
  const { 
    processedFiles, 
    taskType, 
    specialRequirements, 
    additionalInfo, 
    completionScope,
    selectedCompletionEnhancements,
    previousContextText 
  } = params;
  const parts: Part[] = [];

  let taskSpecificRole = "";
  const taskDescription = TASK_DESCRIPTIONS_FOR_PROMPT[taskType] || "مهمة عامة";
  const category = TASK_CATEGORY_MAP[taskType];
  const taskLabel = taskDescription.split(':')[0].trim();


  switch(category) {
    case TaskCategory.CORE:
      if (taskType === TaskType.COMPLETION) {
        taskSpecificRole = `بصفتك كاتب سيناريو وخبير استكمال نصوص درامية، مع قدرة على دمج تحليلات متقدمة إذا طُلب منك ذلك.`;
      } else {
        taskSpecificRole = `بصفتك خبير تحليل درامي ونقدي، متخصص في "${taskLabel}".`;
      }
      break;
    case TaskCategory.ANALYSIS: 
        taskSpecificRole = `بصفتك خبير تحليل درامي متخصص في "${taskLabel}".`;
      break;
    case TaskCategory.CREATIVE:
      taskSpecificRole = `بصفتك كاتب سيناريو ومؤلف مبدع متخصص في "${taskLabel}".`;
      break;
    case TaskCategory.PREDICTIVE:
      taskSpecificRole = `بصفتك مستشرف وخبير استراتيجي في تطوير الدراما متخصص في "${taskLabel}".`;
      break;
    case TaskCategory.ADVANCED_MODULES:
      // Extract the core name of the module for a more focused role. E.g., "مُحلل الشخصيات العميق"
      const moduleNameOnly = TASK_DESCRIPTIONS_FOR_PROMPT[taskType] ? TASK_DESCRIPTIONS_FOR_PROMPT[taskType].substring(TASK_DESCRIPTIONS_FOR_PROMPT[taskType].indexOf(':') + 1, TASK_DESCRIPTIONS_FOR_PROMPT[taskType].indexOf('-') !==-1 ? TASK_DESCRIPTIONS_FOR_PROMPT[taskType].indexOf('-') : TASK_DESCRIPTIONS_FOR_PROMPT[taskType].length).trim() : taskLabel;
      taskSpecificRole = `بصفتك خبير متخصص في "${moduleNameOnly}", قادر على إجراء تحليلات معمقة وتقديم نتائج منظمة بناءً على المكونات المحددة للوحدة.`;
      break;
    default:
      if (taskType.toString().includes('analysis') || taskType.toString().includes('analyzer')) {
        taskSpecificRole = `بصفتك خبير تحليل درامي متخصص في "${taskLabel}".`;
      } else if (taskType.toString().includes('creative') || taskType.toString().includes('generator') || taskType.toString().includes('builder')) {
        taskSpecificRole = `بصفتك كاتب سيناريو ومؤلف مبدع متخصص في "${taskLabel}".`;
      } else {
        taskSpecificRole = `بصفتك مساعد ذكي متعدد المهام في مجال الدراما والكتابة الإبداعية، متخصص في "${taskLabel}".`;
      }
      break;
  }
  
  parts.push({ text: PROMPT_PERSONA_BASE.replace('CritiqueConstruct AI', `CritiqueConstruct AI. ${taskSpecificRole}`) });

  const taskInstructions = TASK_SPECIFIC_INSTRUCTIONS[taskType];
  if (taskInstructions) {
    parts.push({ text: `\n\n## المهمة المحددة: ${taskDescription}\n${taskInstructions}` });
  } else {
    parts.push({ text: `\n\n## المهمة المحددة: ${taskDescription}\n(لا توجد تعليمات مفصلة لهذا النوع من المهام في الوقت الحالي، اعتمد على فهمك العام للمهمة من خلال وصفها العام.)` });
  }

  if (previousContextText) {
    parts.push({ text: "\n\n## سياق الاستكمال السابق:\n" });
    parts.push({ text: "تم تقديم النص التالي كنتيجة لعملية استكمال سابقة. المطلوب هو مواصلة العمل بناءً على هذا السياق بالإضافة إلى الملفات الأصلية (إذا كانت لا تزال ذات صلة ولم يتم تضمينها بالكامل في هذا السياق) وضمن 'نطاق الاستكمال المطلوب' الجديد." });
    parts.push({ text: "\n--- بداية السياق السابق ---\n" });
    parts.push({ text: previousContextText });
    parts.push({ text: "\n--- نهاية السياق السابق ---\n" });
    parts.push({ text: "يرجى الآن معالجة الملفات الحالية (إذا كانت منفصلة عن السياق أعلاه) والاستمرار في الاستكمال." });
  }
  
  processedFiles.forEach((file, index) => {
    parts.push({ text: `\n\n--- الملف المقدم ${index + 1}: ${file.name} (نوع MIME: ${file.mimeType}) ---` });
    
    if (file.mimeType.startsWith('image/') || file.mimeType === 'application/pdf') {
      if (file.isBase64 && file.content && !file.content.startsWith('[Error:') && !file.content.startsWith('[ملاحظة:')) {
        parts.push({ inlineData: { mimeType: file.mimeType, data: file.content } });
        if (file.mimeType === 'application/pdf'){
            parts.push({text: "[ملاحظة: تم إرسال ملف PDF كبيانات. قد يتمكن النموذج من معالجة المحتوى إذا كان PDF يحتوي على طبقة نصية أو إذا كان النموذج يدعم OCR على ملفات PDF المرسلة بهذه الطريقة. إذا كان المحتوى النصي للـ PDF هو الأساس، يفضل تحويله إلى .txt أو .docx.]"});
        }
      } else if (file.content.startsWith('[Error:') || file.content.startsWith('[ملاحظة:')) {
        parts.push({ text: file.content }); 
      } else {
         parts.push({ text: `[الملف ${file.name} (${file.mimeType}) كان من المتوقع أن يكون base64 ولكن لم تتم معالجته بشكل صحيح أو أن محتواه فارغ.]`});
      }
    } else if (file.mimeType === 'text/plain' || file.mimeType === 'text/markdown') {
      if (file.content.startsWith('[Error:') || file.content.startsWith('[ملاحظة:')) {
        parts.push({ text: file.content });
      } else {
        parts.push({ text: file.content });
      }
    } else if (file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') { 
      if (file.content.startsWith('[Error:') || file.content.startsWith('[ملاحظة:')) { 
        parts.push({ text: file.content }); 
      } else { 
        parts.push({ text: `محتوى من ملف DOCX (${file.name}):\n${file.content}` });
      }
    } else if (file.mimeType === 'application/msword') { 
      parts.push({ text: file.content });
    } else { 
      parts.push({ text: file.content }); 
    }
    parts.push({ text: `--- نهاية الملف ${index + 1}: ${file.name} ---` });
  });
  
  let userRequirementsSection = "\n\n## مواصفات المستخدم الإضافية:\n";
  let hasUserSpecs = false;
  if (specialRequirements) {
    userRequirementsSection += `المتطلبات الخاصة: ${specialRequirements}\n`;
    hasUserSpecs = true;
  }
  if (additionalInfo) {
    userRequirementsSection += `معلومات إضافية: ${additionalInfo}\n`;
    hasUserSpecs = true;
  }
  if (completionScope) {
    userRequirementsSection += `**نطاق الاستكمال المطلوب:** ${completionScope}\n`;
    hasUserSpecs = true;
  }

  if (taskType === TaskType.COMPLETION && selectedCompletionEnhancements && selectedCompletionEnhancements.length > 0) {
    userRequirementsSection += `\n**تحسينات الاستكمال المطلوبة (يجب دمجها بفعالية في النص المستكمل):**\n`;
    selectedCompletionEnhancements.forEach(enhancementId => {
      const enhancementDetail = COMPLETION_ENHANCEMENT_OPTIONS.find(opt => opt.id === enhancementId);
      const enhancementInstructions = TASK_SPECIFIC_INSTRUCTIONS[enhancementId] || `تطبيق مبادئ ${enhancementDetail?.label || enhancementId}.`;
      
      let goalSummary = enhancementDetail?.label || enhancementId;
      const goalMatch = enhancementInstructions.match(/\*\*الهدف:\*\*\s*([^\r\n]+)/);
      if (goalMatch && goalMatch[1]) {
        goalSummary = goalMatch[1];
      }

      userRequirementsSection += `- **${enhancementDetail?.label || enhancementId}:** ${goalSummary}. (راجع التعليمات التفصيلية لهذه المهمة إذا لزم الأمر).\n`;
    });
    hasUserSpecs = true;
  }


  if (!hasUserSpecs) {
    userRequirementsSection += `لم يتم تقديم متطلبات محددة أو نطاق استكمال أو تحسينات من المستخدم بخلاف الملفات ونوع المهمة.\n`;
  }
  parts.push({ text: userRequirementsSection });
  
  const jsonReminderTasks = TASKS_EXPECTING_JSON_RESPONSE.map(t => TASK_DESCRIPTIONS_FOR_PROMPT[t]?.split(':')[0] || t).join(', ');
  parts.push({ text: `\n\n**تذكير بتعليمات الإخراج الصارمة**: اللغة العربية الفصحى. إذا كانت المهمة تتطلب إخراج JSON (مثل مهام: ${jsonReminderTasks}), يجب أن يكون ردك الأساسي هو كائن JSON صالح يتبع الواجهة المحددة للمهمة، وقد يكون محاطًا بـ \`\`\`json ... \`\`\`.` });
  
  return parts;
};


const MAX_RETRIES = 1; 

export const processTextsWithGemini = async (params: ProcessTextsParams, retries: number = 0): Promise<GeminiServiceResponse> => {
  try {
    const genAI = getAiInstance();
    const promptParts = constructPromptParts(params);

    const contents: Content[] = [{ role: "user", parts: promptParts }];

    const shouldExpectJson = TASKS_EXPECTING_JSON_RESPONSE.includes(params.taskType);

    // Base model config
    const modelConfig: any = { 
      temperature: 0.7, 
      topK: 40,         
      topP: 0.95,       
      maxOutputTokens: 8192, 
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }
      ] as SafetySetting[]
    };
    
    const response: GenerateContentResponse = await genAI.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: contents,
      config: modelConfig, 
    });
    
    const rawTextOutput = response.text;

    if (!rawTextOutput) { 
        if (response.candidates && response.candidates[0] && response.candidates[0].finishReason !== "STOP") {
             return { error: ` أنهى Gemini المعالجة بسبب: ${response.candidates[0].finishReason}. قد يكون المحتوى قد تم حظره أو انتهى بشكل غير متوقع.` };
        }
        return { error: "أرجع Gemini استجابة نصية فارغة." };
    }

    let jsonStr = rawTextOutput.trim();
    const fenceRegex = /^(?:\s*```(?:json)?\s*\n?)?([\s\S]*?)(?:\n?\s*```\s*)?$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) { 
      jsonStr = match[1].trim();
    }

    // Only attempt to parse if it looks like a JSON object or array
    if (jsonStr.startsWith('{') || jsonStr.startsWith('[')) {
      try {
        const parsedData: GeminiTaskResultData = JSON.parse(jsonStr);
        return { data: parsedData, rawText: rawTextOutput };
      } catch (e) {
        // First parse failed, try to fix it.
        const fixedJsonStr = attemptToFixJson(jsonStr);
        try {
            const parsedData: GeminiTaskResultData = JSON.parse(fixedJsonStr);
            return { data: parsedData, rawText: rawTextOutput };
        } catch (e2) {
            console.error("فشل في تحليل JSON حتى بعد محاولة الإصلاح:", e2, "\nالنص الأصلي:", rawTextOutput, "\nالنص الذي تمت محاولة إصلاحه:", fixedJsonStr);
            // If it was *supposed* to be JSON, show the user the specific error.
            if (shouldExpectJson) {
                return { data: rawTextOutput, rawText: rawTextOutput, error: "تم استلام نص غير متوقع بدلاً من JSON. يتم عرض النص الخام." };
            }
            // Otherwise, for creative tasks, just fall back to raw text without an error.
            return { data: rawTextOutput, rawText: rawTextOutput };
        }
      }
    }
    
    // If it doesn't look like JSON, treat it as raw text.
    // If we were expecting JSON but got something else entirely, flag it.
    if (shouldExpectJson) {
        return { data: rawTextOutput, rawText: rawTextOutput, error: "تم استلام نص غير متوقع بدلاً من JSON. يتم عرض النص الخام." };
    }

    // Otherwise, it's a valid text response for a creative task.
    return { data: rawTextOutput, rawText: rawTextOutput };

  } catch (e: any) {
    console.error(`خطأ في معالجة النصوص مع Gemini (محاولة ${retries}/${MAX_RETRIES}):`, e);
    
    if (retries < MAX_RETRIES && (e.status >= 500 || (e.message && e.message.toLowerCase().includes("network error")) ) ) {
      console.log(`إعادة المحاولة (${retries + 1}/${MAX_RETRIES})...`);
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries))); 
      return processTextsWithGemini(params, retries + 1);
    }

    let errorMessage = e.message || "حدث خطأ غير معروف مع Gemini API.";
    if (e.toString && e.toString().toLowerCase().includes("api_key")) { 
        errorMessage = "مفتاح Gemini API مفقود أو غير صالح. يرجى التأكد من تكوين متغير البيئة API_KEY بشكل صحيح.";
    } else if (e.message && e.message.toLowerCase().includes("request entity size is larger than limit")) { 
      errorMessage = "حجم الملفات المرسلة أو حجم السياق الكلي يتجاوز الحد المسموح به من Gemini API. يرجى محاولة تقليل حجم الملفات أو عددها، أو تقصير نطاق الاستكمال إذا كنت تستخدم الاستكمال التكراري.";
    } else if (e.message && (e.message.toLowerCase().includes("unsupported mime type") || e.message.toLowerCase().includes("invalid_argument"))) { 
      errorMessage = "واجهت Gemini API مشكلة في معالجة أحد أنواع الملفات المرفوعة أو محتواها. يرجى التحقق من أن الملفات هي من الأنواع المدعومة (نصوص، صور، PDF، DOCX بعد المعالجة) وأنها غير تالفة.";
    } else if (e.status && (e.status === 400 || e.status === 'INVALID_ARGUMENT')) { 
        errorMessage = `خطأ في الطلب إلى Gemini API (قد يكون بسبب محتوى غير متوقع أو تنسيق خاطئ): ${e.message || 'وسيطات غير صالحة.'}`;
    } else if (e.status >= 500) {
        errorMessage = `واجه خادم Gemini API مشكلة (خطأ ${e.status}). يرجى المحاولة مرة أخرى لاحقًا. ${e.message || ''}`;
    }
    
    // More detailed error from Gemini response if available
    if (e.response && e.response.error && e.response.error.message) {
        errorMessage = `خطأ من Gemini API: ${e.response.error.message}`;
    } else if (e.message && e.message.includes("content") && e.message.includes("blocked")) { // Check for content blocking
        errorMessage = `تم حظر المحتوى بواسطة Gemini API بسبب سياسات الأمان. ${e.message}`;
    }


    return { error: errorMessage };
  }
};