/** Reconstruct the provider-neutral message surface at each model-request boundary. */
import type { SessionEventWindow } from '@deepseek-ai/dsh-api-session-controller/client';
import type { WorkflowRequestView } from './projection/contract.ts';
/**
 * Attach the exact loaded Session surface that preceded each assistant request.
 * @param requests - Request lifecycles from the current Trajectory snapshot.
 * @param window - Current contiguous Session event window.
 * @returns Requests in their original order, with assistant messages attached.
 */
export declare function attachRequestMessages(requests: readonly WorkflowRequestView[], window: SessionEventWindow): readonly WorkflowRequestView[];
