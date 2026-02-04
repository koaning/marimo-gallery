# /// script
# requires-python = ">=3.11"
# dependencies = [
#     "jinja2",
#     "marimo",
#     "pyyaml",
# ]
# ///

import marimo

__generated_with = "0.10.19"
app = marimo.App(width="medium")


@app.cell
def _():
    import marimo as mo
    import shutil
    from pathlib import Path
    import yaml
    from jinja2 import Environment, FileSystemLoader
    return Environment, FileSystemLoader, Path, mo, shutil, yaml


@app.cell
def _(Path):
    root = Path(__file__).parent
    dist = root / "docs"
    return dist, root


@app.cell
def _(dist):
    # Ensure dist directory exists (screenshots live here permanently)
    dist.mkdir(exist_ok=True)
    return


@app.cell
def _(root, yaml):
    # Load notebook data
    with open(root / "notebooks.yaml") as f:
        data = yaml.safe_load(f)

    notebooks = data.get("notebooks", [])
    notebooks
    return data, f, notebooks


@app.cell
def _(notebooks):
    # Extract unique tags
    all_tags = set()
    for notebook in notebooks:
        all_tags.update(notebook.get("tags", []))
    tags = sorted(all_tags)
    tags
    return all_tags, notebook, tags


@app.cell
def _(Environment, FileSystemLoader, notebooks, root, tags):
    # Render template
    env = Environment(loader=FileSystemLoader(root / "templates"))
    template = env.get_template("index.html")
    html = template.render(notebooks=notebooks, tags=tags)
    return env, html, template


@app.cell
def _(dist, html):
    # Write output
    (dist / "index.html").write_text(html)
    return


@app.cell
def _(dist, root, shutil):
    # Copy static assets
    for static_file in (root / "static").iterdir():
        shutil.copy(static_file, dist / static_file.name)
    return (static_file,)


@app.cell
def _(dist, mo, notebooks):
    mo.md(f"Built gallery with {len(notebooks)} notebooks to `{dist}`")
    return


if __name__ == "__main__":
    app.run()
