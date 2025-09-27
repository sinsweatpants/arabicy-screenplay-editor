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

export const enum TaskCategory {
    CORE = 'CORE',
    ANALYSES = 'ANALYSES',
    AGENTS = 'AGENTS'
}

export interface CompletionEnhancementOption {
    id: TaskType;
    label: string;
}

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