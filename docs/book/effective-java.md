---
sidebar_position: 1
---

# Effective java

## Chapter 2: Creating and Destroying Objects
### Use static factory method instead of constructor
```java
public static Boolean valueOf(boolean b) {
    return b ? Boolean.TRUE : Boolean.FALSE;
}
```
- Naming: from, of, getInstance.
  - `Date d = Date.from(instant)`;
  - `Set<Rank> faceCards = EnumSet.of(JACK, QUEEN, KING)`;
  - `StackWalker luke = StackWalker.getInstance(options)`;
### Use builder when face with many constructor parameters
```java
// Builder Pattern
public class NutritionFacts {
    private final int servingSize;
    private final int carbohydrate;
    public static class Builder {
        // Required parameters
        private final int servingSize;
        private int carbohydrate = 0;
        public Builder(int servingSize, int servings) {
            this.servingSize = servingSize;
        }
        public Builder carbohydrate(int val)
        { carbohydrate = val; return this; }
        public NutritionFacts build() {
            return new NutritionFacts(this);
        }
    }
    private NutritionFacts(Builder builder) {
        servingSize = builder.servingSize;
        carbohydrate = builder.carbohydrate;
    }
}
```
```java
NutritionFacts cocaCola = new NutritionFacts.Builder(240)
    .carbohydrate(27).build();
```
- Hierarchies
```java
// Builder pattern for class hierarchies
public abstract class Pizza {
    public enum Topping { HAM, MUSHROOM, ONION, PEPPER, SAUSAGE }
    final Set<Topping> toppings;
    abstract static class Builder<T extends Builder<T>> {
        EnumSet<Topping> toppings = EnumSet.noneOf(Topping.class);
        public T addTopping(Topping topping) {
            toppings.add(Objects.requireNonNull(topping));
            return self();
        }
        abstract Pizza build();
        // Subclasses must override this method to return "this"
        protected abstract T self();
    }
    Pizza(Builder<?> builder) {
        toppings = builder.toppings.clone(); // See Item 50
    }
}
```
```java
public class NyPizza extends Pizza {
    public enum Size { SMALL, MEDIUM, LARGE }
    private final Size size;
    public static class Builder extends Pizza.Builder<Builder> {
        private final Size size;
        public Builder(Size size) {
        this.size = Objects.requireNonNull(size);
        }
        @Override public NyPizza build() {
        return new NyPizza(this);
        }
        @Override protected Builder self() { return this; }
    }
    private NyPizza(Builder builder) {
        super(builder);
        size = builder.size;
    }
}
```
```java
NyPizza pizza = new NyPizza.Builder(SMALL)
.addTopping(SAUSAGE).addTopping(ONION).build();
```
### DI to hardwiring resources
- example with spellchecker + dictionary:
  - spellchecker for each language need its own dictionary
  - We don't use utility class (static method) or singleton here, should be using DI
```java
public class SpellChecker{
    private final Dictionary dict;
    public SpellChecker(Dictinary dict){
        this.dict = dicts;
    }
    // some public method
}
```
- DI help we work with many type of resources.
- pass resource by using method factory pattern with bounded wildcard type 
```java
Mosaic create(Supplier<? extends Tile> tileFactory){'...'};
```
### Avoid creating unnecessary object
- While String.matches is the easiest way to check if a string matches
  a regular expression, it’s not suitable for repeated use in performance-critical
  situations
```java
static boolean isRomanNumeral(String s) {
    return s.matches("^(?=.)M*(C[MD]|D?C{0,3})"
    + "(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$");
}
```
- increase performance way by create a Pattern instance.
```java
// Reusing expensive object for improved performance
public class RomanNumerals {
    private static final Pattern ROMAN = Pattern.compile(
        "^(?=.)M*(C[MD]|D?C{0,3})"
        + "(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$");
    static boolean isRomanNumeral(String s) {
        return ROMAN.matcher(s).matches();
    }
}
```
- Another example
```java
// Hideously slow! Can you spot the object creation?
private static long sum() {
    Long sum = 0L;
    for (long i = 0; i <= Integer.MAX_VALUE; i++)
        sum += i;
    
    return sum;
}
```
- reduces the runtime from 6.3 seconds to 0.59 seconds on my machine.

### Prefer try-with-resources to try-finally.

## Chapter 3: Methods common to all objects

### Obey the general contract when overriding equals
- How to implement well-behaved equals() method.
  - Reflexive: x.equals(x) is true
  - Symmetric: x.equals(y) is true if and only if y.equals(x) is true
    - Can be violated if check case sensitive of string (just cast the first String))
      - example: a vs A, A vs a.
  - Transitive: x.equals(y) is true and y.equals(z) is true, then x.equals(z) is true
    - ColorPoint p1 = new ColorPoint(1, 2, Color.RED);
    - Point p2 = new Point(1, 2);
    - ColorPoint p3 = new ColorPoint(1, 2, Color.BLUE);
    - p1=p2, p2=p3 but p1!=p3.
  - Consistent: x.equals(y) returns the same result if called multiple times
  - For any non-null reference value x, x.equals(null) should return false

- “Favor composition over inheritance.”

#### the recipe for a high-quality equals method:
```java
public final class PhoneNumber{
    private final short areaCode, prefix, lineNum;
    @Override public boolean equals(Object o){
        // 1. Use the == operator to check if the argument is a reference to this object
        if(o == this) return true;
        // 2. Use the instanceof operator to check if the argument has the correct type
        if(!(o instanceof PhoneNumber)) return false;
        PhoneNumber pn = (PhoneNumber)o;
        return pn.lineNum == lineNum && pn.prefix == prefix && pn.areaCode == areaCode;
    }
    
}
```

### always override hashCode when override equals
- How to implement well-behaved hashCode() method.
```java
@Override public int hashCode() {
    int result = Short.hashCode(areaCode);
    result = 31 * result + Short.hashCode(prefix);
    result = 31 * result + Short.hashCode(lineNum);
    return result;
}
```
- Can using library https://www.baeldung.com/introduction-to-autovalue

### Override clone


## chapter 4: Classes and Interfaces
### Minimize the acce\ssibility of classes and members
- For top-level (non-nested) classes and interfaces, there are only two possible
  access levels: package-private and public. If you declare a top-level class or
  interface with the public modifier, it will be public; otherwise, it will be packageprivate. If a top-level class or interface can be made package-private, it should be.
  By making it package-private, you make it part of the implementation rather than
  the exported API, and you can modify it, replace it, or eliminate it in a subsequent
  release without fear of harming existing clients. If you make it public, you are
  obligated to support it forever to maintain compatibility
- If a package-private top-level class or interface is used by only one class,
  consider making the top-level class a private static nested class of the sole class
  that uses it 

### 
