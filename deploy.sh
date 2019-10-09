#!/bin/sh

yarn build

gsutil rsync -r build gs://physicalexamination.neilashford.com
