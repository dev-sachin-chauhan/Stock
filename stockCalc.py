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


def readFile():
	dataList = []
	with open('ind_nifty50list.csv', 'rb') as csvfile:
		dataReader = csv.reader(csvfile, delimiter=',', quotechar='|')
		for row in dataReader:
			date = row[0]
			closePrice = row[2]
			if closePrice != 'null':
				#print date.split('-')[1], closePrice
				dataList.append(closePrice)

	return dataList
		 
def main():
	dataList = readFile()
	print dataList;
	#print iterateData(dataList,650)



main()
