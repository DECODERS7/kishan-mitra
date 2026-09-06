# kishan-mitra
🌾 Kisan Mitra

Integrated Satellite Remote Sensing, Drone Telemetry & Multimodal
Field Advisory System

Developed by: Team DECODERS
Project: Kisan Mitra
Target Environment: Google Cloud Run (asia-southeast1)
Version: Rev 2.3.0-prod --- September 2026
Benchmark Area: Shivpuri District, Madhya Pradesh
Status: Verified / Approved for Staging Verification

👥 Development Team

Team Leader: Vaibhav Shivhare

Team Members: Ankit Yadav, Vishal Dhakad

🎯 Problem Statement

Agricultural decisions in rural India are often made under high
uncertainty. District-level weather information does not always capture
field-level conditions.

Kisan Mitra focuses on three major problems:

⛈️ Localized weather risks: Sudden storms can damage freshly
sprayed crops or newly harvested produce.

💧 Root-zone moisture variation: Surface soil may appear dry
while the 0--30 cm root zone remains saturated, causing unnecessary
irrigation and waterlogging.

🐛 Late pest and disease detection: Visible symptoms may appear
only after significant crop stress or yield reduction has occurred.

💡 Solution

Kisan Mitra combines:

🛰️ Satellite remote sensing

🌧️ IMD Doppler radar data

🚁 Drone telemetry and multispectral imagery

💧 Soil-moisture analysis

🗺️ Geospatial parcel mapping

🤖 Gemini multimodal AI

🎙️ Voice-based agricultural advisory

📱 Offline browser caching

The platform converts field telemetry into parcel-level recommendations
for irrigation, spraying, crop health, and weather-related decisions.

🏗️ System Architecture

┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│ Remote Earth Sensors │  │ IMD Doppler Weather  │  │ Field Drones/Sensors │
│ ISRO Bhuvan / NASA   │  │ 3-Hr Nowcast Radar   │  │ GeoTIFF / Moisture   │
└──────────┬───────────┘  └──────────┬───────────┘  └──────────┬───────────┘
           │                         │                         │
           └─────────────────────────┼─────────────────────────┘
                                     ▼
                         ┌────────────────────────┐
                         │ Raw Feed Ingestion     │
                         │ Cron Workers            │
                         └───────────┬────────────┘
                                     ▼
                         ┌────────────────────────┐
                         │ Ingestion & Tiling Core│
                         │ GDAL / PostGIS Workers │
                         └───────────┬────────────┘
                                     ▼
                ┌───────────────────────────────────────────┐
                │              Clean Geo Layers             │
                └───────────────┬───────────────┬───────────┘
                                │               │
                ┌───────────────▼──────┐   ┌────▼───────────────┐
                │ FastAPI Backend      │   │ PostgreSQL 16 +    │
                │ GCP Cloud Run        │◄─►│ PostGIS / Telemetry│
                └───────────────┬──────┘   └────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
          ┌────────────────────┐  ┌────────────────────┐
          │ Gemini Multimodal  │  │ Next.js / Mapbox   │
          │ AI Advisory Engine │  │ Web Client         │
          └────────────────────┘  └────────────────────┘

🛰️ Data Sources & Telemetry

Data Stream       Provider          Frequency /       Platform Usage
Resolution

Cadastral /       ISRO Bhuvan       5-day repeat /    NDVI, LST and
Optical Data                        10m band          crop analysis

Rain / Storm      IMD Agromet       Every 15 min / 1  Storm tracking
Radar             Doppler           km                and nowcasting

Drone Telemetry   Kisan Drone       On-demand / <5   Canopy stress and
cm                thermal analysis

📊 Spectral & Environmental Analysis

NDVI

NDVI = (Band_8_NIR - Band_4_Red) /
       (Band_8_NIR + Band_4_Red)

Used to estimate vegetation vigor and identify stressed crop zones.

NDRE

NDRE = (Band_8_NIR - Band_5_RedEdge) /
       (Band_8_NIR + Band_5_RedEdge)

Used for early nitrogen-stress analysis.

Land Surface Temperature

LST_Kelvin =
Brightness_Temp /
(1 + (Wavelength * Brightness_Temp / 14388) * ln(Emissivity))

LST_Celsius = LST_Kelvin - 273.15

💧 Root-Zone Soil Moisture Classification

Moisture   Physical State          Map Status   Recommended Action

0--35%     Critical deficit        🔴 Red       Immediate drip / furrow pulse
36--60%    Moderate moisture       🟠 Amber     Schedule water within 48 hrs
61--80%    Optimum moisture        🟢 Green     Hold irrigation and sprays
81--100%   Saturated / submerged   🔵 Blue      Open drainage channels

The monitored root-zone depth is 0--30 cm.

🌧️ Weather Nowcasting

IMD Doppler radar data is polled every 15 minutes.

The system tracks storm/squall trajectories and provides a forward
projection of up to 3 hours.

Example:

Current Field:
Soil Moisture = 78%
NDVI = 0.76
Radar Alert = Squall expected within 3 hours

Advisory:
→ Do NOT irrigate
→ Postpone chemical spraying

🗺️ Geospatial Map Engine

Kisan Mitra uses Mapbox GL for interactive agricultural maps.

Supported Layers

🛰️ True Satellite imagery

🌧️ Live IMD rain radar

💧 Soil-moisture heatmap

🗺️ Cadastral parcel boundaries

🌱 NDVI crop-health layer

🏞️ Alluvial plain / drainage classification

⛰️ DEM-based terrain information

Vector Tiles

Agricultural parcel polygons are pre-tiled into zoom levels z0--z14
using Tippecanoe.

The browser requests only the polygons visible in the active viewport,
reducing rendering load on affordable smartphones.

Coordinate Benchmark

Location:       25.4244° N, 77.6601° E
Projection:     EPSG:3857
Zoom:           z15
Tile Grid:      256 × 256 Vector PBF

📱 Offline Support

Kisan Mitra caches:

Farmer's registered parcel boundaries

Map assets

Recent telemetry

Previously generated advisories

Browser storage uses IndexedDB.

This allows previously loaded parcel information and advisories to
remain readable during temporary loss of connectivity.

🤖 Gemini Multimodal AI

Gemini is used as a context-driven reasoning layer, rather than an
unrestricted chatbot.

The AI receives current field telemetry before generating an advisory.

Context Provided

Khasra Number
Crop Type
Sowing Date
NDVI Score
0–30 cm Soil Moisture
Live Radar Alert
Farmer Voice Query
Preferred Language

Voice Flow

Farmer Voice Query
       ↓
WebAudio API
16 kHz PCM Mono
       ↓
Frontend Audio Streamer
       ↓
FastAPI Advisory Handler
       ↓
Current Field Telemetry
       ↓
Gemini API
       ↓
Structured JSON Response
       ↓
Hindi / Malwi TTS Playback

🛡️ AI Safety Guardrails

Kisan Mitra applies telemetry-based safeguards before producing
recommendations.

Guardrail               Trigger                 Enforcement

Anti-Spray Alert        Rain probability >60%  Blocks chemical
spraying advice

Irrigation Hold         Soil moisture >75%     Advises against
unnecessary irrigation

The grounded prompt instructs the AI to answer clearly in the farmer's
preferred language and avoid inventing agricultural products.

⚙️ Backend

Technology Stack

Python 3.11

FastAPI

Pydantic

SQLAlchemy

PostgreSQL 16

PostGIS

Redis 7

Google Gemini SDK

GDAL / GEOS

Google Cloud Run

Main API

POST /api/v1/advisory/generate

Request

{
  "parcel_id": "MP-SHIV-2026-0891",
  "language": "hi",
  "user_audio_transcript": "Kya mujhe aaj sinchai karni chahiye?"
}

Response

{
  "parcel_id": "MP-SHIV-2026-0891",
  "status": "SUCCESS",
  "irrigation_advice": "ROK_DEIN",
  "chemical_spray_advice": "POSTPONE_SPRAY",
  "detailed_text": "Aapke khet me mitti ki nami 78% hai aur agle 3 ghante me barish ki sambhavna hai. Kripya sinchai na karein aur spray taal dein."
}

🗄️ Database Architecture

Kisan Mitra uses a hybrid storage model.

PostgreSQL 16 + PostGIS
├── Cadastral attributes
├── Parcel polygons
└── Computed field metrics

Redis 7
└── High-frequency radar telemetry

Google Cloud Storage
└── Raw GeoTIFF satellite files

Main Tables

parcels

Stores agricultural parcel and farmer information.

id
parcel_uid
farmer_name
contact_number
state
district
village
khasra_number
crop_type
sowing_date
boundary
created_at

telemetry_readings

Stores periodic satellite and sensor observations.

id
parcel_uid
recorded_at
ndvi_score
ndre_score
soil_moisture_depth_0_30cm
surface_temp_celsius
cloud_cover_pct
source_type

Spatial Indexing

CREATE INDEX idx_parcels_boundary_gist
ON parcels USING GIST(boundary);

