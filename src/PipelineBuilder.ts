import { IPipelineBuilder, Pipeline, PipelineStage } from './types';

/**
 * Main class for building MongoDB aggregation pipelines
 */
export class PipelineBuilder implements IPipelineBuilder {
    private stages: PipelineStage[] = [];

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
     * Add a $addFields stage to the pipeline
     * @param fields The fields to add
     */
    addFields(fields: object): this {
        this.stages.push({ $addFields: fields });
        return this;
    }

    /**
     * Add a $bucket stage to the pipeline
     * @param options The bucket options
     */
    bucket(options: object): this {
        this.stages.push({ $bucket: options });
        return this;
    }

    /**
     * Add a $bucketAuto stage to the pipeline
     * @param options The bucketAuto options
     */
    bucketAuto(options: object): this {
        this.stages.push({ $bucketAuto: options });
        return this;
    }

    /**
     * Add a $collStats stage to the pipeline
     * @param options The collStats options
     */
    collStats(options: object): this {
        this.stages.push({ $collStats: options });
        return this;
    }

    /**
     * Add a $count stage to the pipeline
     * @param fieldName The name of the output field
     */
    count(fieldName: string): this {
        this.stages.push({ $count: fieldName });
        return this;
    }

    /**
     * Add a $facet stage to the pipeline
     * @param options The facet options
     */
    facet(options: object): this {
        this.stages.push({ $facet: options });
        return this;
    }

    /**
     * Add a $geoNear stage to the pipeline
     * @param options The geoNear options
     */
    geoNear(options: object): this {
        this.stages.push({ $geoNear: options });
        return this;
    }

    /**
     * Add a $graphLookup stage to the pipeline
     * @param options The graphLookup options
     */
    graphLookup(options: object): this {
        this.stages.push({ $graphLookup: options });
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
     * Add a $indexStats stage to the pipeline
     * @param options The indexStats options
     */
    indexStats(options: object): this {
        this.stages.push({ $indexStats: options });
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
     * Add a $lookup stage to the pipeline
     * @param options The lookup options
     */
    lookup(options: object): this {
        this.stages.push({ $lookup: options });
        return this;
    }

    /**
     * Add a $match stage to the pipeline
     * @param condition The match condition
     */
    match(condition: object): this {
        this.stages.push({ $match: condition });
        return this;
    }

    /**
     * Add a $merge stage to the pipeline
     * @param options The merge options
     */
    merge(options: object): this {
        this.stages.push({ $merge: options });
        return this;
    }

    /**
     * Add an $out stage to the pipeline
     * @param collection The output collection name or options
     */
    out(collection: string | object): this {
        this.stages.push({ $out: collection });
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
     * Add a $redact stage to the pipeline
     * @param expression The redact expression
     */
    redact(expression: object): this {
        this.stages.push({ $redact: expression });
        return this;
    }

    /**
     * Add a $replaceRoot stage to the pipeline
     * @param newRoot The new root document
     */
    replaceRoot(newRoot: object): this {
        this.stages.push({ $replaceRoot: newRoot });
        return this;
    }

    /**
     * Add a $replaceWith stage to the pipeline
     * @param newRoot The new root document
     */
    replaceWith(newRoot: object): this {
        this.stages.push({ $replaceWith: newRoot });
        return this;
    }

    /**
     * Add a $sample stage to the pipeline
     * @param options The sample options
     */
    sample(options: { size: number }): this {
        this.stages.push({ $sample: options });
        return this;
    }

    /**
     * Add a $setWindowFields stage to the pipeline
     * @param options The setWindowFields options
     */
    setWindowFields(options: object): this {
        this.stages.push({ $setWindowFields: options });
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
     * Add a $sort stage to the pipeline
     * @param sort The sort specification
     */
    sort(sort: object): this {
        this.stages.push({ $sort: sort });
        return this;
    }

    /**
     * Add a $sortByCount stage to the pipeline
     * @param expression The expression to group by
     */
    sortByCount(expression: any): this {
        this.stages.push({ $sortByCount: expression });
        return this;
    }

    /**
     * Add a $unionWith stage to the pipeline
     * @param options The collection to union with, or options object
     */
    unionWith(options: string | object): this {
        this.stages.push({ $unionWith: options });
        return this;
    }

    /**
     * Add an $unset stage to the pipeline
     * @param fields The field or fields to remove
     */
    unset(fields: string | string[]): this {
        this.stages.push({ $unset: fields });
        return this;
    }

    /**
     * Add a $unwind stage to the pipeline
     * @param field The field path to unwind or an object with unwind options
     */
    unwind(field: string | object): this {
        this.stages.push({ $unwind: field });
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