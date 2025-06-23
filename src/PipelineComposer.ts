import {
  IPipelineComposer,
  Pipeline,
  ValidationOptions,
  ValidationError,
  CompositionError,
} from "./types";

/**
 * Class for composing and reusing MongoDB pipeline segments
 */
export class PipelineComposer implements IPipelineComposer {
  private pipeline: Pipeline = [];

  /**
   * Compose multiple pipelines into one
   * @param pipelines The pipelines to compose
   */
  compose(...pipelines: Pipeline[]): this {
    if (pipelines.length === 0) {
      throw new CompositionError(
        "At least one pipeline must be provided for composition",
      );
    }

    // Validate all pipelines before composition
    pipelines.forEach((pipeline, index) => {
      if (!this.validate(pipeline)) {
        throw new CompositionError(`Invalid pipeline at index ${index}`);
      }
    });

    // Flatten and combine all pipelines
    this.pipeline = pipelines.reduce((acc, curr) => [...acc, ...curr], []);
    return this;
  }

  /**
   * Extend an existing pipeline with another pipeline
   * @param basePipeline The base pipeline to extend
   * @param extension The pipeline to extend with
   */
  extend(basePipeline: Pipeline, extension: Pipeline): this {
    if (!this.validate(basePipeline)) {
      throw new CompositionError("Invalid base pipeline");
    }
    if (!this.validate(extension)) {
      throw new CompositionError("Invalid extension pipeline");
    }

    this.pipeline = [...basePipeline, ...extension];
    return this;
  }

  /**
   * Validate a pipeline structure
   * @param pipeline The pipeline to validate
   * @param options Validation options
   */
  validate(pipeline: Pipeline, options: ValidationOptions = {}): boolean {
    const { strict = true, allowEmpty = false, maxStages = 1000 } = options;

    // Check if pipeline is an array
    if (!Array.isArray(pipeline)) {
      throw new ValidationError("Pipeline must be an array");
    }

    // Check for empty pipeline
    if (pipeline.length === 0 && !allowEmpty) {
      throw new ValidationError("Pipeline cannot be empty");
    }

    // Check for maximum stages
    if (pipeline.length > maxStages) {
      throw new ValidationError(
        `Pipeline exceeds maximum stage limit of ${maxStages}`,
      );
    }

    // Validate each stage
    for (const stage of pipeline) {
      if (!stage || typeof stage !== "object") {
        throw new ValidationError("Invalid pipeline stage: must be an object");
      }

      if (strict) {
        // Check that each stage has exactly one operator
        const operators = Object.keys(stage);
        if (operators.length !== 1) {
          throw new ValidationError(
            "Each pipeline stage must have exactly one operator",
          );
        }

        // Check that the operator starts with $
        const operator = operators[0];
        if (!operator.startsWith("$")) {
          throw new ValidationError("Pipeline operators must start with $");
        }
      }
    }

    return true;
  }

  /**
   * Build the final composed pipeline
   */
  build(): Pipeline {
    return [...this.pipeline];
  }

  /**
   * Clear the current pipeline
   */
  clear(): this {
    this.pipeline = [];
    return this;
  }

  /**
   * Get the current number of stages in the pipeline
   */
  getStageCount(): number {
    return this.pipeline.length;
  }

  /**
   * Get a specific stage from the pipeline
   * @param index The index of the stage to retrieve
   */
  getStage(index: number) {
    if (index < 0 || index >= this.pipeline.length) {
      throw new Error("Invalid stage index");
    }
    return this.pipeline[index];
  }

  /**
   * Check if the pipeline contains a specific stage type
   * @param operator The stage operator to check for (e.g., '$match', '$group')
   */
  hasStage(operator: string): boolean {
    return this.pipeline.some((stage) => Object.keys(stage)[0] === operator);
  }

  /**
   * Get all stages of a specific type
   * @param operator The stage operator to filter by
   */
  getStagesByType(operator: string): Pipeline {
    return this.pipeline.filter((stage) => Object.keys(stage)[0] === operator);
  }

  /**
   * Get the pipeline as a JSON string
   * @param pretty Whether to format the JSON with indentation
   * @returns JSON string representation of the pipeline
   */
  toJSON(pretty: boolean = false): string {
    const pipeline = this.build();
    return pretty ? JSON.stringify(pipeline, null, 2) : JSON.stringify(pipeline);
  }

  /**
   * Get the pipeline as a plain object (not stringified)
   * @returns Object representation of the pipeline
   */
  toObject(): Pipeline {
    return this.build();
  }

  /**
   * Export pipeline with metadata
   * @param metadata Additional metadata to include
   * @returns Object with pipeline and metadata
   */
  exportWithMetadata(metadata: Record<string, any> = {}): {
    pipeline: Pipeline;
    metadata: {
      stageCount: number;
      createdAt: string;
      [key: string]: any;
    };
  } {
    return {
      pipeline: this.build(),
      metadata: {
        stageCount: this.getStageCount(),
        createdAt: new Date().toISOString(),
        ...metadata,
      },
    };
  }

  /**
   * Get a human-readable string representation of the pipeline
   * @returns Formatted string showing pipeline stages
   */
  toString(): string {
    const stages = this.pipeline.map((stage, index) => {
      const operator = Object.keys(stage)[0];
      return `${index + 1}. ${operator}`;
    });
    return `Composed Pipeline with ${this.pipeline.length} stages:\n${stages.join('\n')}`;
  }
}
