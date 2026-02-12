# Marimo Notebook Gallery

A static site generator for showcasing marimo notebook demos.

## How It Works

1. **Data source**: `notebooks.yaml` contains all gallery entries with:
   - `name`: Display name
   - `description`: Short description
   - `notebook_url`: Link to source code (GitHub)
   - `molab_url`: Link to interactive demo
   - `screenshot_path`: URL to preview image
   - `tags`: List of tags for filtering

2. **Build process**: `build.py` is a marimo notebook that:
   - Reads `notebooks.yaml`
   - Renders `templates/index.html` with Jinja2
   - Copies static assets to `docs/`

3. **Output**: Static HTML in `docs/` that can be deployed anywhere (GitHub Pages compatible)

## Commands

```bash
make build   # Generate docs/index.html
make serve   # Build and serve at localhost:8000
make clean   # Remove docs/
```

## Adding New Notebooks

Edit `notebooks.yaml` and add a new entry. The build will automatically pick up new entries and generate tag filters. Do not use the "anywidget" tag — use "widget" instead.

## Tech Stack

- Python with inline script dependencies (PEP 723)
- Jinja2 for templating
- Bootstrap 5 for styling
- Vanilla JS for client-side search/filtering
- uv for running scripts
