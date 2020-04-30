list_a = [1, 2, 3,4, 2,3 ,2,4,6,2,45,67,8,2,6,7]

# solution(list_a, 1)


def solution(data, n):
    # Your code here
    if n == 0:
        return []
    else:
        return_list = []
        for i in range(0, len(data)):
            count = data.count(data[i])
            if count <= n:
                return_list.append(data[i])
        return return_list


print(solution([1, 2, 2, 3, 3, 3, 4, 5, 5], 1))
