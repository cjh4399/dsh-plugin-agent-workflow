/** Visual user-turn and model-call explorer backed by the Workflow-owned projection. */
import { type ReactNode } from 'react';
import type { ConvViewProps } from '@deepseek-ai/dsh-client-ui-conversation/client';
import type { SessionEventWindow } from '@deepseek-ai/dsh-api-session-controller/client';
import type { UseTrajectory } from '@deepseek-ai/dsh-client-ui-trajectory/client';
import type { UseSession } from '@deepseek-ai/dsh-client-ui-session/client';
import type { InjectFace, PropsLocale } from '@deepseek-ai/dsh-client-ui-slots';
import { type WorkflowStatus } from './workflow-model.ts';
/** Session-bound history paging for the Workflow view. */
export interface WorkflowViewInjected {
    loadOlder: () => Promise<boolean>;
    eventWindow: () => SessionEventWindow;
}
/**
 * Render the accessible status strip for one tool result.
 * @param props - Resolved status, visible label, and formatted duration.
 * @returns The live tool-result status strip.
 */
export declare function WorkflowToolResult({ status, label, duration, }: {
    status: WorkflowStatus;
    label: string;
    duration: string;
}): ReactNode;
/** Full-height Workflow conversation view. */
export declare function WorkflowView({ useSession, useTrajectory, loadOlder, eventWindow, t, }: ConvViewProps & InjectFace<WorkflowViewInjected> & PropsLocale<'workflow'> & {
    useSession: UseSession;
    useTrajectory: UseTrajectory;
}): import("react").JSX.Element;
