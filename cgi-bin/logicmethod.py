import csv
import math

def readdata(filein,year,month,day,isworkday,time):
    #data=[]

    with open(filein) as tsvfile:
        tsvreader = csv.reader(tsvfile, delimiter="\t")
        max=9600
        morning_peak=range(28,40)
        afternoon_peak=range(64,76)
        workday=range(1,6)
        bedata=[]
        afdata=[]
        thdata=[]
        thacc=[]
        thpre=[]
        for index, line in enumerate(tsvreader):
            readflag=0

            if index==0:
                capacity=line[12]
            workday=int(line[4])
            #print workday
            if isworkday==1:
                if workday not in range(6):
                    readflag=0
                else:
                    readflag=1
            else:
                if workday in range(6):
                    readflag=0
                    pass
                else:
                    readflag=1
            thistime=int(line[5])
            choosetime=time
            choosetrange=range(choosetime-8,choosetime+4)
            crange1=range(choosetime-8,choosetime)
            crange2=range(choosetime+1,choosetime+5)
            if readflag==1:
                if thistime in crange1:
                    bedata.append(line[11])
                if thistime in crange2:
                    afdata.append(line[11])
                if thistime==choosetime:
                    thdata.append(line[11])
                    thacc.append(line[13])
                    thpre.append(line[17])
            #if index>=max:
            #    break
        return (bedata, afdata, thdata, capacity, thacc, thpre)

def mainprocess(bedata,afdata,thdata,thacc,thpre):

    def dealthdata(thdata):
        sum=0
        avg=0
        for i in thdata:
            sum=sum+int(i)
        avg=float(sum)/float(len(thdata))
        print avg
        #print len(thdata)
        #print sum
        sum=0.0
        for i in thdata:
            ii=int(i)
            sum=sum+(ii-avg)*(ii-avg)
        sum=float(sum)/float(len(thdata))
        stddev=math.sqrt(sum)
        print stddev
        print "----"
        #print thdata
        return avg,stddev

    def dealbedata(bedata):
        sum=0
        avg=0

        ind=0
        bedata2=[]
        for i in bedata:
            ind=ind+1
            if ind<8:
                sum=sum+int(i)
            else:
                sum=sum+int(i)
                bedata2.append(sum)
                sum=0
                ind=0
        #print bedata2

        for i in bedata2:
            sum=sum+int(i)
        avg=float(sum)/float(len(bedata2))
        print avg
        #print len(thdata)
        #print sum
        sum=0.0
        for i in bedata2:
            ii=int(i)
            sum=sum+(ii-avg)*(ii-avg)
        sum=float(sum)/float(len(bedata))
        stddev=math.sqrt(sum)
        print stddev
        print "----"
        return avg,stddev
        #print bedata2
    def dealafdata(afdata):
        sum=0
        avg=0

        ind=0
        afdata2=[]
        for i in afdata:
            ind=ind+1
            if ind<4:
                sum=sum+int(i)
            else:
                sum=sum+int(i)
                afdata2.append(sum)
                sum=0
                ind=0
        #print afdata2

        for i in afdata2:
            sum=sum+int(i)
        avg=float(sum)/float(len(afdata2))
        print avg
        #print len(thdata)
        #print sum
        sum=0.0
        for i in afdata2:
            ii=int(i)
            sum=sum+(ii-avg)*(ii-avg)
        sum=float(sum)/float(len(bedata))
        stddev=math.sqrt(sum)
        print stddev
        print "----"
        return avg,stddev
        #print afdata2

    def dealthacc(thacc):
        sum=0
        avg=0
        for i in thacc:
            sum=sum+int(i)
        avg=float(sum)/float(len(thacc))
        print avg
        #print len(thdata)
        #print sum
        sum=0.0
        for i in thacc:
            ii=int(i)
            sum=sum+(ii-avg)*(ii-avg)
        sum=float(sum)/float(len(thacc))
        stddev=math.sqrt(sum)
        print stddev
        print "----"
        #print thdata
        return avg,stddev
    def dealthpre(thpre):
        sum=0
        avg=0
        for i in thpre:
            sum=sum+int(i)
        avg=float(sum)/float(len(thpre))
        print avg
        #print len(thdata)
        #print sum
        sum=0.0
        for i in thpre:
            ii=int(i)
            sum=sum+(ii-avg)*(ii-avg)
        sum=float(sum)/float(len(thpre))
        stddev=math.sqrt(sum)
        print stddev
        print "----"
        #print thdata
        return avg,stddev
    [avg1,stddev1]=dealthdata(thdata)
    [avg2,stddev2]=dealbedata(bedata)
    [avg3,stddev3]=dealafdata(afdata)
    [avg4,stddev4]=dealthacc(thacc)
    [avg5,stddev5]=dealthpre(thpre)
    return avg1, stddev1, avg2, stddev2, avg3, stddev3, avg4, stddev4, avg5, stddev5


def getpos(thavg,thdev,beavg,bedev,afavg,afdev,accavg,accdev,preavg,predev,capacity,bnum):
    import math
    #negpercent=float(beavg)/float(capacity)
    #initp=11-bnum
    #if initp<5:
    #    initp=5
    #tw=10.0
    #tp=10.0*initp*10
    print "======="
    numfactor=((bnum+0.5)*(bnum+0.5))/4
    print numfactor
    tw=0.0
    tp=0.0
    def method1():
        if beavg-bedev>bnum:
            return 20,100*10
        else:
            return 0,0
    [w,p]=method1()
    #print w,p
    tw=tw+w
    tp=tp+p

    def method2():
        if accavg-accdev>bnum:
            return 20,100*10
        else:
            return 0,0
    [w,p]=method2()
    #print w,p
    tw=tw+w
    tp=tp+p

    def method3():
        uplimit=preavg+bnum*numfactor+predev*2
        lowlimit=-0.1*float(capacity)
        totalran=uplimit-lowlimit
        thisran=preavg-0.5*predev-lowlimit
        score=thisran/totalran
        if score>1:
            score=1.0
        if score<0:
            score=0.0
        print uplimit,lowlimit
        print totalran
        print thisran
        print score
        pass
    method3()
    #[w,p]=method3(preavg,predev,capacity,afavg,afdev)
    #tw=tw+w
    #tp=tp+p
    #print w,p

    if preavg>bnum:
        if preavg-2*predev<bnum:
            if preavg-predev>bnum:
                w=10
                p=10*40
            else:
                w=10
                p=10*20
    else:
        if preavg+predev>bnum:
            w=20
            p=20*10
        else:
            w=20
            p=0
    tw=tw+w
    tp=tp+p
    #print w,p



    if (tp>0) & (tw>0):
        return float(tp)/float(tw)
    else:
        return 0





if __name__=="__main__":

    filepath="../data/stationusefull.tsv"
    year=2016
    month=5
    day=5
    isworkday=1
    time=76
    bnum=1

    bedata=[]
    afdata=[]
    thdata=[]
    capacity=0
    [bedata,afdata,thdata,capacity,thacc,thpre]=readdata(filepath,year,month,day,isworkday,time)
    [thavg,thdev,beavg,bedev,afavg,afdev,accavg,accdev,preavg,predev]=mainprocess(bedata,afdata,thdata,thacc,thpre)
    print capacity
    print "-------"
    pos=getpos(thavg,thdev,beavg,bedev,afavg,afdev,accavg,accdev,preavg,predev,capacity,bnum)
    print pos

    '''
    print len(bedata)
    print "---"
    print len(afdata)
    print "---"
    print len(thdata)
    print "---"
    '''
