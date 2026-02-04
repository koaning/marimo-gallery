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
   - Copies static assets to `dist/`

3. **Output**: Static HTML in `dist/` that can be deployed anywhere

## Commands

```bash
make build   # Generate dist/index.html
make serve   # Build and serve at localhost:8000
make clean   # Remove dist/
```

## Adding New Notebooks

Edit `notebooks.yaml` and add a new entry. The build will automatically pick up new entries and generate tag filters.

## Tech Stack

- Python with inline script dependencies (PEP 723)
- Jinja2 for templating
- Bootstrap 5 for styling
- Vanilla JS for client-side search/filtering
- uv for running scripts
