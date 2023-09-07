public class Calculator {
  public Calculator(){

  }

    public int add(int a, int b){
    return a + b;
    }

    public int substract(int a, int b){
     return a - b;
    }
  public int multiply(int a, int b){
    return a * b;
  }

public int divide(int a, int b){
  return a / b;
}

public int modulo(int a,int b){
return a % b;
 }

public static void main(String[] args){
Calculator myCalculator = new Calculator();
System.out.println(myCalculator.add(5,7));
System.out.println(myCalculator.substract(45,11));
System.out.println(myCalculator.multiply(123,13));
System.out.println(myCalculator.divide(234324234,113));
System.out.println(myCalculator.modulo(2342432,23));    
    }
  }