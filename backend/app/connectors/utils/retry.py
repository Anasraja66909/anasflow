import asyncio
import random


def retry_with_backoff(
    func, *args, retries=3, base_delay=1.0, max_delay=10.0, **kwargs
):
    async def wrapper(*args, **kwargs):
        delay = base_delay
        for attempt in range(retries):
            try:
                return await func(*args, **kwargs)
            except Exception:
                if attempt == retries - 1:
                    raise
                await asyncio.sleep(delay)
                delay = min(delay * 2 + random.uniform(0, 1), max_delay)

    return wrapper(*args, **kwargs)
