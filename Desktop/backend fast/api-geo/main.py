# main.py
from fastapi import FastAPI, HTTPException, Query, status
from fastapi.responses import JSONResponse, Response
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any
import json
import time
from statistics import mean
from collections import defaultdict
import asyncio


app = FastAPI(
    title="Tunisia Governorates API",
    description="API de lecture des données géographiques des gouvernorats tunisiens",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Ajout du middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

# Exception handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "status_code": exc.status_code, "path": request.url.path}
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"error": "Internal server error", "detail": str(exc)}
    )

# Chargement des données GeoJSON
with open("tunisia.geojson", "r", encoding="utf-8") as f:
    GEOJSON_DATA = json.load(f)

# Métriques de performance
class PerformanceMetrics:
    def __init__(self):
        self.response_times: List[float] = []
        self.request_count: int = 0
        
    def add_response_time(self, duration: float):
        self.response_times.append(duration)
        self.request_count += 1
        # Garder uniquement les 1000 derniers temps pour éviter une mémoire excessive
        if len(self.response_times) > 1000:
            self.response_times.pop(0)
    
    def get_average(self) -> float:
        if not self.response_times:
            return 0.0
        return mean(self.response_times)
    
    def get_metrics(self) -> Dict[str, Any]:
        return {
            "average_response_time_ms": round(self.get_average() * 1000, 2),
            "total_requests": self.request_count,
            "samples": len(self.response_times)
        }

metrics = PerformanceMetrics()

# Middleware pour mesurer le temps de réponse
@app.middleware("http")
async def add_process_time_header(request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    metrics.add_response_time(process_time)
    response.headers["X-Process-Time"] = str(process_time)
    return response

# Données des gouvernorats extraites
GOVERNORATES = [feature["properties"]["gouv_fr"] for feature in GEOJSON_DATA["features"]]

def get_governorate_data(governorate_name: str) -> Optional[Dict]:
    """Récupère les données d'un gouvernorat par son nom."""
    for feature in GEOJSON_DATA["features"]:
        if feature["properties"]["gouv_fr"].lower() == governorate_name.lower():
            return feature
    return None

def get_all_governorates() -> List[Dict]:
    """Récupère tous les gouvernorats avec leurs noms."""
    return [
        {
            "name": feature["properties"]["gouv_fr"],
            "type": feature["geometry"]["type"]
        }
        for feature in GEOJSON_DATA["features"]
    ]

# Routes API
@app.get(
    "/api/health",
    tags=["Health"],
    summary="Vérification de l'état du service",
    description="Permet de vérifier que l'API est opérationnelle et retourne les métriques de performance."
)
async def health_check():
    """Endpoint de vérification de l'état du service."""
    return {
        "status": "healthy",
        "message": "API Tunisia Governorates is running",
        "metrics": metrics.get_metrics(),
        "total_governorates": len(GOVERNORATES)
    }

@app.get(
    "/api/governorates",
    tags=["Governorates"],
    summary="Liste tous les gouvernorats",
    description="Retourne la liste de tous les gouvernorats tunisiens avec leurs noms et types de géométrie."
)
async def list_governorates():
    """Récupère la liste de tous les gouvernorats."""
    return {
        "count": len(GOVERNORATES),
        "governorates": get_all_governorates()
    }

@app.get(
    "/api/governorates/{governorate_name}",
    tags=["Governorates"],
    summary="Récupère un gouvernorat par son nom",
    description="Retourne les données géographiques complètes d'un gouvernorat spécifique."
)
async def get_governorate(governorate_name: str):
    """Récupère les données d'un gouvernorat spécifique."""
    data = get_governorate_data(governorate_name)
    if data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Governorate '{governorate_name}' not found. Available: {', '.join(GOVERNORATES)}"
        )
    return data

@app.get(
    "/api/governorates/{governorate_name}/properties",
    tags=["Governorates"],
    summary="Récupère les propriétés d'un gouvernorat",
    description="Retourne uniquement les propriétés (métadonnées) d'un gouvernorat spécifique."
)
async def get_governorate_properties(governorate_name: str):
    """Récupère les propriétés d'un gouvernorat spécifique."""
    data = get_governorate_data(governorate_name)
    if data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Governorate '{governorate_name}' not found"
        )
    return {
        "name": data["properties"]["gouv_fr"],
        "properties": data["properties"]
    }

@app.get(
    "/api/governorates/{governorate_name}/geometry",
    tags=["Governorates"],
    summary="Récupère la géométrie d'un gouvernorat",
    description="Retourne uniquement la géométrie (coordonnées) d'un gouvernorat spécifique."
)
async def get_governorate_geometry(governorate_name: str):
    """Récupère la géométrie d'un gouvernorat spécifique."""
    data = get_governorate_data(governorate_name)
    if data is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Governorate '{governorate_name}' not found"
        )
    return {
        "name": data["properties"]["gouv_fr"],
        "geometry": data["geometry"]
    }

@app.get(
    "/api/search",
    tags=["Search"],
    summary="Recherche des gouvernorats",
    description="Recherche des gouvernorats par nom avec correspondance partielle."
)
async def search_governorates(
    q: str = Query(..., min_length=1, description="Terme de recherche"),
    limit: int = Query(10, ge=1, le=50, description="Nombre maximum de résultats")
):
    """Recherche des gouvernorats par nom."""
    results = []
    search_term = q.lower()
    
    for feature in GEOJSON_DATA["features"]:
        name = feature["properties"]["gouv_fr"]
        if search_term in name.lower():
            results.append({
                "name": name,
                "type": feature["geometry"]["type"],
                "match": name
            })
            if len(results) >= limit:
                break
    
    return {
        "query": q,
        "count": len(results),
        "results": results
    }

@app.get(
    "/api/metrics",
    tags=["Metrics"],
    summary="Métriques de performance",
    description="Retourne les métriques de performance de l'API."
)
async def get_metrics():
    """Retourne les métriques de performance."""
    return metrics.get_metrics()

@app.get(
    "/api/export/geojson",
    tags=["Export"],
    summary="Exporte les données complètes",
    description="Exporte l'intégralité des données GeoJSON."
)
async def export_geojson():
    """Exporte les données GeoJSON complètes."""
    return GEOJSON_DATA

# Gestion des erreurs
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.detail,
            "status_code": exc.status_code,
            "path": request.url.path
        }
    )

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": "An internal error occurred",
            "detail": str(exc),
            "path": request.url.path
        }
    )

# Point d'entrée pour le développement
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )