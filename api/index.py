"""
Vercel Serverless Entrypoint for StackFolio Resume Intelligence API.
"""

import sys
import os

# Add the backend intelligence module path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "OCR model api"))

from main import app  # Export FastAPI ASGI app for Vercel
