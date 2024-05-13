import sys
import heapq

n, m = map(int, sys.stdin.readline().rstrip().split())
answer = []
graph = [[] for _ in range(n + 1)]
inDegree = [0 for _ in range(n+1)]
queue = []

for i in range(m):
    first, second = map(int, sys.stdin.readline().rstrip().split())
    graph[first].append(second)
    inDegree[second] += 1 #선수 문제 + 1

for i in range(1, n + 1):
    if inDegree[i] == 0:
        heapq.heappush(queue, i) # 선수 문제가 없는 문제 우선순위 큐에 삽입

while queue:
    tmp = heapq.heappop(queue)
    answer.append(tmp)
    for i in graph[tmp]:
        inDegree[i] -= 1
        if inDegree[i] == 0:
            heapq.heappush(queue, i)

print(" ".join(map(str, answer)))