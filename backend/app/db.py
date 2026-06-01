from collections.abc import Iterator
from functools import lru_cache

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from backend.app.config import Settings, get_settings


class Base(DeclarativeBase):
    pass


def create_database_engine(database_url: str) -> Engine:
    return create_engine(database_url, pool_pre_ping=True)


def create_session_factory(engine: Engine) -> sessionmaker[Session]:
    return sessionmaker(
        bind=engine,
        autoflush=False,
        autocommit=False,
        expire_on_commit=False,
    )


def resolve_database_url(settings: Settings | None = None) -> str:
    resolved_settings = settings or get_settings()
    if resolved_settings.database_url is None:
        raise RuntimeError("DATABASE_URL is required for persistent storage")
    return resolved_settings.database_url


@lru_cache
def _get_database_engine(database_url: str) -> Engine:
    return create_database_engine(database_url)


@lru_cache
def _get_session_factory(database_url: str) -> sessionmaker[Session]:
    return create_session_factory(_get_database_engine(database_url))


def get_database_engine(settings: Settings | None = None) -> Engine:
    return _get_database_engine(resolve_database_url(settings))


def get_database_session_factory(settings: Settings | None = None) -> sessionmaker[Session]:
    return _get_session_factory(resolve_database_url(settings))


def get_db_session() -> Iterator[Session]:
    session = get_database_session_factory()()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


def clear_database_cache() -> None:
    _get_database_engine.cache_clear()
    _get_session_factory.cache_clear()
