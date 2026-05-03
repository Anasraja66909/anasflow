import json
from typing import Dict, Any, List
from loguru import logger
from .llm_service import LLMService


async def analyze_workflow_error(
    platform: str, error_logs: str, workflow_structure: str
) -> Dict[str, Any]:
    """
    Executes a high-fidelity multi-agent diagnostic on automation node failures using Groq.
    Uses sequential reasoning to identify root causes and generate optimized fixes.
    """
    
    # 1. Diagnostic Agent (llama3-70b-8192) - High Reasoning
    diagnostic_messages = [
        {"role": "system", "content": "You are an Elite Integration Debugger. Analyze the logs to find the EXACT point of failure."},
        {"role": "user", "content": f"Platform: {platform}\nLogs: {error_logs}\nWorkflow: {workflow_structure}"}
    ]
    
    diagnostic_result = await LLMService.call(
        model="llama-3.3-70b-versatile",
        messages=diagnostic_messages,
        temperature=0.2,
        max_tokens=2000
    )
    root_cause_analysis = diagnostic_result["content"]
    
    # 2. Architect Agent (llama-3.1-8b-instant) - Fast Structural Proposals
    architect_messages = [
        {"role": "system", "content": "You are a Workflow Architect. Propose a structural remediation based on the provided diagnostic."},
        {"role": "user", "content": f"Diagnostic: {root_cause_analysis}\nWorkflow: {workflow_structure}"}
    ]
    
    architect_result = await LLMService.call(
        model="llama-3.1-8b-instant",
        messages=architect_messages,
        temperature=0.4,
        max_tokens=2000
    )
    remediation_proposal = architect_result["content"]
    
    # 3. Synthesizer Agent (llama3-70b-8192) - Final JSON Formatting
    synthesizer_prompt = f"""
    Based on the following analysis, generate a final surgical JSON object.
    
    DIAGNOSTIC: {root_cause_analysis}
    PROPOSED FIX: {remediation_proposal}
    
    OUTPUT SPECIFICATION:
    Return a surgical JSON object (no markdown, no backticks).
    {{
        "root_cause": "Surgical explanation of the failure point",
        "confidence_score": "percentage string",
        "suggested_fix": "Linear step-by-step remediation",
        "optimized_workflow": "Stringified JSON of the remediated topology",
        "estimated_savings": "Time/Cost ROI metric",
        "telemetry": {{
            "total_latency": "total_seconds",
            "total_cost": "total_dollars",
            "agents": ["llama-3.3-70b-versatile", "llama-3.1-8b-instant"]
        }}
    }}
    """
    
    final_result = await LLMService.call(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": synthesizer_prompt}],
        temperature=0.1,
        response_format={"type": "json_object"}
    )
    
    try:
        data = json.loads(final_result["content"])
        
        # Add cumulative telemetry
        total_latency = (
            diagnostic_result["usage"]["latency"] + 
            architect_result["usage"]["latency"] + 
            final_result["usage"]["latency"]
        )
        total_cost = (
            diagnostic_result["usage"]["cost"] + 
            architect_result["usage"]["cost"] + 
            final_result["usage"]["cost"]
        )
        
        data["telemetry"]["total_latency"] = f"{total_latency:.2f}s"
        data["telemetry"]["total_cost"] = f"${total_cost:.6f}"
        
        return data
        
    except Exception as e:
        logger.error(f"Failed to parse final AI Doctor response: {e}")
        return {
            "root_cause": "Diagnostic sequence failed during synthesis.",
            "confidence_score": "0%",
            "suggested_fix": "Manual review required.",
            "optimized_workflow": workflow_structure,
            "estimated_savings": "0 hours",
            "telemetry": {"error": str(e)}
        }
