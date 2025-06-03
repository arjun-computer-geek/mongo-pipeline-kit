import { IPipelineBuilder, Pipeline, PipelineStage } from './types';

/**
 * Main class for building MongoDB aggregation pipelines
 */
export class PipelineBuilder implements IPipelineBuilder {
    private stages: PipelineStage[] = [];

    /**
     * Add a $match stage to the pipeline
     * @param condition The match condition
     */
    match(condition: object): this {
        this.stages.push({ $match: condition });
        return this;
    }

    /**
     * Add a $group stage to the pipeline
     * @param expression The group expression
     */
    group(expression: object): this {
        this.stages.push({ $group: expression });
        return this;
    }

    /**
     * Add a $sort stage to the pipeline
     * @param sort The sort specification
     */
    sort(sort: object): this {
        this.stages.push({ $sort: sort });
        return this;
    }

    /**
     * Add a $limit stage to the pipeline
     * @param n The number of documents to limit to
     */
    limit(n: number): this {
        if (n < 0) {
            throw new Error('Limit value must be non-negative');
        }
        this.stages.push({ $limit: n });
        return this;
    }

    /**
     * Add a $skip stage to the pipeline
     * @param n The number of documents to skip
     */
    skip(n: number): this {
        if (n < 0) {
            throw new Error('Skip value must be non-negative');
        }
        this.stages.push({ $skip: n });
        return this;
    }

    /**
     * Add a $project stage to the pipeline
     * @param projection The projection specification
     */
    project(projection: object): this {
        this.stages.push({ $project: projection });
        return this;
    }

    /**
     * Add a custom stage to the pipeline
     * @param stage The pipeline stage to add
     */
    addStage(stage: PipelineStage): this {
        if (!stage || typeof stage !== 'object') {
            throw new Error('Invalid pipeline stage');
        }
        this.stages.push(stage);
        return this;
    }

    /**
     * Build the final pipeline
     * @returns The complete pipeline array
     */
    build(): Pipeline {
        return [...this.stages];
    }

    /**
     * Clear all stages from the pipeline
     */
    clear(): this {
        this.stages = [];
        return this;
    }

    /**
     * Get the current number of stages in the pipeline
     */
    getStageCount(): number {
        return this.stages.length;
    }

    /**
     * Get a specific stage from the pipeline
     * @param index The index of the stage to retrieve
     */
    getStage(index: number): PipelineStage | undefined {
        return this.stages[index];
    }

    /**
     * Replace a stage in the pipeline
     * @param index The index of the stage to replace
     * @param stage The new stage
     */
    replaceStage(index: number, stage: PipelineStage): this {
        if (index < 0 || index >= this.stages.length) {
            throw new Error('Invalid stage index');
        }
        this.stages[index] = stage;
        return this;
    }

    /**
     * Remove a stage from the pipeline
     * @param index The index of the stage to remove
     */
    removeStage(index: number): this {
        if (index < 0 || index >= this.stages.length) {
            throw new Error('Invalid stage index');
        }
        this.stages.splice(index, 1);
        return this;
    }
} 