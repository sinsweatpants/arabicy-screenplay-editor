/**
 * @file This file serves as the central hub for all agent configurations.
 * It imports configurations from their respective modules and aggregates them into a single,
 * easily accessible, and immutable array. This centralization simplifies agent management
 * and ensures a consistent structure across the application.
 */

import type { AIAgentConfig } from '../../types/types';

// CORE AGENTS
import { INTEGRATED_AGENT_CONFIG } from './integratedAgent';

// ANALYSIS AGENTS
import { ANALYSIS_AGENT_CONFIG } from '../analysis/analysisAgent';
import { RHYTHM_MAPPING_AGENT_CONFIG } from '../analysis/rhythmMappingAgent';
import { CHARACTER_NETWORK_AGENT_CONFIG } from '../analysis/characterNetworkAgent';
import { DIALOGUE_FORENSICS_AGENT_CONFIG } from '../analysis/dialogueForensicsAgent';
import { CONFLICT_DYNAMICS_AGENT_CONFIG } from '../analysis/conflictDynamicsAgent';
import { CHARACTER_DEEP_ANALYZER_AGENT_CONFIG } from '../analysis/characterDeepAnalyzerAgent';
import { DIALOGUE_ADVANCED_ANALYZER_AGENT_CONFIG } from '../analysis/dialogueAdvancedAnalyzerAgent';
import { CULTURAL_HISTORICAL_ANALYZER_AGENT_CONFIG } from '../analysis/culturalHistoricalAnalyzerAgent';
import { PRODUCIBILITY_ANALYZER_AGENT_CONFIG } from '../analysis/producibilityAnalyzerAgent';
import { TARGET_AUDIENCE_ANALYZER_AGENT_CONFIG } from '../analysis/targetAudienceAnalyzerAgent';
import { LITERARY_QUALITY_ANALYZER_AGENT_CONFIG } from '../analysis/literaryQualityAnalyzerAgent';
import { THEMES_MESSAGES_ANALYZER_AGENT_CONFIG } from '../analysis/themesMessagesAnalyzerAgent';
import { VISUAL_CINEMATIC_ANALYZER_AGENT_CONFIG } from '../analysis/visualCinematicAnalyzerAgent';
import { CHARACTER_VOICE_AGENT_CONFIG } from '../analysis/characterVoiceAgent';
import { PLOT_PREDICTOR_AGENT_CONFIG } from '../analysis/plotPredictorAgent';
import { THEMATIC_MINING_AGENT_CONFIG } from '../analysis/thematicMiningAgent';

// GENERATION AGENTS
import { CREATIVE_AGENT_CONFIG } from '../generation/creativeAgent';
import { COMPLETION_AGENT_CONFIG } from '../generation/completionAgent';
import { SCENE_GENERATOR_AGENT_CONFIG } from '../generation/sceneGeneratorAgent';
import { WORLD_BUILDER_AGENT_CONFIG } from '../generation/worldBuilderAgent';
import { RECOMMENDATIONS_GENERATOR_AGENT_CONFIG } from '../generation/recommendationsGeneratorAgent';

// TRANSFORMATION AGENTS
import { ADAPTIVE_REWRITING_AGENT_CONFIG } from '../transformation/adaptiveRewritingAgent';
import { PLATFORM_ADAPTER_AGENT_CONFIG } from '../transformation/platformAdapterAgent';
import { STYLE_FINGERPRINT_AGENT_CONFIG } from '../transformation/styleFingerprintAgent';

// EVALUATION AGENTS
import { AUDIENCE_RESONANCE_AGENT_CONFIG } from '../evaluation/audienceResonanceAgent';
import { TENSION_OPTIMIZER_AGENT_CONFIG } from '../evaluation/tensionOptimizerAgent';


/**
 * @const {ReadonlyArray<AIAgentConfig>} AGENT_CONFIGS
 * @description An immutable, frozen array containing all agent configurations, categorized for clarity.
 * This structure ensures that the configurations cannot be altered at runtime, providing stability and predictability.
 */
export const AGENT_CONFIGS = Object.freeze<AIAgentConfig[]>([
  // === CORE FOUNDATIONAL AGENTS ===
  ANALYSIS_AGENT_CONFIG,
  CREATIVE_AGENT_CONFIG,
  INTEGRATED_AGENT_CONFIG,
  COMPLETION_AGENT_CONFIG,

  // === ADVANCED ANALYTICAL AGENTS ===
  RHYTHM_MAPPING_AGENT_CONFIG,
  CHARACTER_NETWORK_AGENT_CONFIG,
  DIALOGUE_FORENSICS_AGENT_CONFIG,
  THEMATIC_MINING_AGENT_CONFIG,
  STYLE_FINGERPRINT_AGENT_CONFIG,
  CONFLICT_DYNAMICS_AGENT_CONFIG,

  // === CREATIVE GENERATION AGENTS ===
  ADAPTIVE_REWRITING_AGENT_CONFIG,
  SCENE_GENERATOR_AGENT_CONFIG,
  CHARACTER_VOICE_AGENT_CONFIG,
  WORLD_BUILDER_AGENT_CONFIG,

  // === PREDICTIVE & OPTIMIZATION AGENTS ===
  PLOT_PREDICTOR_AGENT_CONFIG,
  TENSION_OPTIMIZER_AGENT_CONFIG,
  AUDIENCE_RESONANCE_AGENT_CONFIG,
  PLATFORM_ADAPTER_AGENT_CONFIG,

  // === ADVANCED SPECIALIZED MODULES ===
  CHARACTER_DEEP_ANALYZER_AGENT_CONFIG,
  DIALOGUE_ADVANCED_ANALYZER_AGENT_CONFIG,
  VISUAL_CINEMATIC_ANALYZER_AGENT_CONFIG,
  THEMES_MESSAGES_ANALYZER_AGENT_CONFIG,
  CULTURAL_HISTORICAL_ANALYZER_AGENT_CONFIG,
  PRODUCIBILITY_ANALYZER_AGENT_CONFIG,
  TARGET_AUDIENCE_ANALYZER_AGENT_CONFIG,
  LITERARY_QUALITY_ANALYZER_AGENT_CONFIG,
  RECOMMENDATIONS_GENERATOR_AGENT_CONFIG,
]);