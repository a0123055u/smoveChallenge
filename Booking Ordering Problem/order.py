import json
from pprint import pprint

with open('data.json') as data_file:    
    data = json.load(data_file)

dicStore={}
sortedDictStore={}
missedList={}

for inn in data:
	#print(inn['start'],inn['end'])
	tempStrorage=str(inn['start'])+str(inn['end'])
	dicStore.update({inn['id']:tempStrorage})
	
	


for y in dicStore.keys():	
	curr=dicStore.get(y)
	curr_lastDigit= list(curr)
	#print(curr_lastDigit)
	if(y != len(dicStore)):
		next=dicStore.get(y+1)
		next_firstDigit=list(next)
		#print(next_firstDigit)
		
	#print(curr_lastDigit)
	#print(next_firstDigit)
	if(y != len(dicStore)):		
		if(curr_lastDigit[-1] == next_firstDigit[0]):
			#print('values',curr_lastDigit[-1],next_firstDigit[0])
			sortedDictStore.update({y:curr})
			sortedDictStore.update({y+1:next})
		else :
			missedList.update({y:curr})
		
	
	
	#print(dicStore.get(y))
	



#print(sortedDictStore)


#print(missedList)	

semiSortedIndex= missedList.keys()


	
removeIndex = sortedDictStore.keys()



removeList = list(set(removeIndex).intersection(semiSortedIndex))

for key in removeList:
	del missedList[key]

a=list(sortedDictStore.keys())
b=list(missedList.keys())

#print(removeList)	

#print(missedList)

print(a)
print(b)
	
#for oo in missedList.keys():
	#eleInsert = missedList.get(oo)
	#eleInsert_lastDigit=list(eleInsert)
	#for ind in sortedDictStore.keys():
	#	chkElement = sortedDictStore.get(ind)
	#	chkElement_FirstDigit=list(chkElement)
	#	if(eleInsert_lastDigit[-1] == chkElement_FirstDigit[0]):
	#		a.insert(ind,oo)
	#		continue

			
		
		


#print(a)	


	
	






