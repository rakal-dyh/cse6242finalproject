
def getlatlng(loc):
    import geocoder
    g = geocoder.google(loc)
    return g.latlng

if __name__=="__main__":
    print getlatlng('Military Rd NW & Reno Rd NW, DC')