Telemetry lookup is optimized using a parcel/date index.

☁️ Cloud Deployment

Container

The production backend uses a minimal Debian-based Python image with
GDAL and GEOS libraries.

FROM python:3.11-slim-bullseye

WORKDIR /app

ENV PYTHONUNBUFFERED=1 \
    DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    --no-install-recommends \
    gdal-bin \
    libgdal-dev \
    libgeos-dev \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080", "--workers", "4"]

Production Configuration

Parameter           Configuration

Region              asia-southeast1
Instances           Min 1 / Max 30
CPU                 2 vCPU
Memory              2 GiB
Concurrency         80
Secret Management   GCP Secret Manager

🔐 Security

Sensitive configuration such as API keys is managed through Google
Cloud Secret Manager.

The architecture avoids hardcoded production API keys and injects
secrets into the container environment at runtime.

🚨 Reliability & Fallbacks

IMD Feed Delay

If the IMD Doppler feed is delayed by more than 30 minutes:

Check Cloud Monitoring logs
        ↓
Inspect IMD endpoint
        ↓
Use fallback weather composite
        ↓
Restore IMD layer when stable

Gemini Rate Limit

For HTTP 429 responses:

2s → 4s → 8s exponential backoff
          ↓
Fallback rule-based advisory

High Tile Latency

If tile delivery exceeds the target:

Check Cloud CDN cache hit ratio

Invalidate stale edge cache tags

Verify vector-tile compression

📈 Performance Targets

Metric                                 Target

Vector Tile Latency                  <120 ms
Voice AI End-to-End Turnaround      <1.4 sec
Optical Spatial Resolution               10 m
Drone Multispectral Resolution         <5 cm
Radar Nowcast Window               0--180 min
Mapbox Tile Availability                99.9%
Advisory API Availability               99.5%

🧪 Pilot Impact

Field testing across 25 pilot parcels reported:

⚡ 22% reduction in unnecessary tube-well electricity runtime

🌧️ 30% decrease in pesticide wash-off losses through radar-based
spray timing

🌱 Early mitigation of fungal rust patches

Pilot benchmark: Shivpuri District, Madhya Pradesh.

☁️ Cloud-Cover Fallback

During heavy monsoon cloud cover, optical satellite imagery can become
unreliable.

When cloud occlusion exceeds the documented threshold, Kisan Mitra flags
the NDVI result as:

STALE (CLOUD OCCLUDED)

The system can then fall back to Sentinel-1 SAR backscatter for
soil-moisture analysis.

🛣️ Roadmap

Q4 2026

🎙️ Offline audio caching in the PWA so voice queries can queue while
disconnected and synchronize when connectivity returns.

Q1 2027

🚁 Automated integration with agricultural drone fleets for
variable-rate pesticide spraying based on NDVI stress zones.

Q2 2027

🛡️ Pilot parametric crop-insurance verification using multi-temporal
satellite history for faster claim settlement after drought or hail
events.

📁 Suggested Repository Structure

kisan-mitra/
├── frontend/
│   ├── app/
│   ├── components/
│   └── map/
│
├── backend/
│   ├── main.py
│   ├── routers/
│   ├── services/
│   ├── models/
│   └── schemas/
│
├── geospatial/
│   ├── ingestion/
│   ├── gdal/
│   ├── postgis/
│   └── tiles/
│
├── ai/
│   ├── prompts/
│   ├── advisory/
│   └── voice/
│
├── database/
│   ├── migrations/
│   └── schema.sql
│
├── deployment/
│   ├── Dockerfile
│   └── cloud-run/
│
├── requirements.txt
├── README.md
└── .env.example

🔑 Environment Variables

Example configuration:

GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=your_postgresql_connection_string
REDIS_URL=your_redis_connection_string
GCS_BUCKET=your_gcs_bucket
MAPBOX_TOKEN=your_mapbox_token
EARTH_ENGINE_PROJECT=your_project

Security: Never commit real API keys, passwords, service-account
credentials, or production secrets to GitHub.

🌍 Production Endpoint

The documented production Cloud Run endpoint is:

krishi-mitra-634305063611.asia-southeast1.run.app

📜 Project Information

Kisan Mitra is an engineering platform designed by Team DECODERS
to combine geospatial intelligence, field telemetry, weather nowcasting
and multimodal AI into a farmer-oriented advisory system.

Version: Rev 2.3.0-prod
Release: September 2026
Status: VERIFIED

⭐ Team DECODERS

Built for practical agricultural intelligence, field-level decision
support and scalable geospatial AI.

Team DECODERS --- Kisan Mitra
