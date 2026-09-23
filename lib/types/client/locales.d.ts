/** `workflow` namespace dictionaries for the visual Workflow view. */
/** Dictionary namespace owned by this plugin. */
export declare const NS = "workflow";
/** The Workflow dictionary key set (the source of truth for both locales). */
export type WorkflowKey = 'view.workflow' | 'workflow.aria' | 'workflow.turn' | 'workflow.turnTitle' | 'workflow.turns' | 'workflow.modelCall' | 'workflow.modelCalls' | 'workflow.tool' | 'workflow.tools.suffix' | 'workflow.calls.suffix' | 'workflow.request' | 'workflow.request.context' | 'workflow.response' | 'workflow.response.pending' | 'workflow.response.toolOnly' | 'workflow.finalReply' | 'workflow.system' | 'workflow.messages' | 'workflow.toolDefinitions' | 'workflow.toolCalls' | 'workflow.reasoning' | 'workflow.content' | 'workflow.input' | 'workflow.inputUncached' | 'workflow.cacheRead' | 'workflow.cacheWrite' | 'workflow.output' | 'workflow.totalDuration' | 'workflow.status.waiting' | 'workflow.status.running' | 'workflow.status.complete' | 'workflow.status.error' | 'workflow.tool.call' | 'workflow.tool.complete' | 'workflow.request.details' | 'workflow.response.details' | 'workflow.tool.details' | 'workflow.details.close' | 'workflow.copy' | 'workflow.copied' | 'workflow.json.expand' | 'workflow.json.close' | 'workflow.json.dialog' | 'workflow.json.expandNode' | 'workflow.json.collapseNode' | 'workflow.config' | 'workflow.systemPrompt' | 'workflow.metadata' | 'workflow.arguments' | 'workflow.result' | 'workflow.schema' | 'workflow.empty' | 'workflow.emptyTurns' | 'workflow.emptyCalls' | 'workflow.loadOlder' | 'workflow.loadingOlder';
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        /** The visual Workflow view strings. */
        'workflow': WorkflowKey;
    }
}
/** Simplified Chinese dictionary (the key-set source of truth). */
export declare const zh: Record<WorkflowKey, string>;
/** English dictionary. */
export declare const en: Record<WorkflowKey, string>;
