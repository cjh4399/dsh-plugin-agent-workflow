/** Turn and model-call projection for the visual Workflow view. */
import type { Message } from '@deepseek-ai/dsh-llm/types';
import type { WorkflowCellProps } from './projection/record.ts';
import type { WorkflowAssistantRequest, WorkflowRequestView } from './projection/contract.ts';
import type { WorkflowProjectionTurnModel } from './projection/layout.ts';
type AssistantRequest = WorkflowAssistantRequest;
/** Lifecycle shown by a workflow turn or model call. */
export type WorkflowStatus = 'waiting' | 'running' | 'complete' | 'error';
/** Provider-reported token buckets normalized for one Workflow model call. */
export interface WorkflowCallUsage {
    readonly inputTotal: number | undefined;
    readonly inputUncached: number | undefined;
    readonly cacheRead: number | undefined;
    readonly cacheWrite: number | undefined;
    readonly output: number | undefined;
}
/** One model request and its response/tool activity. */
export interface WorkflowCallModel {
    readonly id: string;
    readonly turn: number;
    readonly step: number;
    readonly number: number;
    readonly request: AssistantRequest | undefined;
    /** Complete provider-neutral message history sent with this request. */
    readonly messages: readonly Message[];
    readonly inputs: readonly WorkflowCellProps[];
    readonly response: WorkflowCellProps | undefined;
    readonly tools: readonly WorkflowCellProps[];
    readonly usage: WorkflowCallUsage | undefined;
    readonly status: WorkflowStatus;
    readonly startedAt: number | null;
    readonly durationMs: number | null;
}
/** One user-initiated turn and every model request inside it. */
export interface WorkflowTurnModel {
    readonly turn: number;
    readonly prompt: string;
    readonly promptPreview: string;
    /** Whether the loaded history window contains the user message that opened this turn. */
    readonly hasPrompt: boolean;
    readonly startedAt: number | null;
    readonly durationMs: number | null;
    readonly calls: readonly WorkflowCallModel[];
    readonly toolCount: number;
    readonly status: WorkflowStatus;
}
/** Complete workflow summary for the current loaded history window. */
export interface WorkflowModel {
    readonly turns: readonly WorkflowTurnModel[];
    readonly requestCount: number;
    readonly toolCount: number;
    readonly durationMs: number | null;
}
/** Timing boundaries already projected by the Session object layer. */
export type WorkflowTurnTimings = ReadonlyMap<number, {
    readonly startTime: number;
    readonly endTime?: number;
}>;
/**
 * Fold the Trajectory layout into a user-turn index and model-call rows.
 * @param turns - Existing replay-safe Trajectory turn layout.
 * @param requests - Provider request lifecycles from the same projection.
 * @param timings - Session-owned turn timing boundaries.
 * @returns Visual workflow model ordered by user turn and step.
 */
export declare function deriveWorkflowModel(turns: readonly WorkflowProjectionTurnModel[], requests: readonly WorkflowRequestView[], timings?: WorkflowTurnTimings): WorkflowModel;
export {};
