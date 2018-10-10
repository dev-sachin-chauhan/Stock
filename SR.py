import csv


def calculate(list, gap):
	callWin = 0
	putWin = 0
	midIndex = len(list)/4
	callPrice = float(list[midIndex].split(' ')[1]) + gap
	putPrice = float(list[midIndex].split(' ')[1]) - gap
	finalPrice = float(list[len(list)-1].split(' ')[1])
	print float(list[midIndex].split(' ')[1]), finalPrice - callPrice, putPrice - finalPrice
	if callPrice >= finalPrice:
		callWin = 1
	if putPrice <= finalPrice:
		putWin = 1

	return callWin, putWin

def iterateData(dataList, gap):
	monthlist = []
	callWin=0
	putWin = 0
	months = 0
	for idx, val in enumerate(dataList):
		if (idx+1)<len(dataList) and val.split(' ')[0] == dataList[idx+1].split(' ')[0]:
			monthlist.append(val)
		else:
			monthlist.append(val)
			(call,put)=calculate(monthlist, gap)
			print val.split(' ')[2], val.split(' ')[0], call, put, len(monthlist)
			monthlist = []
			months+=1
			callWin+=call
			putWin+=put

	return (callWin,putWin, months)

def calculateSR(dataList):
        sr=[]
        cs1 = 0
        cs2 = 0
        cs3 = 0
        cs4 = 0
        index =0 
        for ind, val in enumerate(dataList):
                #print ind, val;
                if cs3 > cs1 and cs3 > val and cs3 > cs2 and cs3 > cs4:
                    index+=1
                    print index, 'resistance', cs3;
                if cs3 < cs1 and cs3 < val and cs3 < cs2 and cs3 < cs4:
                    index+=1
                    print index, 'support', cs3;
                cs1 = cs2
                cs2 = cs3
                cs3 = cs4
                cs4 = val
                
def readFile():
	dataList = []
	with open('^NSEI.csv', 'rb') as csvfile:
		dataReader = csv.reader(csvfile, delimiter=',', quotechar='|')
		for row in dataReader:
			date = row[0]
			closePrice = row[4]
			if closePrice != 'null':
				#print closePrice
				dataList.append(closePrice)

	return dataList
		 
def main():
	dataList = readFile()
	calculateSR(dataList)



main()
