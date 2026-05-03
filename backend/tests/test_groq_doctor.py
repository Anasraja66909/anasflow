import asyncio
import os
import sys
from loguru import logger

# Add the parent directory to sys.path to import app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.services.ai_doctor import analyze_workflow_error
from app.services.llm_service import LLMService

async def run_diagnostic_test():
    platform = "n8n"
    error_logs = "Error: Connection timeout at node 'Google Sheets'. Status code: 504. Message: Gateway Timeout."
    workflow_structure = '{"nodes": [{"type": "webhook"}, {"type": "google_sheets_read"}, {"type": "slack_notify"}]}'
    
    print("\n--- STARTING AI DOCTOR GROQ TEST ---")
    print(f"Platform: {platform}")
    
    try:
        result = await analyze_workflow_error(platform, error_logs, workflow_structure)
        
        print("\nDIAGNOSTIC RESULTS:")
        print(f"Root Cause: {result.get('root_cause')}")
        print(f"Suggested Fix: {result.get('suggested_fix')}")
        print(f"Confidence: {result.get('confidence_score')}")
        print(f"Telemetry: {result.get('telemetry')}")
        
        return result
    except Exception as e:
        print(f"Test Failed: {e}")
        return None

async def compare_speed_accuracy():
    """
    Compares llama-3.3-70b-versatile (Groq) vs gpt-4o (OpenAI) if keys are available.
    """
    messages = [{"role": "user", "content": "Explain the concept of 'Recursive Self-Improvement' in AI in 3 sentences."}]
    
    print("\n--- SPEED COMPARISON ---")
    
    # Test Groq
    print("Testing Groq (llama-3.3-70b-versatile)...")
    groq_result = await LLMService.call(
        model="llama-3.3-70b-versatile",
        messages=messages,
        provider="groq"
    )
    print(f"Groq Latency: {groq_result['usage']['latency']:.2f}s")
    print(f"Groq Cost: ${groq_result['usage']['cost']:.6f}")
    
    # Test OpenAI (if key exists)
    if os.getenv("OPENAI_API_KEY"):
        print("\nTesting OpenAI (gpt-4o)...")
        openai_result = await LLMService.call(
            model="gpt-4o",
            messages=messages,
            provider="openai"
        )
        print(f"OpenAI Latency: {openai_result['usage']['latency']:.2f}s")
        print(f"OpenAI Cost: ${openai_result['usage']['cost']:.6f}")
        
        diff_speed = openai_result['usage']['latency'] / groq_result['usage']['latency']
        print(f"\nGroq is {diff_speed:.1f}x faster than OpenAI!")
    else:
        print("\nSkipping OpenAI comparison (API key missing).")

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(run_diagnostic_test())
    loop.run_until_complete(compare_speed_accuracy())
