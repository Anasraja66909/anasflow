import time
import json
from typing import Dict, Any, List, Optional
from openai import OpenAI, AsyncOpenAI
from loguru import logger
from ..core.config import settings

class LLMService:
    """
    Unified LLM Service for AnasFlow.
    Supports Groq, OpenAI, and handles cost tracking & telemetry.
    """
    
    PRICING = {
        "llama-3.3-70b-versatile": {"input": 0.59, "output": 0.79},
        "llama-3.1-8b-instant": {"input": 0.05, "output": 0.08},
        "gemma2-9b-it": {"input": 0.20, "output": 0.20},
        "gpt-4o": {"input": 5.00, "output": 15.00},
        "gpt-3.5-turbo": {"input": 0.50, "output": 1.50},
    }

    @staticmethod
    def get_client(provider: str = "groq") -> OpenAI:
        if provider == "groq":
            return OpenAI(
                api_key=settings.GROQ_API_KEY,
                base_url=settings.GROQ_BASE_URL
            )
        return OpenAI(api_key=settings.OPENAI_API_KEY)

    @staticmethod
    def get_async_client(provider: str = "groq") -> AsyncOpenAI:
        if provider == "groq":
            return AsyncOpenAI(
                api_key=settings.GROQ_API_KEY,
                base_url=settings.GROQ_BASE_URL
            )
        return AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

    @classmethod
    async def call(
        cls,
        model: str,
        messages: List[Dict[str, str]],
        temperature: float = 0.7,
        max_tokens: int = 4000,
        response_format: Optional[Dict[str, str]] = None,
        provider: str = "groq"
    ) -> Dict[str, Any]:
        """
        Executes an LLM call and returns the result with usage metadata.
        """
        client = cls.get_async_client(provider)
        start_time = time.time()
        
        try:
            kwargs = {
                "model": model,
                "messages": messages,
                "temperature": temperature,
                "max_tokens": max_tokens,
            }
            if response_format:
                kwargs["response_format"] = response_format

            response = await client.chat.completions.create(**kwargs)
            
            end_time = time.time()
            latency = end_time - start_time
            
            usage = response.usage
            input_tokens = usage.prompt_tokens
            output_tokens = usage.completion_tokens
            
            cost = cls.calculate_cost(model, input_tokens, output_tokens)
            
            logger.info(f"LLM Call [{model}]: {latency:.2f}s, {input_tokens+output_tokens} tokens, ${cost:.6f}")
            
            return {
                "content": response.choices[0].message.content,
                "usage": {
                    "prompt_tokens": input_tokens,
                    "completion_tokens": output_tokens,
                    "total_tokens": usage.total_tokens,
                    "cost": cost,
                    "latency": latency
                },
                "model": model,
                "provider": provider
            }
            
        except Exception as e:
            logger.error(f"LLM Call Failed [{model}]: {str(e)}")
            raise e

    @classmethod
    def calculate_cost(cls, model: str, input_tokens: int, output_tokens: int) -> float:
        """Calculates cost based on model pricing."""
        pricing = cls.PRICING.get(model, {"input": 0, "output": 0})
        cost = (input_tokens / 1_000_000 * pricing["input"]) + (output_tokens / 1_000_000 * pricing["output"])
        return cost

    @classmethod
    def get_default_model(cls, task_type: str = "reasoning") -> str:
        if task_type == "reasoning":
            return "llama-3.3-70b-versatile"
        elif task_type == "fast":
            return "llama-3.1-8b-instant"
        return "llama-3.1-8b-instant"
