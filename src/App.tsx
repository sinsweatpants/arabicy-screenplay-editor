import type { JSX } from 'react';
import { useState } from 'react';
import CleanIntegratedScreenplayEditor from './components/editor/CleanIntegratedScreenplayEditor';
import NaqidDashboard from './components/naqid/NaqidDashboard';

// Feature flag for interface switching - default to advanced editor
const USE_ADVANCED_EDITOR = true;

/**
 * Renders the root application shell that hosts the screenplay editor experience.
 *
 * @returns {JSX.Element} The fully configured screenplay editor component.
 */
export default function App(): JSX.Element {
  const [useAdvancedEditor, setUseAdvancedEditor] = useState(USE_ADVANCED_EDITOR);

  return (
    <div className="min-h-screen">
      {/* Interface Toggle - Hidden in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-2 left-2 z-50 bg-gray-800 text-white p-2 rounded text-xs">
          <button 
            onClick={() => setUseAdvancedEditor(!useAdvancedEditor)}
            className="hover:bg-gray-700 px-2 py-1 rounded"
          >
            {useAdvancedEditor ? 'التبديل للتحليل السريع' : 'التبديل للمحرر المتقدم'}
          </button>
        </div>
      )}
      
      {useAdvancedEditor ? <CleanIntegratedScreenplayEditor /> : <NaqidDashboard />}
    </div>
  );
}
