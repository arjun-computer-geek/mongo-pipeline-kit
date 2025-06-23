import { Pipeline, PipelineStage, ValidationOptions } from "./types";

/**
 * Utility class for pipeline operations
 */
export class PipelineUtils {
  /**
   * Parse a JSON string into a pipeline
   * @param jsonString JSON string representation of a pipeline
   * @returns Parsed pipeline
   */
  static fromJSON(jsonString: string): Pipeline {
    try {
      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed)) {
        throw new Error("JSON must represent an array of pipeline stages");
      }
      return parsed;
    } catch (error) {
      throw new Error(`Failed to parse pipeline JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Convert pipeline to JSON string
   * @param pipeline The pipeline to convert
   * @param pretty Whether to format the JSON with indentation
   * @returns JSON string representation
   */
  static toJSON(pipeline: Pipeline, pretty: boolean = false): string {
    return pretty ? JSON.stringify(pipeline, null, 2) : JSON.stringify(pipeline);
  }

  /**
   * Validate pipeline structure
   * @param pipeline The pipeline to validate
   * @param options Validation options
   * @returns True if valid, throws error if invalid
   */
  static validate(pipeline: Pipeline, options: ValidationOptions = {}): boolean {
    const { strict = true, allowEmpty = false, maxStages = 1000 } = options;

    if (!Array.isArray(pipeline)) {
      throw new Error("Pipeline must be an array");
    }

    if (pipeline.length === 0 && !allowEmpty) {
      throw new Error("Pipeline cannot be empty");
    }

    if (pipeline.length > maxStages) {
      throw new Error(`Pipeline exceeds maximum stage limit of ${maxStages}`);
    }

    for (const stage of pipeline) {
      if (!stage || typeof stage !== "object") {
        throw new Error("Invalid pipeline stage: must be an object");
      }

      if (strict) {
        const operators = Object.keys(stage);
        if (operators.length !== 1) {
          throw new Error("Each pipeline stage must have exactly one operator");
        }

        const operator = operators[0];
        if (!operator.startsWith("$")) {
          throw new Error("Pipeline operators must start with $");
        }
      }
    }

    return true;
  }

  /**
   * Clone a pipeline (deep copy)
   * @param pipeline The pipeline to clone
   * @returns Cloned pipeline
   */
  static clone(pipeline: Pipeline): Pipeline {
    return JSON.parse(JSON.stringify(pipeline));
  }

  /**
   * Get pipeline statistics
   * @param pipeline The pipeline to analyze
   * @returns Statistics about the pipeline
   */
  static getStats(pipeline: Pipeline): {
    stageCount: number;
    stageTypes: Record<string, number>;
    totalSize: number;
    estimatedComplexity: number;
  } {
    const stageTypes: Record<string, number> = {};
    let totalSize = 0;

    for (const stage of pipeline) {
      const operator = Object.keys(stage)[0];
      stageTypes[operator] = (stageTypes[operator] || 0) + 1;
      totalSize += JSON.stringify(stage).length;
    }

    // Calculate estimated complexity based on stage types
    const complexityWeights: Record<string, number> = {
      $match: 1,
      $project: 2,
      $group: 3,
      $lookup: 4,
      $facet: 5,
      $graphLookup: 4,
      $addFields: 2,
      $sort: 1,
      $limit: 1,
      $skip: 1,
    };

    const estimatedComplexity = Object.entries(stageTypes).reduce(
      (sum, [operator, count]) => sum + (complexityWeights[operator] || 1) * count,
      0
    );

    return {
      stageCount: pipeline.length,
      stageTypes,
      totalSize,
      estimatedComplexity,
    };
  }

  /**
   * Filter pipeline stages by type
   * @param pipeline The pipeline to filter
   * @param operator The stage operator to filter by
   * @returns Filtered pipeline stages
   */
  static filterByStageType(pipeline: Pipeline, operator: string): PipelineStage[] {
    return pipeline.filter((stage) => Object.keys(stage)[0] === operator);
  }

  /**
   * Remove stages by type
   * @param pipeline The pipeline to modify
   * @param operator The stage operator to remove
   * @returns New pipeline without the specified stage type
   */
  static removeStageType(pipeline: Pipeline, operator: string): Pipeline {
    return pipeline.filter((stage) => Object.keys(stage)[0] !== operator);
  }

  /**
   * Insert a stage at a specific position
   * @param pipeline The pipeline to modify
   * @param index The position to insert at
   * @param stage The stage to insert
   * @returns New pipeline with inserted stage
   */
  static insertStage(pipeline: Pipeline, index: number, stage: PipelineStage): Pipeline {
    const newPipeline = [...pipeline];
    newPipeline.splice(index, 0, stage);
    return newPipeline;
  }

  /**
   * Replace a stage at a specific position
   * @param pipeline The pipeline to modify
   * @param index The position to replace
   * @param stage The new stage
   * @returns New pipeline with replaced stage
   */
  static replaceStage(pipeline: Pipeline, index: number, stage: PipelineStage): Pipeline {
    const newPipeline = [...pipeline];
    newPipeline[index] = stage;
    return newPipeline;
  }

  /**
   * Get a human-readable description of the pipeline
   * @param pipeline The pipeline to describe
   * @returns Formatted description
   */
  static describe(pipeline: Pipeline): string {
    const stats = this.getStats(pipeline);
    const stageDescriptions = pipeline.map((stage, index) => {
      const operator = Object.keys(stage)[0];
      return `${index + 1}. ${operator}`;
    });

    return `Pipeline Description:
- Total Stages: ${stats.stageCount}
- Stage Types: ${Object.entries(stats.stageTypes).map(([type, count]) => `${type}(${count})`).join(', ')}
- Estimated Complexity: ${stats.estimatedComplexity}
- Total Size: ${stats.totalSize} characters

Stages:
${stageDescriptions.join('\n')}`;
  }

  /**
   * Compare two pipelines
   * @param pipeline1 First pipeline
   * @param pipeline2 Second pipeline
   * @returns Comparison result
   */
  static compare(pipeline1: Pipeline, pipeline2: Pipeline): {
    areEqual: boolean;
    differences: {
      stageCount: { p1: number; p2: number };
      stageTypes: { p1: Record<string, number>; p2: Record<string, number> };
      commonStages: number;
    };
  } {
    const stats1 = this.getStats(pipeline1);
    const stats2 = this.getStats(pipeline2);

    const areEqual = JSON.stringify(pipeline1) === JSON.stringify(pipeline2);

    return {
      areEqual,
      differences: {
        stageCount: { p1: stats1.stageCount, p2: stats2.stageCount },
        stageTypes: { p1: stats1.stageTypes, p2: stats2.stageTypes },
        commonStages: Math.min(stats1.stageCount, stats2.stageCount),
      },
    };
  }
} 