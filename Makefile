.PHONY: build
build:
	docker build --platform=linux/amd64 --target release -t registry.gitlab.com/fullpipe/registry/dice-math-demo .

push:
	docker push registry.gitlab.com/fullpipe/registry/dice-math-demo:latest

