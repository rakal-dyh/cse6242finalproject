#!/usr/bin/env python
# Written by Vamei

import cgi
form = cgi.FieldStorage()

from weather import Weather
import csv
#from geocoder import getlatlng, teststr
from mygeocoder import getlatlng
#from getstation import getstationdata
#from calculatestation import main
#weather = Weather()
# Output to stdout, CGIHttpServer will take this as response to the client
print "Content-Type: text/html"     # HTML is following
print                               # blank line, end of headers

loc1=form.getvalue('location').replace('!','&')
loc2=form.getvalue('location2').replace('!','&')
stationid=form.getvalue('stationid')
#month=form.getvalue('month')
#day=form.getvalue('day')
#time=form.getvalue('time')
#number=form.getvalue('number')



'''
#set default value
if len(loc1)==0:
    loc1="Military Rd NW & Reno Rd NW, DC"
if len(loc2)==0:
    loc2="dc convention center"
if len(lstationid)==0:
    stationid=31100
if len(month)==0:
    month=4
'''

'''
#location = weather.lookup_by_location(loc)
#condition = location.condition()
#forecasts = location.forecast()

for forecast in forecasts:
    print(forecast.text())
    print(forecast.date())
    print(forecast.high())
    print(forecast.low())
'''

#get lat lng for origin and destination
def calculatelatlng(loc1,loc2):
    latlng1=getlatlng(loc1)
    lat1=latlng1[0]
    lng1=latlng1[1]
    latlng2=getlatlng(loc2)
    lat2=latlng2[0]
    lng2=latlng2[1]
    return (lat1,lng1,lat2,lng2)
lat1, lng1, lat2, lng2=calculatelatlng(loc1,loc2)
print str(lat1)+"\t"+str(lng1)+"\t"+str(lat2)+"\t"+str(lng2)+"\t"+str(stationid)
#print loc1
#print loc2
#print "aaaaa"
# plot linechat
def getstationdata(id):
    filein="./data/2016Q2combineddatainDC.tsv"
    fileout="./data/stationusefull.tsv"
    writeline=[]
    with open(filein) as tsvfile:
        tsvreader = csv.reader(tsvfile, delimiter="\t")
        #max=10
        morning_peak=range(28,40)
        afternoon_peak=range(64,76)
        workday=range(1,6)
        for index, line in enumerate(tsvreader):
            if line[0]==id:
                beginsign=line[5]

                if beginsign=="01":
                    count=0
                count=count+int(line[11])
                num=int(line[12])+count
                line.append(str(count))

                if int(line[5]) in morning_peak:
                    line.append("1")
                else:
                    line.append("0")
                if int(line[5]) in afternoon_peak:
                    line.append("1")
                else:
                    line.append("0")
                if int(line[4]) in workday:
                    line.append("1")
                else:
                    line.append("0")
                line.append(str(num))
                writeline.append(line)
            #if index>=max:
            #    break
    with open(fileout,"w") as tsvfile:
        tsvwriter = csv.writer(tsvfile, delimiter="\t")
    with open(fileout,"w") as tsvfile:
        tsvwriter = csv.writer(tsvfile, delimiter="\t")
        for line in writeline:
            tsvwriter.writerow(line)
def get():
    filein="./data/stationusefull.tsv"
    fileout="./data/stationuse.tsv"
    writeline=[]
    with open(filein) as tsvfile:
        tsvreader = csv.reader(tsvfile, delimiter="\t")
        #max=10

        for index, line in enumerate(tsvreader):
                writeline.append(line)
            #if index>=max:
            #    break
    with open(fileout,"w") as tsvfile:
        tsvwriter = csv.writer(tsvfile, delimiter="\t")
    with open(fileout,"w") as tsvfile:
        tsvwriter = csv.writer(tsvfile, delimiter="\t")
        tmp=["stationID","year","month",
             "day","week","time","temp",
             "humidity","condition","numin","numout","numchange"]
        tsvwriter.writerow(tmp)
        for line in writeline:
            tsvwriter.writerow(line[:13])
getstationdata(str(stationid))
get()
