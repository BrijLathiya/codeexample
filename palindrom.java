public class palindrom {
    public static void main (String[] args){
    String s = "brijbrij";
    int n=s.length();
    int i=0;
    int j=n-1;
    while(i<j){
        if(s.charAt(i) != s.charAt(j)){
            System.out.println("not a palindrom");
            return;
        }
        else if(s.charAt(i)==s.charAt(j)){ 
            i++;
            j--;
        }
    }
        System.out.println("palindrom");
    }

}
