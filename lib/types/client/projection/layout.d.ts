/**
 * Workflow list fold: expand assistant blocks, attach usage to Message,
 * own-duration times, in-flight partial/runningCalls, and group descriptions.
 */
import type { ConversationLocation } from '@deepseek-ai/dsh-client-ui-conversation/client';
import type { TrajectorySnapshot } from '@deepseek-ai/dsh-client-ui-trajectory/client';
import type { WorkflowRequestView } from './contract.ts';
import type { WorkflowCellProps } from './record.ts';
/** One Message or Step group inside a turn. */
export interface WorkflowProjectionGroupModel {
    title: string;
    description?: string;
    cells: readonly WorkflowCellProps[];
}
/** One sticky turn, or a standalone compaction section between turns. */
export interface WorkflowProjectionTurnModel {
    turn: number | null;
    groups: readonly WorkflowProjectionGroupModel[];
}
/** Snapshot slice the workflow view folds. */
export interface WorkflowLayoutInput {
    nodes: TrajectorySnapshot['eventNodes'];
    eventLocations?: ReadonlyMap<number, ConversationLocation>;
    partial: TrajectorySnapshot['partial'];
    runningCalls: TrajectorySnapshot['runningCalls'];
    requests?: readonly WorkflowRequestView[];
    callSchemas?: TrajectorySnapshot['callSchemas'];
}
/**
 * Fold a snapshot into turn → Message/Step groups with expanded cells.
 * @param input - nodes plus in-flight partial/runningCalls.
 * @returns turns ordered by first appearance.
 */
export declare function deriveWorkflowLayout(input: WorkflowLayoutInput): readonly WorkflowProjectionTurnModel[];
/**
 * Append the changing in-flight assistant cells to a stable finalized layout.
 * @param turns - Finalized layout derived with an empty-block partial anchor.
 * @param partial - Current in-flight assistant projection.
 * @param lastIndex - Highest cell index in the finalized layout.
 * @returns The original layout without a partial, otherwise a layout sharing every unaffected turn.
 */
export declare function appendWorkflowPartialLayout(turns: readonly WorkflowProjectionTurnModel[], partial: TrajectorySnapshot['partial'], lastIndex: number): readonly WorkflowProjectionTurnModel[];
