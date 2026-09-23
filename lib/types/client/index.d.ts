/** Browser plugin registering the visual Workflow conversation view. */
import type { Context } from '@deepseek-ai/cordis';
export { WorkflowJsonInspector } from './WorkflowJsonInspector.tsx';
export { WorkflowToolResult, WorkflowView } from './WorkflowView.tsx';
export type { WorkflowViewInjected } from './WorkflowView.tsx';
export { deriveWorkflowModel } from './workflow-model.ts';
export type { WorkflowCallModel, WorkflowCallUsage, WorkflowModel, WorkflowStatus, WorkflowTurnModel, WorkflowTurnTimings, } from './workflow-model.ts';
export type { WorkflowKey } from './locales.ts';
/** Required services: the conversation slot, Session paging, trajectory projection, and localization. */
export declare const inject: string[];
/** Register the independently installable Workflow view tab. */
export declare function apply(ctx: Context): void;
