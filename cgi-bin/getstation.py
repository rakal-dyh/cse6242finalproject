#!/usr/bin/env python
# Written by Yinghui DOng

def getstationdata(id):
    import csv
    filein="../data/2016Q2combineddatainDC.tsv"
    fileout="../data/stationuse.tsv"
    writeline=[]
    with open(filein) as tsvfile:
        tsvreader = csv.reader(tsvfile, delimiter="\t")
        #max=10

        for index, line in enumerate(tsvreader):
            if line[0]==id:
                writeline.append(line)
            #if index>=max:
            #    break
    with open(fileout,"w") as tsvfile:
        tsvwriter = csv.writer(tsvfile, delimiter="\t")

        for line in writeline:
            tsvwriter.writerow(line)


#if __name__=="__main__":
#    getstationdata("31100")
