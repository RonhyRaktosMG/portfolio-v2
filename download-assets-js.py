import os
import requests
from urllib.parse import urljoin, urlparse
from pathlib import Path

# Configuration
BASE_URL = "https://mhrrony.com/"
OUTPUT_DIR = "portfolio_download"
TIMEOUT = 10

# Create output directory
Path(OUTPUT_DIR).mkdir(exist_ok=True)

# Files and resources to download
RESOURCES = {
    "css": [
        "css/bootstrap.min.css",
        "css/stylesheet.css",
        "css/animate.min.css",
        "css/all.min.css",
        "css/owl.carousel.min.css",
        "css/magnific-popup.min.css",
        "css/color-cyan.css",
        "css/solar-system.css",
        "css/theme-and-portfolio.css",
    ],
    "js": [
        "js/jquery.min.js",
        "js/bootstrap.bundle.min.js",
        "js/parallax.min.js",
        "js/jquery.easing.min.js",
        "js/jquery.appear.min.js",
        "js/imagesloaded.pkgd.min.js",
        "js/jquery.countTo.min.js",
        "js/typed.min.js",
        "js/wow.min.js",
        "js/owl.carousel.min.js",
        "js/isotope.pkgd.min.js",
        "js/jquery.magnific-popup.min.js",
        "js/switcher-enhanced.js",
        "js/main.js",
        "js/solar-system.js",
        "js/contact-form.js",
        "js/theme-toggle.js",
    ],
}

def download_file(url, filepath):
    """Télécharge un fichier depuis une URL"""
    try:
        response = requests.get(url, timeout=TIMEOUT, allow_redirects=True)
        response.raise_for_status()
        
        # Créer les répertoires si nécessaire
        filepath.parent.mkdir(parents=True, exist_ok=True)
        
        with open(filepath, 'wb') as f:
            f.write(response.content)
        print(f"✓ Téléchargé: {filepath}")
        return True
    except Exception as e:
        print(f"✗ Erreur pour {url}: {e}")
        return False

def main():
    print("Démarrage du téléchargement des fichiers du portfolio...\n")
    
    downloaded = 0
    failed = 0
    
    for category, files in RESOURCES.items():
        print(f"\n--- Téléchargement {category.upper()} ---")
        for file in files:
            url = urljoin(BASE_URL, file)
            filepath = Path(OUTPUT_DIR) / file
            
            if download_file(url, filepath):
                downloaded += 1
            else:
                failed += 1
    
    print(f"\n\n=== Résumé ===")
    print(f"✓ Fichiers téléchargés: {downloaded}")
    print(f"✗ Erreurs: {failed}")
    print(f"Dossier de destination: {OUTPUT_DIR}/")

if __name__ == "__main__":
    main()
