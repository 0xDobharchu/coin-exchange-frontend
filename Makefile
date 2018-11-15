.PHONY: deploy
deploy:
	rm -f deployments.tar.enc;
	tar cvf deployments.tar deployments/;
	travis encrypt-file deployments.tar;
