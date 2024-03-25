import sys
import heapq
input=sys.stdin.readline
n,k = map(int,input().split())
gems = [[*map(int,input().split())] for _ in range(n)]
bags = [int(input()) for _ in range(k)]
gems.sort();bags.sort()
result = 0;tmp = [] 

for bag in bags:
    while gems and gems[0][0] <= bag:
        heapq.heappush(tmp, -gems[0][1])
        heapq.heappop(gems)
    if tmp:
        result -= heapq.heappop(tmp)
print(result)

# 완전 탐색으로 구현시 가방 갯수(K) * 보석 갯수(N) = 900억
# 가방과 보석을 오름차순 정렬한 뒤 현재 가방의 무개에 넣을 수 없는 보석은 고려하지 않는다.
# 무게를 비교해 가방에 넣을 수 있는 보석은 가격을 기준으로 최대힙에 넣어준다.
# 이 때 주의할 점은 무게가 더 작아도 가격이 비쌀 수 있다. 이전 가방에 넣은 보석도 현재 가방에서 고려해야한다.
"""
10 15

[8, 10] [9, 7] [12, 3]
현재 가방이 10일 때 힙에 [8, 10], [9, 7]을 넣을 수 있고 [8, 10]이 pop된다. (가격이 비싼 것을 선택하기 때문에)
현재 가방이 12일 때 [12, 3]을 넣을 수 있고 [9, 7]이 pop된다.

즉, 이전 가방에서 힙에 넣은 보석도 고려해야한다.
"""

# 나는 처음에 보석과 가방을 내림차순으로 정렬하려고 했는데
# 이렇게 하면 "무게가 더 작아도 가격이 비쌀 수 있다." 이 부분을 만족시킬 수 없다.
