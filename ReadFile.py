


def readFile():
	dataList = []
	# with open('DUMP.rtf','r') as f:
		# print [line.split('"') for line in f]
		# print(line)
	with open('file.txt','r') as f:
		for line in f:
			# for word in line.split('\r'):
			# 	print word
				# if word.split('=')[0] == 'data-value':
				# 	print word.split('=')[1],
				# if word.split('=')[0] == 'aria-label':
				# 	print word.split('=')[1]
			# print "<item> %s\" </item>"% line
			print line.split('\n')[0]

	return dataList



def main():
	dataList = readFile()

main()