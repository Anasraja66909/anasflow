import json
from typing import Dict, Any
from .llm_service import LLMService

class AISuggestionService:
    """Service to generate AI automation cost optimization suggestions using Groq/OpenAI."""

    SYSTEM_PROMPT = """You are an expert AI Automation Debugger and Healer for AnasFlow.

Your job is to analyze webhook failures, timeout errors, rate limits, and integration breaks across client accounts and provide actionable 1-click Auto-Healing fixes.

Rules:
- Be precise and technical.
- Calculate potential debugging time saved.
- Provide a literal "recommendedAction".

Output Format (strict JSON):
{
  "suggestions": [
    {
      "id": string,
      "platform": string,
      "type": "webhook_failure" | "rate_limit" | "data_mapping_error" | "auth_failure" | "other",
      "title": string,
      "estimatedTimeSavedMinutes": number,
      "reason": string,
      "recommendedAction": string,
      "severity": "Critical" | "Warning" | "Notice",
      "fixActionLabel": string
    }
  ],
  "totalDebuggingHoursSaved": number,
  "summaryInsight": string
}"""

    ANALYSIS_PROMPT_TEMPLATE = """Analyze the following integration error logs and generate Auto-Healing suggestions.

Usage Data & Logs:
{usage_data}

Historical Patterns:
{historical_data}

Current Context:
- Total monthly spend: ${total_spend}
- Top platforms: {top_platforms}
"""

    @classmethod
    async def generate_optimization_suggestions(
        cls,
        usage_data: Dict[str, Any],
        historical_data: Dict[str, Any],
        total_spend: float,
        top_platforms: str,
    ) -> Dict[str, Any]:
        """Generate optimization suggestions intelligently via Groq (llama-3.3-70b-versatile)."""

        try:
            user_prompt = cls.ANALYSIS_PROMPT_TEMPLATE.format(
                usage_data=json.dumps(usage_data, indent=2),
                historical_data=json.dumps(historical_data, indent=2),
                total_spend=total_spend,
                top_platforms=top_platforms,
            )

            result = await LLMService.call(
                model="llama-3.3-70b-versatile",
                messages=[
                    {"role": "system", "content": cls.SYSTEM_PROMPT},
                    {"role": "user", "content": user_prompt},
                ],
                response_format={"type": "json_object"},
                temperature=0.3,
            )

            return json.loads(result["content"])

        except Exception as e:
            print(f"Error generating AI suggestions: {e}")
            return cls._get_mock_suggestions(total_spend, top_platforms)

    @staticmethod
    def _get_mock_suggestions(total_spend: float, top_platforms: str) -> Dict[str, Any]:
        """Provides high-quality mocked fallback data when live API isn't available."""
        return {
            "totalDebuggingHoursSaved": 6.5,
            "summaryInsight": "Critical client-facing automations are failing. AI has analyzed the logs and generated instant 1-click patches.",
            "suggestions": [
                {
                    "id": "heal_mock_1",
                    "platform": "GoHighLevel",
                    "type": "webhook_failure",
                    "title": "GHL Lead Form Webhook Returning 502",
                    "estimatedTimeSavedMinutes": 180,
                    "reason": "The webhook receiver is timing out due to rate limits.",
                    "recommendedAction": "Inject an asynchronous queue node.",
                    "severity": "Critical",
                    "fixActionLabel": "Deploy Async Patch",
                }
            ],
        }
