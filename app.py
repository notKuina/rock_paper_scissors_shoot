import random

choices = ["rock", "paper", "scissors"]

def get_winner(user, computer):
    if user == computer:
        return "It's a tie!"
    elif (user == "rock" and computer == "scissors") or \
         (user == "scissors" and computer == "paper") or \
         (user == "paper" and computer == "rock"):
        return "You win!"
    else:
        return "Computer wins!"

while True:
    user = input("Enter rock, paper, or scissors (or 'exit'): ").lower()
    
    if user == "exit":
        print("Game ended.")
        break

    if user not in choices:
        print("Invalid choice, try again.")
        continue

    computer = random.choice(choices)

    print("Computer chose:", computer)
    print(get_winner(user, computer))