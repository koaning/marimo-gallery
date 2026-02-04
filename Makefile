.PHONY: build serve clean

build:
	uv run build.py

serve: build
	cd dist && uv run python -m http.server 8000

clean:
	rm -rf dist
