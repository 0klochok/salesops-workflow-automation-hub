from uuid import UUID, uuid5

ID_NAMESPACE = UUID("4f07d0d3-717c-4f7d-9d91-c3025f97b442")


def deterministic_id(prefix: str, *parts: str) -> str:
    normalized = "|".join(part.strip().lower() for part in parts)
    return f"{prefix}_{uuid5(ID_NAMESPACE, normalized).hex[:12]}"
