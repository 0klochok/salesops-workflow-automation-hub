from fastapi.testclient import TestClient

from backend.app.main import app

FORBIDDEN_DOCS_MARKERS = (
    "cdn.jsdelivr.net",
    "fastapi.tiangolo.com",
    "unpkg.com",
    "cdnjs.cloudflare.com",
    "fonts.googleapis.com",
    "fonts.gstatic.com",
    "http://",
    "https://",
)


def test_docs_page_is_local_only_html() -> None:
    client = TestClient(app)

    response = client.get("/docs")

    assert response.status_code == 200
    assert response.headers["content-type"].startswith("text/html")
    assert "/openapi.json" in response.text
    assert not any(marker in response.text for marker in FORBIDDEN_DOCS_MARKERS)


def test_openapi_json_remains_available() -> None:
    client = TestClient(app)

    response = client.get("/openapi.json")

    assert response.status_code == 200
    assert response.json()["info"]["title"] == "SalesOps Workflow Automation Hub API"
