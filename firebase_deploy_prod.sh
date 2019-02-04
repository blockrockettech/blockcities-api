#!/usr/bin/env bash

firebase use block-cities;
firebase deploy --only functions;
