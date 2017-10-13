#!/bin/sh

HOST=""

#"$@"
run() {
	docker exec ${HOST} sh -c $1
}

if [ -z "$HOST" ]; then
  echo "/!\\ HOSTNAME NOT SET"
else
	if [ "$HOST" == "$HOSTNAME" ]; then
  		echo "/!\\ CANNOT RUN ON HOST"
	else
		case "$1" in
		"composer:update")
		    run "echo composer"
		    ;;
		"bower:update")
			run "echo bower"
			;;
		"composer:script")
			run "echo starting script $2"
			;;
		"assets:dev")
			run "echo dump dev"
			;;
		"assets:prod")
			run "echo dump prod"
			;;
		"cache:clear")
			run "echo cache clear"
			;;
		"docker:build")
			run "echo docker build"
			;;
		"rancher:upgrade")
			run "echo rancher upgrade"
			;;
		*)
		    echo "Unknown parameter \"$1\""
		    ;;
		esac
	fi
fi