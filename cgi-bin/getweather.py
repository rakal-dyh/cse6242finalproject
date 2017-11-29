#!/usr/bin/env python
# Written by Yinghui DOng
import csv
def weatherprocess(loc):
    from weather import Weather
    weather = Weather()

    fileout="2016Q2dayaccumlated.tsv"
    writeline=[]

    location = weather.lookup_by_location(loc)
    condition = location.condition()
    forecasts = location.forecast()
    for forecast in forecasts:
        print(forecast.text())
        print(forecast.date())
        print(forecast.high())
        print(forecast.low())
