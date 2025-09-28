/**
 * @file This file centralizes all agent configurations, making them easily accessible throughout the application.
 * It imports individual agent configurations and exports them as a single, frozen array to prevent modifications at runtime.
 */

// Export all agent configurations
import { ANALYSIS_AGENT_CONFIG } from '../agents/analysis/analysisAgent.ts';
import { CREATIVE_AGENT_CONFIG } from '../agents/creativeAgent.ts';
import { INTEGRATED_AGENT_CONFIG } from '../agents/integratedAgent.ts';
import { COMPLETION_AGENT_CONFIG } from '../agents/completionAgent.ts';
import { RHYTHM_MAPPING_AGENT_CONFIG } from '../agents/analysis/rhythmMappingAgent.ts';
import { CHARACTER_NETWORK_AGENT_CONFIG } from '../agents/analysis/characterNetworkAgent.ts';
import { DIALOGUE_FORENSICS_AGENT_CONFIG } from '../agents/analysis/dialogueForensicsAgent.ts';
import { THEMATIC_MINING_AGENT_CONFIG } from '../agents/thematicMiningAgent.ts';
import { STYLE_FINGERPRINT_AGENT_CONFIG } from '../agents/styleFingerprintAgent.ts';
import { CONFLICT_DYNAMICS_AGENT_CONFIG } from '../agents/analysis/conflictDynamicsAgent.ts';
import { SCENE_GENERATOR_AGENT_CONFIG } from '../agents/sceneGeneratorAgent.ts';
import { CHARACTER_VOICE_AGENT_CONFIG } from '../agents/analysis/characterVoiceAgent.ts';
import { WORLD_BUILDER_AGENT_CONFIG } from '../agents/worldBuilderAgent.ts';
import { PLOT_PREDICTOR_AGENT_CONFIG } from '../agents/analysis/plotPredictorAgent.ts';
import { TENSION_OPTIMIZER_AGENT_CONFIG } from '../agents/tensionOptimizerAgent.ts';
import { AUDIENCE_RESONANCE_AGENT_CONFIG } from '../agents/audienceResonanceAgent.ts';
import { PLATFORM_ADAPTER_AGENT_CONFIG } from '../agents/platformAdapterAgent.ts';
import { CHARACTER_DEEP_ANALYZER_AGENT_CONFIG } from '../agents/analysis/characterDeepAnalyzerAgent.ts';
import { DIALOGUE_ADVANCED_ANALYZER_AGENT_CONFIG } from '../agents/analysis/dialogueAdvancedAnalyzerAgent.ts';
import { VISUAL_CINEMATIC_ANALYZER_AGENT_CONFIG } from '../agents/visualCinematicAnalyzerAgent.ts';
import { THEMES_MESSAGES_ANALYZER_AGENT_CONFIG } from '../agents/themesMessagesAnalyzerAgent.ts';
import { CULTURAL_HISTORICAL_ANALYZER_AGENT_CONFIG } from '../agents/analysis/culturalHistoricalAnalyzerAgent.ts';
import { PRODUCIBILITY_ANALYZER_AGENT_CONFIG } from '../agents/analysis/producibilityAnalyzerAgent.ts';
import { TARGET_AUDIENCE_ANALYZER_AGENT_CONFIG } from '../agents/analysis/targetAudienceAnalyzerAgent.ts';
import { LITERARY_QUALITY_ANALYZER_AGENT_CONFIG } from '../agents/analysis/literaryQualityAnalyzerAgent.ts';
import { RECOMMENDATIONS_GENERATOR_AGENT_CONFIG } from '../agents/recommendationsGeneratorAgent.ts';
import { ADAPTIVE_REWRITING_AGENT_CONFIG } from '../agents/adaptiveRewritingAgent.ts';

/**
 * @const {ReadonlyArray<AgentConfig>} AGENT_CONFIGS
 * @description A frozen array of all agent configurations, categorized for clarity.
 * This structure ensures that the configurations cannot be altered at runtime, providing stability.
 */
export const AGENT_CONFIGS = Object.freeze([
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