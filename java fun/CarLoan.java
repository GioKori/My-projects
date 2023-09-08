//Program calculates the loan.

public class CarLoan {
	public static void main(String[] args) {

	int carLoan = 10000;
  int loanLength = 3;
  int interestRate = 5;
  int downPayment = 5000;
  if (loanLength <= 0 || interestRate <= 0){
    System.out.println("Error! You must take out valid car load!");
  } else if (downPayment >= carLoan){
    System.out.println("Thecar can  be paid in full");
  } else {
    int remainingBalance = carLoan - downPayment;
    int months = loanLength *12;
    int monthlyBalance = remainingBalance / months;
    int interest = monthlyBalance * interestRate / 100;
   int  monthlyP = monthlyBalance + interest;
   System.out.println(monthlyP);  
   }
	}
}