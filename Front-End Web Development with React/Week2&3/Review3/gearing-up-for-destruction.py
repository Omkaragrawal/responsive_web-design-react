# from fractions import Fraction


# def answer(pegs):
#     n = len(pegs)
#     if ((not pegs) or n == 1):
#         return [(-1), (-1)]

#     even = True if (n % 2 == 0) else False
#     sum = (- pegs[0] + pegs[n - 1]) if even else (- pegs[0] - pegs[n - 1])

#     if (n > 2):
#         for i in range(1, n-1):
#             sum += 2 * ((-1))**(i+1) * pegs[i]

#     FirstGearRadius = Fraction(2 * (float(sum)/3 if even else sum)).limit_denominator()

#     # now that we have the radius of the first gear, we should again check the input array of pegs to verify that
#     # the pegs radius' is atleast 1.
#     # since for valid results, LastGearRadius >= 1 and FirstGearRadius = 2 * LastGearRadius
#     # thus for valid results FirstGearRadius >= 2

#     if FirstGearRadius < 2:
#         return [(-1), (-1)]

#     currentRadius = FirstGearRadius
#     for index in range(0, n-2):
#         CenterDistance = pegs[index+1] - pegs[index]
#         NextRadius = CenterDistance - currentRadius
#         if (currentRadius < 1 or NextRadius < 1):
#             return [(-1), (-1)]
#         else:
#             currentRadius = NextRadius

#     return [FirstGearRadius.numerator, FirstGearRadius.denominator]

# if __name__ == "__main__":
#     print(answer([2, 5, 7, 9]))
#     print(answer([4, 30, 50]))

from fractions import Fraction


def solution(pegs):
    if len(pegs) > 2:
        n = len(pegs)
        # Calculating the first part of numerator
        # r1 = -pegs[0] (- if odd + if even) pegs[-1]
        r1 = (-pegs[0] - pegs[-1]) if n % 2 == 1 else (-pegs[0] + pegs[-1])

        # Calculates the first term of the summation
        mid_calculation = ((-1) ** 2) * pegs[1]
        # Calculating summation here starting from the second term
        # Here n -2 is used because the counting starts from 0 hence actual n-1 is programatically n-1
        for i in range(2, n - 1):
            # Adds and calculates the summation terms
           mid_calculation += ((-1) ** (i + 1)) * pegs[i]
        # Multiplies Final Summation value by 2
        mid_calculation *= 2

        # Adds the summatin * 2 to the previous part
        r1 += mid_calculation
        # Calculates Denominator as 3 if odd and 1 if even  (n%2 gives you the remaider when n divided by 2)
        r1_denom = 1 if(n % 2 == 1) else 3
        # Multiplies numerator by 2
        r1 *= 2
        # print(r1, r1_denom)
        # Stores the fraction as fraction. Without calculating it
        try:
            fraction = Fraction(r1 * 2, r1_denom * 2)
            if(fraction < 2):
                return([-1, -1])
            print(fraction)

            any_small_gear = False
            all_radius = [fraction]
            for i in range(1, n-1):
                temp_value = (pegs[i] - (2 * sum(all_radius)))
                print(temp_value)
                if temp_value >= 1:
                    all_radius.append(temp_value)
                else:
                    any_small_gear = True
                    return([-1, -1])
            if(any_small_gear == True):
                return([-1, -1])
            else:
                return([fraction.numerator, fraction.denominator])
        except Exception as err:
            print(err)
    elif len(pegs) < 1:
        return([-1, -1])
    elif len(pegs) == 2:
        return([-1, -1])


if __name__ == "__main__":
    print(solution([4, 30, 50]))
    print(solution([2, 5, 7, 9]))
    print(solution([2, 5, 7, 9, 11]))
    print(solution([1, 2, 3, 4]))
