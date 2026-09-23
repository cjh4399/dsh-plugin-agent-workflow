/** Collapsible JSON inspector used by the Workflow request details. */
import type { PropsLocale } from '@deepseek-ai/dsh-client-ui-slots';
/**
 * Render an inline JSON tree with copy and large-dialog inspection actions.
 * @param props.data - JSON-compatible object shown and copied verbatim.
 * @param props.label - Section label used by accessible names and the dialog title.
 * @param props.t - Workflow locale lookup.
 * @returns The inline tree and its controlled large dialog.
 */
export declare function WorkflowJsonInspector({ data, label, t, }: {
    data: object;
    label: string;
    t: PropsLocale<'workflow'>['t'];
}): import("react").JSX.Element;
