.PHONY: build serve clean

build:
	uv run build.py

serve: build
	cd docs && uv run python -m http.server 8000

clean:
	rm -rf docs
