/**
 * @file This file defines the core TypeScript types and enums used throughout the application.
 * These types ensure consistency and provide strong typing for agent configurations, tasks, and other critical data structures.
 */

/**
 * @enum {string} TaskType
 * @description Defines the unique identifiers for all available agent tasks.
 * This enum is crucial for task routing, agent selection, and configuration mapping.
 */
export const enum TaskType {
    // Core foundational agents
    ANALYSIS = 'analysis',
    CREATIVE = 'creative',
    INTEGRATED = 'integrated',
    COMPLETION = 'completion',
    
    // Advanced analytical agents
    RHYTHM_MAPPING = 'rhythm-mapping',
    CHARACTER_NETWORK = 'character-network',
    DIALOGUE_FORENSICS = 'dialogue-forensics',
    THEMATIC_MINING = 'thematic-mining',
    STYLE_FINGERPRINT = 'style-fingerprint',
    CONFLICT_DYNAMICS = 'conflict-dynamics',
    
    // Creative generation agents
    ADAPTIVE_REWRITING = 'adaptive-rewriting',
    SCENE_GENERATOR = 'scene-generator',
    CHARACTER_VOICE = 'character-voice',
    WORLD_BUILDER = 'world-builder',
    
    // Predictive & optimization agents
    PLOT_PREDICTOR = 'plot-predictor',
    TENSION_OPTIMIZER = 'tension-optimizer',
    AUDIENCE_RESONANCE = 'audience-resonance',
    PLATFORM_ADAPTER = 'platform-adapter',
    
    // Advanced specialized modules
    CHARACTER_DEEP_ANALYZER = 'character-deep-analyzer',
    DIALOGUE_ADVANCED_ANALYZER = 'dialogue-advanced-analyzer',
    VISUAL_CINEMATIC_ANALYZER = 'visual-cinematic-analyzer',
    THEMES_MESSAGES_ANALYZER = 'themes-messages-analyzer',
    CULTURAL_HISTORICAL_ANALYZER = 'cultural-historical-analyzer',
    PRODUCIBILITY_ANALYZER = 'producibility-analyzer',
    TARGET_AUDIENCE_ANALYZER = 'target-audience-analyzer',
    LITERARY_QUALITY_ANALYZER = 'literary-quality-analyzer',
    RECOMMENDATIONS_GENERATOR = 'recommendations-generator'
}

/**
 * @enum {string} TaskCategory
 * @description Categorizes agents into broad functional groups.
 * This helps in organizing and presenting agents to the user.
 */
export const enum TaskCategory {
    CORE = 'CORE',
    ANALYSES = 'ANALYSES',
    AGENTS = 'AGENTS'
}

/**
 * @interface CompletionEnhancementOption
 * @description Defines the structure for an option that can enhance a completion task.
 * @property {TaskType} id - The unique identifier for the enhancement task.
 * @property {string} label - The user-facing label for the enhancement option.
 */
export interface CompletionEnhancementOption {
    id: TaskType;
    label: string;
}

/**
 * @interface AIAgentConfig
 * @description Provides a comprehensive configuration for an AI agent.
 * This interface details everything from the agent's identity and capabilities to its operational parameters.
 * @property {TaskType} id - The unique identifier for the agent, linking it to a specific task.
 * @property {string} name - The user-friendly name of the agent.
 * @property {string} description - A detailed description of the agent's purpose and functionality.
 * @property {TaskCategory} category - The category the agent belongs to.
 * @property {object} capabilities - A detailed object outlining the agent's technical and cognitive abilities.
 * @property {TaskType[]} collaboratesWith - A list of other agents this agent can collaborate with.
 * @property {TaskType[]} dependsOn - A list of agents whose output is required before this agent can run.
 * @property {TaskType[]} enhances - A list of agents that this agent can enhance.
 * @property {string} systemPrompt - The base instruction or persona given to the AI model.
 * @property {any[]} fewShotExamples - Examples provided to the model to guide its responses.
 * @property {string} chainOfThoughtTemplate - A template for structured, multi-step reasoning.
 * @property {string} cacheStrategy - The caching mechanism to use for the agent's responses.
 * @property {boolean} parallelizable - Indicates if the agent can be run in parallel with others.
 * @property {boolean} batchProcessing - Indicates if the agent supports processing multiple inputs at once.
 * @property {string[]} validationRules - Rules for validating the agent's output.
 * @property {any} outputSchema - The expected schema of the agent's output.
 * @property {number} confidenceThreshold - The minimum confidence level required for the agent to return a result.
 */
export interface AIAgentConfig {
    id: TaskType;
    name: string;
    description: string;
    category: TaskCategory;
    capabilities: {
        multiModal: boolean;
        reasoningChains: boolean;
        toolUse: boolean;
        memorySystem: boolean;
        selfReflection: boolean;
        ragEnabled: boolean;
        vectorSearch: boolean;
        agentOrchestration: boolean;
        metacognitive: boolean;
        adaptiveLearning: boolean;
        complexityScore: number;
        accuracyLevel: number;
        processingSpeed: 'fast' | 'medium' | 'slow' | 'adaptive';
        resourceIntensity: 'low' | 'medium' | 'high' | 'variable';
        languageModeling: boolean;
        patternRecognition: boolean;
        creativeGeneration: boolean;
        analyticalReasoning: boolean;
        emotionalIntelligence: boolean;
        [key: string]: any;
    };
    collaboratesWith: TaskType[];
    dependsOn: TaskType[];
    enhances: TaskType[];
    systemPrompt: string;
    fewShotExamples: any[];
    chainOfThoughtTemplate: string;
    cacheStrategy: string;
    parallelizable: boolean;
    batchProcessing: boolean;
    validationRules: string[];
    outputSchema: any;
    confidenceThreshold: number;
}