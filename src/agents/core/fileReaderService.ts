
import { TaskCategory, TaskType } from '../types/types';
import mammoth from 'mammoth';

const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};

const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove "data:mime/type;base64," prefix
      resolve(result.substring(result.indexOf(',') + 1));
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

export const processFilesForGemini = async (files: File[]): Promise<ProcessedFile[]> => {
  return Promise.all(
    files.map(async (file): Promise<ProcessedFile> => {
      const { name, type: mimeType, size } = file;
      
      if (mimeType === 'text/plain' || mimeType === 'text/markdown') {
        try {
          const content = await readFileAsText(file);
          return { name, mimeType, content, isBase64: false, size };
        } catch (e: any) {
          console.error(`Error reading text file ${name} (${mimeType}):`, e);
          return { name, mimeType, content: `[Error: تعذر قراءة الملف النصي '${name}'. السبب: ${e.message || 'فشل غير معروف في قراءة الملف.'}]`, isBase64: false, size };
        }
      }
      
      if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') { // .docx
        try {
          const arrayBuffer = await readFileAsArrayBuffer(file);
          const result = await mammoth.extractRawText({ arrayBuffer });
          if (!result.value || result.value.trim() === "") {
            console.warn(`Mammoth.js extracted empty or whitespace-only content from DOCX ${name}. Messages: ${JSON.stringify(result.messages)}`);
            return { 
              name, 
              mimeType, 
              content: `[ملاحظة: لم يتم استخراج أي نص من ملف DOCX '${name}'. قد يكون الملف فارغًا تمامًا، أو يحتوي على صور/عناصر غير نصية فقط، أو أن النص لم يتم التعرف عليه. رسائل Mammoth (للتشخيص): ${JSON.stringify(result.messages)}]`, 
              isBase64: false, 
              size 
            };
          }
          return { name, mimeType, content: result.value, isBase64: false, size };
        } catch (error: any) {
          console.error(`Error processing DOCX file ${name}:`, error);
          return { name, mimeType, content: `[Error: تعذر استخراج النص من ملف DOCX '${name}'. السبب: ${error.message || 'الملف تالف أو غير مدعوم من قبل mammoth.js. يرجى التأكد أن الملف غير محمي بكلمة مرور وأن محتواه نصي بشكل أساسي.'}]`, isBase64: false, size };
        }
      }
      
      if (mimeType === 'application/msword') { // .doc
        return { 
          name, 
          mimeType, 
          content: `[ملاحظة: ملفات .doc القديمة (${name}) لا يمكن تحليلها مباشرة في المتصفح. يرجى تحويل الملف إلى .docx, .txt, أو .pdf لمعالجة المحتوى، أو تلخيص محتواه في حقول الإدخال النصية.]`, 
          isBase64: false, 
          size 
        };
      }
      
      if (mimeType === 'application/pdf' || mimeType.startsWith('image/')) {
        try {
          const content = await readFileAsBase64(file);
          return { name, mimeType, content, isBase64: true, size };
        } catch (e: any) {
          console.error(`Error reading base64 file ${name} (${mimeType}):`, e);
          // For base64, even if there's an error, the content field should be a string.
          // isBase64: true is problematic if content is an error string. Let's set to false here.
          // Gemini service will check isBase64 and then if content is an error string.
          return { name, mimeType, content: `[Error: تعذر تحويل ملف '${name}' إلى base64. السبب: ${e.message || 'فشل غير معروف.'}]`, isBase64: false, size };
        }
      }
      
      // Fallback for other unknown types
      console.warn(`Unsupported file type ${mimeType} for file ${name}. Attempting to read as text, but this might not be effective.`);
      try {
        const content = await readFileAsText(file);
        return { name, mimeType, content: `[ملاحظة: تم التعامل مع الملف ${name} (${mimeType}) كملف نصي. قد لا تكون هذه المعالجة مثالية إذا لم يكن الملف نصيًا بالفعل.]\n${content}`, isBase64: false, size };
      } catch (e: any) {
        console.error(`Could not read file ${name} as text or base64.`, e);
        return { name, mimeType, content: `[Error: تعذر قراءة محتوى الملف ${name} (${mimeType}). الملف قد يكون تالفًا أو من نوع غير مدعوم بشكل كامل للمعالجة المباشرة. السبب: ${e.message || 'فشل غير معروف.'}]`, isBase64: false, size };
      }
    })
  );
};
