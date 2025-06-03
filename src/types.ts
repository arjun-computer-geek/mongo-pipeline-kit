/**
 * Represents a single MongoDB pipeline stage
 */
export type PipelineStage = {
    [key: string]: any;
};

/**
 * Represents a complete MongoDB pipeline
 */
export type Pipeline = PipelineStage[];

/**
 * Options for pipeline validation
 */
export interface ValidationOptions {
    strict?: boolean;
    allowEmpty?: boolean;
    maxStages?: number;
}

/**
 * Options for pipeline composition
 */
export interface CompositionOptions {
    deduplicate?: boolean;
    validate?: boolean;
    validationOptions?: ValidationOptions;
}

/**
 * Pipeline stage builder interface
 */
export interface StageBuilder {
    build(): PipelineStage;
}

/**
 * Pipeline builder interface
 */
export interface IPipelineBuilder {
    match(condition: object): this;
    group(expression: object): this;
    sort(sort: object): this;
    limit(n: number): this;
    skip(n: number): this;
    project(projection: object): this;
    addStage(stage: PipelineStage): this;
    build(): Pipeline;
}

/**
 * Pipeline composer interface
 */
export interface IPipelineComposer {
    compose(...pipelines: Pipeline[]): this;
    extend(basePipeline: Pipeline, extension: Pipeline): this;
    validate(pipeline: Pipeline, options?: ValidationOptions): boolean;
    build(): Pipeline;
}

/**
 * Error types for pipeline operations
 */
export class PipelineError extends Error {
    constructor(message: string, public code: string) {
        super(message);
        this.name = 'PipelineError';
    }
}

export class ValidationError extends PipelineError {
    constructor(message: string) {
        super(message, 'VALIDATION_ERROR');
        this.name = 'ValidationError';
    }
}

export class CompositionError extends PipelineError {
    constructor(message: string) {
        super(message, 'COMPOSITION_ERROR');
        this.name = 'CompositionError';
    }
} 