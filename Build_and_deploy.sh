#!/usr/bin/env bash

grunt build --force

aws s3 rm s3://www.logmyrocket.info --recursive --region us-east-1

aws s3 sync dist s3://www.logmyrocket.info --region us-east-1