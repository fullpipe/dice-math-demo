build:
	docker build -t fullpipe/dice-math-demo .

push:
	docker push fullpipe/dice-math-demo

deploy: build push
	kubectl -n dice-math rollout restart deployment dice-math
