import type { JSX } from 'react';
import NaqidDashboard from './components/naqid/NaqidDashboard';

/**
 * Renders the root application shell that hosts the screenplay editor experience.
 *
 * @returns {JSX.Element} The fully configured screenplay editor component.
 */
export default function App(): JSX.Element {
  return <NaqidDashboard />;
}
